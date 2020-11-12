import Vue from 'vue'
import App from './App'

import {
	toast,
	isLogin,
	debounce,
	throttle,
	prePage,
	date
} from '@/utils/util.js'
import './router/interrept/index'
import $http from './request/index.js'
import ajax from './request/request/luch-request/index.js'
import aCache from '@/js_sdk/shezw-aCache/shezw-aCache.js';
Vue.use(aCache,'yourAppID'); // appID 是可选的
Vue.prototype.$zzhutil = {
	toast,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	aCache
}
Vue.prototype.$http=$http;
Vue.prototype.ajax=ajax;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
