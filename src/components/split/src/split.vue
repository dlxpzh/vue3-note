<template>
	<div
		ref="splitRef"
		:class="[
			getClassName(),
			getClassName(mode),
			{
				[getClassName(collapse)]: collapse,
			},
		]"
	>
		<div ref="referenceRef" :class="mode === 'vertical' ? getClassName('left') : getClassName('top')" :style="style" v-show="curVisible || collapse === 'right' || collapse === 'bottom'">
			<slot name="left" v-if="mode === 'vertical'"></slot>
			<slot name="top" v-if="mode === 'horizontal'"></slot>
		</div>
		<div :class="getClassName('drag')" @mousedown="handleMouseDown">
			<el-icon :class="getClassName('drag', 'btn')" @click.stop="handleClick" v-if="showCollapse"><component :is="icon" /></el-icon>
		</div>
		<div :class="mode === 'vertical' ? getClassName('right') : getClassName('bottom')" v-show="curVisible || (collapse !== 'right' && collapse !== 'bottom')">
			<slot name="right" v-if="mode === 'vertical'"></slot>
			<slot name="bottom" v-if="mode === 'horizontal'"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, reactive, watchEffect } from 'vue';
import { mouseDown } from '@/utils/tool/mouse';
import { getComponentName, getComponentClass } from '@/utils/tool';
const name = 'split';
export default defineComponent({
	name: getComponentName(name),
	componentName: name,
	emits: ['input', 'change'],
	props: {
		mode: {
			type: String,
			default: 'vertical',
			validator: value => ['horizontal', 'vertical'].includes(value),
		},
		collapse: {
			type: String,
			validator: value => ['left', 'top', 'right', 'bottom'].includes(value),
		},
		showCollapse: Boolean,
		// 像素或者百分比
		value: {
			type: [Number, String],
			default: '50%',
			validator: value => /^([0-9]+)(%|px)?$/.test(value),
		},
		visible: {
			type: Boolean,
			default: true,
		},
		// 最小像素或百分比
		min: {
			type: [Number, String],
			default: '10%',
			validator: value => /^([0-9]+)(%|px)?$/.test(value),
		},
		// 最大像素或百分比
		max: {
			type: [Number, String],
			default: '90%',
			validator: value => /^([0-9]+)(%|px)?$/.test(value),
		},
	},
	setup(props, { emit }) {
		let curValue = ref(0);
		let curVisible = ref(false);
		const splitRef = ref();
		const referenceRef = ref();
		watchEffect(() => {
			curValue.value = props.value;
		});
		watchEffect(() => {
			curVisible.value = props.visible;
		});
		const getClassName = (...arg) => {
			return getComponentClass(name, ...arg);
		};
		const style = computed(() => {
			let value = 0;
			if (typeof curValue.value === 'number') {
				value = curValue.value + 'px';
			} else {
				value = curValue.value;
			}
			return {
				[props.mode === 'vertical' ? 'width' : 'height']: value,
				[props.mode === 'vertical' ? 'min-width' : 'min-height']: props.min,
			};
		});
		const icon = computed(() => {
			if (props.mode === 'vertical') {
				if (props.collapse === 'right') {
					return curVisible.value ? 'ArrowRight' : 'ArrowLeft';
				} else {
					return curVisible.value ? 'ArrowLeft' : 'ArrowRight';
				}
			} else {
				if (props.collapse === 'top') {
					return curVisible.value ? 'ArrowUp' : 'ArrowDown';
				} else {
					return curVisible.value ? 'ArrowDown' : 'ArrowUp';
				}
			}
		});
		const handleMouseDown = event => {
			if (event.target.className !== getClassName('drag')) {
				return;
			}
			const target = referenceRef.value;
			const rect = target.getBoundingClientRect();
			mouseDown({
				container: splitRef.value,
				event,
				handleMove: move => {
					const width = rect.width + move.x;
					const height = rect.height + move.y;
					if (props.mode === 'vertical') {
						curValue.value = width;
						emit('input', restrictToBounds(width));
					} else {
						curValue.value = height;
						emit('input', restrictToBounds(height));
					}
				},
			});
		};
		const restrictToBounds = value => {
			let min = transformToNumber(props.min),
				max = transformToNumber(props.max);
			if (min && value < min) {
				return min;
			}
			if (max && max < value) {
				return max;
			}
			return parseInt(value);
		};
		const transformToNumber = value => {
			const container = splitRef.value;
			const rect = container.getBoundingClientRect();
			let max = 0;
			if (props.mode === 'vertical') {
				max = rect.width;
			} else {
				max = rect.height;
			}
			if (typeof value === 'number') {
				return value;
			}
			if (value.indexOf('px') !== -1) {
				return parseInt(value.replace('px', ''));
			}
			if (value.indexOf('%') !== -1) {
				return parseInt((parseInt(value.replace('%', '')) * max) / 100);
			}
			return null;
		};
		const handleClick = () => {
			curVisible.value = !curVisible.value;
			emit('change', curVisible.value);
		};
		return {
			splitRef,
			referenceRef,
			curValue,
			curVisible,
			style,
			icon,
			getClassName,
			handleMouseDown,
			handleClick,
		};
	},
});
</script>
<style lang="less" scoped>
.dz-split {
	position: relative;
	display: flex;
	height: 100%;
	width: 100%;
	overflow: hidden;
	align-items: stretch;
	justify-content: space-between;
	&.dz-split_horizontal {
		flex-direction: column;
		.dz-split_drag {
			width: 100%;
			height: 16px;
			cursor: row-resize;
			.dz-split_drag_btn {
				left: 50%;
				top: 0;
				margin-left: -25px;
				width: 50px;
				height: 10px;
				line-height: 10px;
				border-bottom-left-radius: 20px;
				border-bottom-right-radius: 20px;
			}
		}
	}
	&.dz-split_vertical {
		.dz-split_drag {
			width: 16px;
			height: 100%;
			cursor: col-resize;
			.dz-split_drag_btn {
				left: 0;
				top: 50%;
				margin-top: -25px;
				width: 10px;
				height: 50px;
				line-height: 50px;
				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
			}
		}

		&.dz-split_right {
			.dz-split_drag {
				.dz-split_drag_btn {
					left: 6px;
					border-top-left-radius: 20px;
					border-bottom-left-radius: 20px;
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}
			}
		}
	}
	.dz-split_left,
	.dz-split_top {
		position: relative;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.dz-split_drag {
		position: relative;
		background-color: #f3f3f8;
		overflow: hidden;
		transition: background-color 0.2s;
		&:hover {
			background-color: rgba(#545c64, 0.1);
		}
		.dz-split_drag_btn {
			position: absolute;
			display: block;
			text-align: center;
			color: rgba(#fff, 0.8);
			font-size: 12px;
			background-color: rgba(#545c64, 0.4);
			cursor: pointer;
			transition: background-color 0.2s, color 0.2s;
			&:hover {
				background: #545c64;
				color: rgba(#fff, 0.9);
			}
		}
	}
	.dz-split_right,
	.dz-split_bottom {
		position: relative;
		flex: 1;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
}
</style>
