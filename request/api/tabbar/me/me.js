import http from '../../../http.default.config.js';
export default {
	
	getMain(mobile) { //发送验证码
	// console.log(http)
		return http.post('', {
			custom:{cache:true},
			mobile
		})
	},
}
