## 需求背景

> op2.0，Sprint12迭代需求【增加相对方企业签署服务订阅，支持在线支付、开票、退款】，支付是前提步骤，优先级最高投入也最大。

## 支付方式
- 支持微信和支付宝扫码支付

## 支付实现
根据产品研发沟通，直接采用云端已经封装好的支付能力，省去外部申请配置帐号的工作。前端单独起一个支付项目**op-pay**（目前采用的是vue3+typescript模式）供后端整合并编译构建
- **针对微信场景**
1. 先调起用户授权获取授权code，[详见官方授权文档>](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
2. 调用/wx/auth接口获取用户openId（这一步是后端接口实现）
3. 再重定向到当前订单页面调起微信公众号JSAPI支付，[详见官方支付文档>](https://pay.weixin.qq.com/wiki/doc/apiv3_partner/open/pay/chapter2_3.shtml)
> 注意！如果需要获取用户信息，则第一步获取code之后，还需要获取access_token，然后再根据access_token获取用户信息
- **针对支付宝场景**
1. 直接跳转支付宝专用链接即可支付（链接由后端接口返回）
## 具体代码
- **微信支付**

1. 获取微信授权code
> redirect_uri是授权后重定向的url，state为带的参数，且会把code带上链接


```js
const getWeixinAuth = () => {
    // 调用/wx/auth接口获取openId
    const redirect_uri = encodeURIComponent(
        `${BASE_ORIGIN}/opcloudgw/op-payment/wx/auth?outTradeNo=${outTradeNo}`
    );
    const state = `${BASE_ORIGIN}/opcloudgw/op-payment/view/order?outTradeNo=${outTradeNo}`;
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${payInfo.value.wxAppId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
};
```
> 最终跳转的链接是：redirect_uri/?code=CODE&state=STATE
2. 监听微信js桥

```js
const weixinPay = () => {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener(
                "WeixinJSBridgeReady",
                onBridgeReady,
                false
            );
        } else if ((document as any).attachEvent) {
            (document as any).attachEvent(
                "WeixinJSBridgeReady",
                onBridgeReady
            );
            (document as any).attachEvent(
                "onWeixinJSBridgeReady",
                onBridgeReady
            );
        }
    } else {
        onBridgeReady();
    }
};
```
3. JSAPI调起支付

```js
const {
    timeStamp,
    nonceStr,
    package: packages,
    signType,
    paySign,
} = JSON.parse(res.data.payCode);

(window as any).WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    {
        appId: 'xxxxxx', //公众号ID，由商户传入 生产环境
        timeStamp, //时间戳，自1970年以来的秒数
        nonceStr, //随机串
        package, //prepay_id参数值
        signType, //微信签名方式：
        paySign, //微信签名
    },
    (res: any) => {
        // 微信支付官方发声明了，不再支持【支付后跳转指定页面】，需要加入【点金计划】才可实现此功能
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            goDone();
        }
    }
);
```
- **支付宝支付**

