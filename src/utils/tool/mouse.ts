/**
 * addEvent
 * @description 添加监听事件
 * @param {any} el dom节点
 * @param {string} event 事件类型
 * @param {Function} handler 监听事件
 */
export function addEvent(el: any, event: string, handler: Function): void {
	if (!el) {
		return;
	}
	if (el.attachEvent) {
		el.attachEvent('on' + event, handler);
	} else if (el.addEventListener) {
		el.addEventListener(event, handler, true);
	} else {
		el['on' + event] = handler;
	}
}

/**
 * removeEvent
 * @description 移除监听事件
 * @param {any} el dom节点
 * @param {string} event 事件类型
 * @param {Function} handler 监听事件
 */
export function removeEvent(el: any, event: string, handler: Function) {
	if (!el) {
		return;
	}
	if (el.detachEvent) {
		el.detachEvent('on' + event, handler);
	} else if (el.removeEventListener) {
		el.removeEventListener(event, handler, true);
	} else {
		el['on' + event] = null;
	}
}
interface Options {
	container: object;
	event: MouseEvent;
	handleMove?: Function;
	handleUp?: Function;
}
export const mouseDown = function ({ container = document.documentElement, event, handleMove, handleUp }: Options) {
	event.preventDefault();
	const start = {
		x: event.clientX,
		y: event.clientY,
	};
	let timer: any = null;
	const mousemove = function (e: MouseEvent) {
		const move = {
			x: e.clientX - start.x,
			y: e.clientY - start.y,
		};
		if (typeof handleMove === 'function') {
			if (window.requestAnimationFrame) {
				timer = window.requestAnimationFrame(() => {
					handleMove(move);
				});
			} else {
				timer = setTimeout(() => {
					handleMove(move);
				}, 20);
			}
		}
	};
	const mouseup = function (e: MouseEvent) {
		const move = {
			x: e.clientX - start.x,
			y: e.clientY - start.y,
		};
		if (window.cancelAnimationFrame) {
			window.cancelAnimationFrame(timer);
		} else {
			clearTimeout(timer);
		}
		if (typeof handleUp === 'function') {
			handleUp(move);
		}
		removeEvent(container, 'mousemove', mousemove);
		removeEvent(document.body, 'mouseup', mouseup);
	};
	addEvent(container, 'mousemove', mousemove);
	addEvent(document.body, 'mouseup', mouseup);
};
