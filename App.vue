<script>
	import Vue from 'vue'
	let __timerId = 0;
	export default {
		onLaunch() {//初始化设备信息
			uni.getSystemInfo({
				success: e=> {
					this.initSize(e);
				}
			})
			this.initLogin();
		},
		methods: {
			//登录状态
			async initLogin(){
				const token = uni.getStorageSync('uniIdToken');
				if(token){
					this.$store.commit('setToken', {
						token
					});
				}
			},
			/**
			 * 存储设备信息 参考colorUI
			 * @param {Object} 
			 */
			initSize(e){
				const systemInfo = e;
				let navigationBarHeight;
				let custom = {};
				// #ifndef MP
				custom = {height: 36,width: 88};
				navigationBarHeight = 44;
				// #endif
				// #ifdef MP-WEIXIN
				custom = wx.getMenuButtonBoundingClientRect();
				navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2;
				// #endif	
				systemInfo.custom = custom;
				systemInfo.navigationBarHeight = navigationBarHeight;
				Vue.prototype.systemInfo = systemInfo;
			},
			//打开全局定时器
			openTimer(){
				this.closeTimer();
				__timerId = setInterval(()=>{
					// this.$store.commit('setStateAttr', {
					// 	key: 'timerIdent',
					// 	val: !this.$store.state.timerIdent
					// })
				}, 1000)
			},
			//关闭定时器
			closeTimer(){
				if(__timerId != 0){
					clearInterval(__timerId);
					__timerId = 0;
				}
			},
		},
		onShow() {
			console.log('app show');
			// this.openTimer();
		},
		onHide() {
			this.closeTimer();
		},onError(e) {
			console.log(e);
		}
	}
</script>
<style lang="scss">
	@import url("./assets/css/common.scss");
	@import url("./assets/font/icons/icon.css");
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
