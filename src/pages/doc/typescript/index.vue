<template>
	<v-md-editor v-if="isEdit" v-model="md"></v-md-editor>
	<v-md-preview v-else :text="md"></v-md-preview>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import md from './typescript.md?raw';
export default defineComponent({
	name: 'doc',
	setup() {
		const route = useRoute();
		const isEdit = ref(false);
		watch(
			() => route.query,
			newVal => {
				isEdit.value = newVal.id === 'typescript';
			}
		);
		return {
			md,
			isEdit,
		};
	},
});
</script>
