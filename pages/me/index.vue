<template>
		<view class="">
	<div class="top-wrap">
		<div class="menotlogin_h" id="menotlogin_h" tapmode="itemOn" onclick="openUserInfo()">
			<div class="typeheader">
				<div class="top">
					<!-- 渲染区域 -->
					<!-- <div class="userpic"><img src="<%=list.icon%>" style="width:48px;height:48px" alt="" /></div> -->
					<p class="name_testname">
						<i><%=list.name%></i>
						<em><%=list.testTypeName%></em>
					</p>
				</div>
			</div>
		</div>

		<!--四个列表-->
		<div class="minebar">
			<div class="box">
				<div class="mianbox" onclick="openMyError()">
					<div class="top"><img src="@/static/images/me/cuoti.png" alt="" /></div>
					<div class="txt"><span>错题</span></div>
				</div>
			</div>
			<div class="box" onclick="openMyCourse()">
				<div class="mianbox">
					<div class="top"><img src="@/static/images/me/cc.png" alt="" /></div>
					<div class="txt"><span>收藏</span></div>
				</div>
			</div>
			<div class="box" onclick="openMyTask()">
	                <div class="mianbox">
	                    <div class="top">
	
	                        <img src="@/static/images/me/zuoye.png" alt="" />
	
	                    </div>
	                    <div class="txt">
	                        <span>作业</span>
	                    </div>
	                </div>
	            </div>
			<div class="box" onclick="openNotes()">
				<div class="mianbox">
					<div class="top"><img src="@/static/images/me/xiaoji.png" alt="" /></div>
					<div class="txt"><span>小记</span></div>
				</div>
			</div>
		</div>
		<!--四个列表完-->
	</div>

	<!-- list item 开始 -->
	<div class="main">
		<p tapmode="itemOn" class="testtype" onclick="chooseTestType()">
			考试类型
			<em><!-- 渲染区域 --></em>
		</p>
		<p tapmode="itemOn" onclick="openMyVideo()">缓存课程</p>
		<p tapmode="itemOn" onclick="openchengji()">查询工具</p>

		<div class="line"></div>
		<p tapmode="itemOn" onclick="openYsMoney()">
			云师币
			<span class="new">new</span>
		</p>
		<p tapmode="itemOn" onclick="coupon()">优惠券</p>
		<p tapmode="itemOn" onclick="withdrawals()">推广赚钱</p>
		<p tapmode="itemOn" onclick="invitation()">邀请码</p>
		<p tapmode="itemOn" onclick="studentAttendance()">员工通道</p>
		<p tapmode="popularize" onclick="openMyUnderCourse()">我的线下课</p>
		<p tapmode="itemOn" onclick="openMyMsg()">
			消息
			<i id="nticeRedPoint"></i>
		</p>
		<p tapmode="itemOn" @click="toSetting()" >设置</p>
		<p tapmode="itemOn" class="openqq"><a href="mqqwpa://im/chat?chat_type=wpa&uin=1020328764&version=1&src_type=web">客服小云˘•ω•˘</a></p>
	</div>

		
	</view>
</template>
<script>
	export default{
		methods:{
			toSetting(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		onLoad() {
			this.$http.ME.getMain().then(res=>{
				console.log(res);
			}).catch(e=>{
				console.log(e);
			})
			// console.log(this.$http);
		}
	}
</script>
<style>
.menotlogin_h {
	width: 100%;
	min-width: 320px;
	margin: 0 auto;
}

.typeheader {
	width: 100%;
}

.typeheader .top {
	height: 125px;
	background: url('@/static/images/me/bg.png') no-repeat;
	background-size: 100% 100%;
	padding: 0 15px;
	padding-top: 30px;
	box-sizing: border-box;
}

.top .userpic {
	width: 48px;
	height: 48px;
	overflow: hidden;
	border-radius: 24px;
	float: left;
	position: relative;
}

.top .userpic:before {
	content: '';
	position: absolute;
	width: 150px;
	height: 6px;
	background-color: rgba(82, 197, 255, 0.16);
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
	-webkit-animation: blink 1.5s ease-in 1.5s infinite;
	animation: blink 1.5s ease-in 1.5s infinite;
}

@-webkit-keyframes blink {
	from {
		left: -50px;
		top: 0;
	}
	to {
		left: 320px;
		top: 0;
	}
}

@-o-keyframes blink {
	from {
		left: 0px;
		top: 0;
	}
	to {
		left: 320px;
		top: 0;
	}
}

.top p {
	font-size: 18px;
	color: #ffffff;
	line-height: 1em;
	margin-top: 8px;
	position: relative;
	margin-left: 55px;
}

.top p:before {
	content: '';
	width: 8px;
	height: 17px;
	/* background: url(../../image/Arrrightwhite.png) no-repeat; */
	background-size: 100%;
	position: absolute;
	right: 0;
	top: 50%;
	-webkit-transform: translateY(-50%);
}

.top p em {
	font-size: 12px;
	color: #bde5fd;
}

.top p i {
	font-style: normal;
}

.typeheader .top span {
	position: absolute;
	right: 25px;
	top: 50%;
	-webkit-transform: translateY(-50%);
	font-size: 14px;
	color: #fff;
}

.typeheader .top i {
	line-height: normal;
	width: 130px;
	overflow: hidden;
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
/*错题收藏作业小记样式*/

.minebar {
	width: 95%;
	height: 113px;
	margin: -27px auto 20px auto;
	overflow: hidden;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 10px 10px rgba(137, 191, 255, 0.1);
	opacity: 1;
	border-radius: 10px;
}

.minebar .box {
	flex: 1;
	position: relative;
}

.minebar .box .mianbox {
	position: absolute;
	width: 54px;
	height: 65px;
	top: 0px;
	right: 0px;
	left: 0px;
	bottom: 0px;
	margin: auto;
	background: #fff;
	overflow: hidden;
}

.minebar .box .top {
	width: 40px;
	height: 40px;
	position: absolute;
	top: 1px;
	left: 10px;
}

.minebar .box .top img {
	width: 100%;
	height: 100%;
}

.minebar .box .txt {
	width: 100%;
	height: 20px;
	position: absolute;
	left: 0px;
	bottom: 0px;
	text-align: center;
}

.minebar .box .txt span {
	text-align: center;
	display: inline-block;
	font-size: 14px;
	color: #6d6d6d;
}
.itemOn {
	background: #f4f4f4;
}

.main {
	height: calc(100% - 235px);
	overflow-y: auto;
}

.main p {
	position: relative;
	height: 48px;
	line-height: 48px;
	font-size: 14px;
	color: #575757;
	padding-left: 36px;
	margin-left: 20px;
	border-bottom: 1px solid #e7e7e7;
}

.main p:after {
	content: '';
	width: 8px;
	height: 17px;
	/* background: url(../../image/Arrright.png) no-repeat; */
	background-size: 100%;
	position: absolute;
	top: 50%;
	right: 15px;
	-webkit-transform: translateY(-50%);
}

.main p em {
	font-size: 12px;
	color: #767676;
	position: absolute;
	right: 30px;
	top: 0;
}

.line {
	height: 6px;
	background-color: #f3f3f3;
	width: 100%;
	border-top: 1px solid #e7e7e7;
	border-bottom: 1px solid #e7e7e7;
}

.main p .new {
	width: 40px;
	height: 20px;
	margin-left: 5px;
	line-height: 20px;
	text-align: center;
	background-color: rgb(255, 104, 57);
	border-top-left-radius: 10px;
	border-bottom-right-radius: 10px;
	color: #fff;
}

.main p::before {
	content: '';
	position: absolute;
	top: 12px;
	left: 2px;
	width: 20px;
	height: 25px;
}
/* 列表item */

.main p:nth-of-type(1)::before {
	background: url('@/static/images/me/ksohi.png') no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(2)::before {
	background: url(@/static/images/me/huncun.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(3)::before {
	background: url(@/static/images/me/cx.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(4)::before {
	background: url(@/static/images/me/ysb.png) no-repeat;
	background-size: 100%;
}
.main p:nth-of-type(5)::before {
	background: url(@/static/images/me/youhuiquan.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(6)::before {
	background: url(@/static/images/me/tuiguang.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(7)::before {
	background: url(@/static/images/me/invitation_icon@2x.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(8)::before {
	background: url(@/static/images/me/kaoqin.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(9)::before {
	background: url(@/static/images/me/xianxiake.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(10)::before {
	background: url(@/static/images/me/xiaoxi.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(11)::before {
	background: url(@/static/images/me/shezhi.png) no-repeat;
	background-size: 100%;
}

.main p:nth-of-type(12)::before {
	background: url(@/static/images/me/xiaoyun.png) no-repeat;
	background-size: 100%;
}
/* 列表item */

#nticeRedPoint {
	display: none;
	position: absolute;
	left: 70px;
	top: 20px;
	width: 6px;
	height: 6px;
	border-radius: 3px;
	background: red;
}

.openqq a {
	display: inline-block;
	width: 100%;
	height: 100%;
	font-size: 14px;
	color: #575757;
}
</style>
