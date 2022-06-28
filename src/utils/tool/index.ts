export const ComponentName = 'dz';

/**
 * getComponentName
 * @description 设置组件名称
 * @param {string} name
 * @returns
 */
export function getComponentName(name: string) {
	name = ComponentName + '-' + name;
	return name.toLocaleLowerCase();
}
/**
 *
 * getComponentClass
 * @export
 * @description 设置样式class名称
 * @param {string} name
 * @param {string} ...arg
 * @return {string}
 */
export function getComponentClass(name: string, ...arg: Array<string>) {
	if (arg.length > 0) {
		name = ComponentName + '-' + name + '_' + arg.join('_');
	} else {
		name = ComponentName + '-' + name;
	}
	return name.toLocaleLowerCase();
}
