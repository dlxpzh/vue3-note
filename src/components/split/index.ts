import type { App } from 'vue';
import Split from './src/split.vue';
Split.install = (app: App) => {
	app.component(Split.name, Split);
};

export default Split;
