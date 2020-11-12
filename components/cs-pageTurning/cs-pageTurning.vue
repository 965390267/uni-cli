<template>
	<view class="pageTurning" id="pageTurning" :style="{ height: height + 'rpx' }" @touchstart="pageTouchstart" @touchmove="pageTouchmove" @touchend="pageTouchend">
		<!-- <view class="page-item">
			<view class="page-item-left" :style="{ backgroundImage: 'url(' + imgData[imgData.length - 1].imgSrc + ')', width: domWidth / 2 + 'px' }"></view>
			<view class="page-item-right" :style="{ backgroundImage: 'url(' + imgData[imgData.length - 1].imgSrc + ')', width: domWidth / 2 + 'px' }"></view>
		</view> -->
		<view class="page-item" v-for="(item, index) in imgData" :key="index" :style="{ zIndex: item.zindex }">
			<view
				class="page-item-left"
				:style="{
					backgroundImage: 'url(' + item.imgSrc + ')',
					width: item.leftWidth + 'px'
				}"
			>
				<view
					class="rollLeft"
					:style="{
						width: item.moveLeftX + 'px',
						backgroundImage: 'url(' + imgData[index - 1 < 0 ? imgData.length - 1 : index - 1].imgSrc + ')',
						backgroundSize: domWidth + 'px 100%',
						backgroundPosition: item.moveLeftX + 'px 0%'
					}"
				></view>
			</view>

			<view class="page-item-right" :style="{ backgroundImage: 'url(' + item.imgSrc + ')', width: item.rightWidth + 'px' }">
				<view
					class="rollRight"
					:style="{
						width: item.moveRightX + 'px',
						backgroundImage: 'url(' + imgData[index - 1 < 0 ? imgData.length - 1 : index - 1].imgSrc + ')',
						backgroundSize: domWidth + 'px 100%'
					}"
				></view>
			</view>
		</view>
	</view>
</template>

<script>
let self;
export default {
	data() {
		self = this;
		return {
			imgData: [],
			domWidth: null,
			dowLeft: null,
			nowIndex: 0,
			startClienX: 0,
			timgerId: null // 定时器
		};
	},
	created() {
		self.imgData = self.imgList;
		self.nowIndex = self.imgData.length - 1;
		if (self.autoplay) {
			// 开启自动翻页
			self.creatTimer();
		}
	},
	destroyed() {
		self.deleteTimer();
	},
	mounted() {
		let view = uni
			.createSelectorQuery()
			.in(this)
			.select('#pageTurning');
		view.boundingClientRect(data => {
			if (data) {
				self.domWidth = data.width;
				self.dowLeft = Math.floor(data.left);
				self.initData();
			}
		}).exec();
	},
	props: {
		height: {
			type: Number,
			default: 500
		},
		imgList: {
			type: Array
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		interval: {
			type: Number,
			default: 5000
		}
	},
	methods: {
		/*
		 * cs 2020-9-17
		 * 创建定时器
		 */
		creatTimer() {
			clearInterval(self.timgerId);
			self.timgerId = setInterval(function() {
				self.nextPage();
			}, self.interval);
		},
		deleteTimer() {
			clearInterval(self.timgerId);
			self.timgerId = null;
		},
		initData() {
			self.imgData.forEach((item, index) => {
				item.rightWidth = self.domWidth / 2;
				item.leftWidth = self.domWidth / 2;
				item.moveLeftX = 0;
				item.moveRightX = 0;
				item.zindex = index;
			});
			self.$nextTick(function() {
				self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
			});
		},
		pageTouchstart(e) {
			// 点击时清除定时器
			self.deleteTimer();

			self.startClienX = e.touches[0].clientX;
		},
		pageTouchmove(e) {
			let moveX = self.startClienX - e.touches[0].clientX;
			if (moveX > self.domWidth / 2) {
				moveX = self.domWidth / 2;
			}

			if (moveX < -self.domWidth / 2) {
				moveX = -self.domWidth / 2;
			}

			if (moveX >= 0 && self.startClienX - self.dowLeft >= self.domWidth / 2) {
				self.imgData[self.nowIndex].rightWidth = Math.floor(self.domWidth / 2 - Math.abs(moveX));
				self.imgData[self.nowIndex].moveRightX = Math.abs(moveX);
			} else if (moveX < 0 && self.startClienX - self.dowLeft < self.domWidth / 2) {
				self.imgData[self.nowIndex].leftWidth = Math.floor(self.domWidth / 2 - Math.abs(moveX));
				self.imgData[self.nowIndex].moveLeftX = Math.abs(moveX);
			}
			self.$nextTick(function() {
				self.$set(self.imgData, self.nowIndex, self.imgData[self.nowIndex]);
			});
		},
		pageTouchend(e) {
			let moveX = self.startClienX - e.changedTouches[0].clientX;
			if (Math.abs(moveX) >= (self.domWidth / 2) * 0.7) {
				self.imgData[self.nowIndex].leftWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveLeftX = 0;
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;

				self.imgData.forEach((item, index) => {
					item.zindex++;
				});

				self.imgData[self.nowIndex].zindex = 0;

				self.nowIndex--;
				if (self.nowIndex < 0) {
					self.nowIndex = self.imgData.length - 1;
				}
			} else {
				self.imgData[self.nowIndex].leftWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveLeftX = 0;
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;
			}

			self.$nextTick(function() {
				self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
			});

			if (self.autoplay) {
				// 开启自动翻页
				self.creatTimer();
			}
		},
		nextPage() {
			self.imgData[self.nowIndex].rightWidth = 0;
			self.imgData[self.nowIndex].moveRightX = self.domWidth / 2;
			self.$nextTick(function() {
				self.$set(self.imgData, self.nowIndex, self.imgData[self.nowIndex]);
			});
			setTimeout(function() {
				self.imgData[self.nowIndex].rightWidth = self.domWidth / 2;
				self.imgData[self.nowIndex].moveRightX = 0;

				self.imgData.forEach((item, index) => {
					item.zindex++;
					if (item.zindex > self.imgData.length - 1) {
						item.zindex = 0;
					}
				});

				self.nowIndex--;
				if (self.nowIndex < 0) {
					self.nowIndex = self.imgData.length - 1;
				}

				self.$nextTick(function() {
					self.$set(self.imgData, self.imgData.length - 1, self.imgData[self.imgData.length - 1]);
				});
			}, 300);
		}
	}
};
</script>

<style lang="scss" scoped>
.pageTurning {
	width: 100%;
	position: relative;
	overflow: hidden;
	.page-item {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.page-item-left {
			position: absolute;
			top: 0;
			right: 50%;
			height: 100%;
			background-position: 0% 0%;
			background-size: 200% 100%;
			box-shadow: inset -10rpx -10rpx 20rpx 0 rgba(49, 49, 49, 0.2);
			transition: all 0.3s linear 0s;
		}
		.page-item-right {
			position: absolute;
			top: 0;
			left: 50%;
			height: 100%;
			background-size: 200% 100%;
			background-position: -100% 0%;
			box-shadow: inset 10rpx 10rpx 20rpx 0 rgba(49, 49, 49, 0.2);
			transition: all 0.3s linear 0s;
		}
	}
	.rollRight {
		display: block;
		position: absolute;
		right: -5%;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		background-position: 0% 0%;
		z-index: 1;
		filter: drop-shadow(12rpx 0px 12rpx rgba(0, 0, 0, 0.5));
	}
	.rollLeft {
		display: block;
		position: absolute;
		left: -5%;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, #ddd 50%, rgba(0, 0, 0, 0) 100%);
		transition: all 0.3s linear 0s;
		z-index: 1;
		filter: drop-shadow(-12px 0px 12px rgba(0, 0, 0, 0.5));
	}
}
</style>
