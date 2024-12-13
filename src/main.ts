import App from './App.vue';
import 'default-passive-events';
import { createApp } from 'vue';
import { initStore } from './store'; // Store
import { initRouter } from './router'; // Router
import { registerGlobComp } from './components'; // 注册全局组件
import { ElButton, ElIcon } from 'element-plus';
import '@styles/reset.scss'; // 重置HTML样式
import '@styles/app.scss'; // 全局样式
import '@styles/pages.scss'; // 公共页面样式
import '@styles/el-ui.scss'; // 优化element样式
import '@styles/mobile.scss'; // 移动端样式优化
import '@styles/change.scss'; // 主题切换过渡优化
import '@icons/system/iconfont.js'; // 系统彩色图标
import '@icons/icons/iconfont.css'; // 系统提供的图标库
import '@icons/system/iconfont.css'; // 系统图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 导入所有图标组件
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/index.css'; // 引入 Element Plus 的全局样式
import 'element-plus/theme-chalk/dark/css-vars.css'; // Element 暗黑主题
import '@styles/element.scss'; // Element 自定义主题
import '@styles/dark.scss'; // 系统主题
import '@utils/console.ts'; // 控制台输出内容
import './mock/mock'; // 数据 mock
import { setupGlobDirectives } from './directives';
import language from './language';

const app = createApp(App);
initStore(app);
initRouter(app);
registerGlobComp(app);
setupGlobDirectives(app);

// 批量注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.use(ElementPlus);

app.use(language);

app.use(ElButton);
app.use(ElIcon);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.mount('#app');
