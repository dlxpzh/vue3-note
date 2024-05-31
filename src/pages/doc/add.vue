<template>
	<div class="doc-add">
		<v-md-editor v-model="text" height="500px" @copy-code-success="handleCopyCodeSuccess" @save="save" />
	</div>
</template>
<script lang="ts" setup>
const text = ref('');
const handleCopyCodeSuccess = (code: string) => {
	console.log(code);
};
const save = (text: string, html: string) => {
	console.log(text, html);
};
</script>
<style lang="less" scoped>
.doc-add {
	padding: 30px;

	.head {
		margin-bottom: 20px;
	}
}
</style>
