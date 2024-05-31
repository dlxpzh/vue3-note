<template>
	<v-md-editor v-if="isEdit" v-model="md"></v-md-editor>
	<v-md-preview v-else :text="md"></v-md-preview>
</template>
<script setup>
import md from './typescript.md?raw';
const route = useRoute();
const isEdit = ref(false);
watch(
	() => route.query,
	newVal => {
		isEdit.value = newVal.id === 'typescript';
	}
);
</script>
