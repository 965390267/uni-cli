<template>
	<view style="height: 100%;">
		<view class="title">
			<view class="flex_col color_fff">
				<view class="box1">
					<uni-icons type="search" size="20" color="#fff"></uni-icons>
				</view>
				<view class="flex_grow flex_col flex_center tab">
					<view :class="{ 'active':listType==0 }" data-type="0" @tap="changeType">关注</view>
					<view :class="{ 'active':listType==1 }" data-type="1" @tap="changeType">推荐</view>
				</view>
				<view class="box1"></view>
			</view>
		</view>
		<swiper class="swiper" :skip-hidden-item-layout="true" :duration="duration" :vertical="true" @change="onChange" :current="activeIndex">
			<swiper-item v-for="(item,index) in dataList" :key="index">
				<view class="swiper-item" v-if="activeIndex >= (index-1)">
					<image :src="item" mode="aspectFill"></image>
					<image :src="item" mode="aspectFit"></image>
					<view class="info-box">
						<view class="size_16">@ 第{{index+1}}个用户</view>
						<view>第1集 | 这是个什么作品</view>
						<view class="size_12">合集名称第{{index+1}}个用户原创</view>
					</view>
					<view class="sidebar">
						<view class="pic">
							<image :src="item" mode="aspectFill"></image>
						</view>
						<view class="like">
							<uni-icons type="chat" size="30" color="#fff"></uni-icons>
							<view>12.1w</view>
						</view>
						<view class="read">
							<uni-icons type="redo" size="30" color="#fff"></uni-icons>
							<view>4554</view>
						</view>
						<view class="menu">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniIcons  from '@/assets/uni-icons/uni-icons.vue'
	
	export default {
		components: {uniIcons},
		data() {
			return {
				listType: 1,
				activeIndex: 0,
				duration: 300,
				rows: 10,
				page: 1,
				dataList: []
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			/* 改变类型 */
			changeType(e) {
				this.listType = e.currentTarget.dataset.type;
				this.page = 1;
				this.getList();
			},
			/* 获取列表 */
			getList() {
				if (this.page == 1) {
					uni.showLoading({
						title:"正在加载",
						mask:true
					})
				}

				new Promise((success, error) => {
					/* 此处为数据，请自行修改 */
					let getImgs = ()=>{
						let urls = [];
						for(let i=0;i<10;i++){
							urls.push(`/static/images/douyin/${i}.jpg`);
						}
						return urls;
					}
					
					setTimeout(() => {
						success(getImgs())
					}, 500);
				}).then((data) => {
					uni.hideLoading();
					if (this.page == 1) {
						/* 关闭切换效果 */
						this.duration = 0;
						this.$nextTick(() => {
							this.dataList = data;
							/* 切换到轮播第0个 */
							this.activeIndex = 0;

							this.$nextTick(() => {
								/* 恢复切换效果 */
								this.duration = 300;
							})
						});
					} else {
						this.dataList = [...this.dataList, ...data];
					}
					this.page++;
				});

			},
			/* 切换监听 */
			onChange(e) {
				var index = e.detail.current;
				this.activeIndex = index;
				if (index == this.dataList.length - 3) {
					console.log("add data");
					this.getList();
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "@/assets/css/common.scss";

	page {
		background-color: #76beff;
	}

	page,
	.swiper,
	.swiper-item {
		height: 100%;
	}

	/* 标题栏 */
	.title {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		padding-top: var(--status-bar-height);
		z-index: 10;
		background-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);

		&>view {
			height: 44px;
		}

		.box1 {
			width: 100rpx;
			margin: 0 40rpx;
			font-size: 40rpx;
		}


		.tab {
			&>view {
				margin: 0 30rpx;
				line-height: 64rpx;
				font-size: 32rpx;
				position: relative;
				color: rgba(255, 255, 255, 0.5);
				letter-spacing: 2px;

				&.active {
					color: rgba(255, 255, 255, 1);

					&:after {
						content: '';
						display: block;
						height: 2px;
						position: absolute;
						width: 70%;
						background-color: #fff;
						border-radius: 1px;
						left: 15%;
						bottom: 0;
					}
				}
			}
		}
	}

	.swiper .swiper-item {
		position: relative;
		background: #FFFFFF;
		overflow: hidden;

		&>image:nth-child(1) {
			display: block;
			width: 100%;
			height: 100%;
			box-sizing: content-box;
			padding: 40px 30px;
			position: absolute;
			z-index: 1;
			top: -40px;
			left: -30px;
			filter: blur(20px);
		}

		&>image:nth-child(2) {
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}

		/* 添加阴影遮罩，增强文字显示 */
		&:after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 65%;
			z-index: 3;
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
		}
	}

	.info-box {
		position: absolute;
		bottom: 80rpx;
		left: 50rpx;
		z-index: 4;
		color: #fff;
		width: 500rpx;

		&>view {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.sidebar {
		position: absolute;
		bottom: 100rpx;
		right: 50rpx;
		z-index: 5;
		color: #fff;
		text-align: center;

		.pic {
			margin-bottom: 20rpx;

			&>image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: #fff solid 1px;
			}
		}

		.like {
			font-size: 72rpx;
			margin-bottom: 20rpx;

			&>view {
				font-size: 20rpx;
				margin-top: 0;
			}
		}

		.read {
			font-size: 64rpx;
			margin-bottom: 80rpx;

			&>view {
				font-size: 20rpx;
				margin-top: -6rpx;
			}
		}

		.menu {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: rgba(0, 0, 0, 0.5) solid 14rpx;
			box-sizing: border-box;

			&>image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		/* 按钮点击缩放效果 */
		&>view {
			transition: transform 0.05s ease 0s;

			&:active {
				transform: scale(0.95, 0.95);
			}
		}
	}
</style>
