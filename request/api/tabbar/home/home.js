import $http from '../../../http.config.js';
export default {

	getMain(mobile) { //发送验证码

		return $http.post('', {
			mobile
		})
	},
}
