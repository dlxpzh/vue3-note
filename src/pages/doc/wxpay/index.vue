<template>
	<v-md-preview :text="md"></v-md-preview>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import md from './wxpay.md?raw';
export default defineComponent({
	name: 'doc',
	setup() {
		return {
			md,
		};
	},
});
</script>
