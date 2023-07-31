import Vue from 'vue';
import App from './App';
import api from './api';
import util from './common/util';
import store from './store';
import { baseUrl } from './common/global';
// main.js
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.prototype.$store = store; //全局挂载store到$store上
Vue.prototype.$api = api;
Vue.prototype.$util = util;
Vue.prototype.$baseUrl = baseUrl;
const app = new Vue({
  store,
  ...App,
});
app.$mount();
