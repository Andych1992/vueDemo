<!-- 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view style="height: 300rpx;background-color: #007AFF;">
		</view>
		<view class="head">
			<view class="u-f u-f-ac">
				<view class="headpic">
					<image :src="userinfo.headpic" mode="widthFix" lazy-load></image>
				</view>
				<view class="headinfo u-f-column">
					<view>{{userinfo.name}}</view>
					<view>{{userinfo.regDate}}</view>
					<view>隶属部门 {{userinfo.company}} {{userinfo.dept}}</view>
				</view>
			</view>
		</view>
		<view class="listinfo">
			<uni-list>
				<block v-for="(item,index) in listinfo" :key="index">
					<uni-list-item :title="item.title" :thumb="item.img" @click="clicklist(item.type)" />
				</block>
			</uni-list>
		</view>
		<button class="btn">注销登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{
					headpic:'../../static/logo.png',
					name:'_陈默',
					regDate:'2020-01-30',
					company:'xxx医院',
					dept:'妇产科'
				},
				listinfo:[
					{
						type:'rygl',
						title:'人员管理',
						img:'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png'
					},
					{
						type:'bmgl',
						title:'部门管理',
						img:'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png'
					},
					{
						type:'grzl',
						title:'个人资料',
						img:'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png'
					},
				]
			}
		},
		methods: {
			clicklist(type){
				switch (type){
					case 'rygl':
						console.log('人员管理')
						break;
					case 'bmgl':
						console.log('部门管理')
						break;
					case 'grzl':
						console.log('个人资料')
						break;
				}
			}
		}
	}
</script>

<style>
	page{
		background: #EEEEEE;
	}
	.head{
		background-color: #FEFEFE;
		margin: -130upx 20upx 20upx 20upx;
		border-radius: 20upx;
		padding: 40upx 30upx;
	}
	.headpic{
		margin-right: 30upx;
	}
	.headpic>image{
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
	.headinfo{
		font-size: 26upx;
		color: #666666;
	}
	.headinfo view{
		padding: 5upx 0;
	}
	.headinfo>view:first-child{
		font-size: 32upx;
		font-weight: bold;
		color: #333333;
	}
	.listinfo{
		padding: 20upx;
		background-color: #FFFFFF;
		margin: 20upx 0;
	}
	.btn{
		margin: 0 20upx;
		background: #FFFFFF;
		color: #FF3333;
		font-size: 32upx;
	}
</style>
