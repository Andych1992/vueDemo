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
					<view>单位:{{userinfo.company}}</view>
					<!-- <view>{{userinfo.regDate}}</view> -->
					<view>部门: {{userinfo.dept}}</view>
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
		<button class="btn" @click="exitbtn">注销登陆</button>
	</view>
</template>

<script>
var _self,userdata;	
	export default {
		data() {
			return {
				userinfo:{},
				listinfo:[]
			}
		},
		onLoad() {
		_self = this;
	
		 userdata = JSON.parse(uni.getStorageSync("userdata"));
		_self.loadlistinit();
		
		
		},
		methods: {
			loadlistinit(){
			if(userdata.types == '6'){
				//超级管理员
				var listdata = [
					{
						type:'rygl',
						title:'人员管理',
						img:'../../static/icon/rygl.png'
					},
					{
						type:'dwgl',
						title:'单位管理',
						img:'../../static/icon/dwgl.png'
					},
					{
						type:'grzl',
						title:'个人资料',
						img:'../../static/icon/gwzl.png'
					}];
					_self.listinfo = listdata;
			}else if(userdata.types == '1'){
				//普通状态
				var listdata = [
					{
						type:'grzl',
						title:'个人资料',
						img:'../../static/icon/gwzl.png'
					}];
					_self.listinfo = listdata;
			}else{
				//可能未登陆
				uni.showModal({ content: "未登陆" , showCancel: false})
				
			}
				_self.getuserinfo();
			},
			
			clicklist(type){
				switch (type){
					case 'rygl':
						console.log('人员管理')
						break;
					case 'dwgl':
						uni.navigateTo({
							url: '/pages/mecompany/mecompany'
						});
					
						break;
					case 'grzl':
						console.log('个人资料')
						break;
				}
			},
			getuserinfo(){
				console.log(userdata.token);
				uni.showLoading({title: '加载中...'})
				uniCloud.callFunction({
						name: 'megetuserinfo',
						data:{token:userdata.token}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
						if(res.result.success){
							var datas = res.result.data;
							if(datas.photo == '0'){
								datas.photo = '../../static/logo.png';
							}
							if(datas.name == '0'){
								datas.name = "未设置";
							}
							if(datas.company == '0'){
								datas.company = "未设置";
							}
							if(datas.section == '0'){
								datas.section = "未设置";
							}
							_self.userinfo={
								headpic:datas.photo,
								name:datas.name,
								regDate:datas.regtime,
								company:datas.company,
								dept:datas.section
							}
							
						}else{
							
						}
						
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
				
			},
			exitbtn(){
				uni.setStorageSync('userdata', '0');
				uni.navigateTo({
				    url: '/pages/login/login'
				});
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
