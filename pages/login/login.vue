<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="mlogo">
			<image  src="../../static/logo.png" mode="widthFix"></image>
		</view>
		
		<view style="margin-top: 60rpx;padding: 10rpx;">
		<view class="uni-row inpus" >
	
			
			<input type="text"  placeholder="手机号" />
		</view>
		
		<view class="uni-row inpus">
			<input type="text"  placeholder="密码" />
		</view>
		
		<view class="uni-row">
			<button  @click="lonin" type="primary">登陆</button>
		</view>
		
		<!-- <view class="uni-row">
			<button @click="loninphone" type="default">手机登陆</button>
		</view> -->
		<view style="height: 100rpx;"></view>
		<view class="uni-row">
			<view class="wxlogin">
				<image @click="wxlogin" src="../../static/wxlgoin.png" ></image>
			</view>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//账号密码登陆
			lonin(){
				
				
				
				uni.switchTab({
				    url: '/pages/mainindex/mainindex'
				});
			},
		
			//微信授权登陆
			wxlogin(){
				uni.showModal({
				  content: `开发中`,
				  showCancel: false
				})
			}
		}
	}
</script>

<style>
.mlogo{width: 160rpx;height: 160rpx;margin: auto;}
.mlogo image{width: 160rpx;height: 160rpx;border-radius: 20rpx;}
.uni-row{margin-top: 20rpx;}
.inpus{border: #D8D8D8 solid 1rpx;height: 80rpx;background-color: #FEFEFE;border-radius: 10rpx;}
.inpus input{height: 60rpx;line-height: 60rpx;padding: 10rpx;}

.wxlogin{width: 160rpx;height: 160rpx;margin: auto;}
.wxlogin image{width: 160rpx;height: 160rpx;border-radius: 80rpx;}
</style>
