# cs_pageTurning 翻页轮播


### 在页面script中引入组件，并注册组件
```
import pageTurning from "@/components/cs-pageTurning/cs-pageTurning.vue"
export default {
    components: {pageTurning}
}
```

### 示例
```
<pageTurning  ref="pageTurning" :height="440" :autoplay="autoplay" :imgList="bannerList"></pageTurning>
```

### 属性
| 名称                        | 类型            | 默认值        | 描述                    |
| ----------------------------|--------------- | ------------- | ------------------     |
| height                      | Number         | 500           | 高度                   |
| imgList                     | Array          |               | {imgSrc:图片地址}       |
| autoplay                    | Boolean        | false         | 是否开启自动轮播         |
| interval                    | Number         | 5000          | 轮播间隔时间（单位：微秒）|

### 方法
nextPage() 下一页

creatTimer() 重新开启自动翻页

deleteTimer() 清除定时器 关闭自动翻页
	
                             
### 优化
如果组件放在 tab页上 可在onshow() onhide() 上调用 开始定时器 creatTimer() 和 删除定时器 deleteTimer() 优化性能
```
onShow(){
	console.log("创建定时器")
	console.log(self.$refs['pageTurning']);
	if(self.autoplay && self.$refs['pageTurning']){
		self.$refs['pageTurning'].creatTimer();
	}		
},
onHide(){
	console.log("删除定时器");
	console.log(self.$refs['pageTurning']);
	if(self.$refs['pageTurning']){
		self.$refs['pageTurning'].deleteTimer();
	}
},
```