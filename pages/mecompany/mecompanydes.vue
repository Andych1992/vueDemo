<template>
	<view>
		
	<view class="uni-row utit" >
		基本信息 
	</view>

	
		
	<view class="uni-row" >
		<view class="uni-label fl">单位名称</view>
		<view class="fl inp">
			<input type="text" placeholder="请输入单位名称" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">单位简称</view>
		<view class="fl inp">
			<input type="text"  placeholder="请输入单位简称" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">单位地址</view>
		<view class="fl inp">
			<input type="text"  placeholder="请输入单位地址" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">联系人</view>
		<view class="fl inp">
			<input type="text"  placeholder="请输入单位联系人" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">联系电话</view>
		<view class="fl inp">
			<input type="text"  placeholder="请输入单位联系电话" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">备注说明</view>
		<view class="fl inp">
			<input type="text"  placeholder="备注说明" />
		</view>
	</view>	
	
	<view class="uni-row" >
		<view class="uni-label fl">单位LOGO</view>
		<view class="fl inp">
			<input type="text"  placeholder="单位LOGO" />
		</view>
	</view>	
		
	<view class="bomvi">
		<button class="bombtn fl" >返回</button>
		<button class="bombtn fr"  >确认新增</button>
	</view>
		
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				compdata:{}
			}
		},
		onLoad() {
		_self = this;
			
		var datas = uni.getStorageSync('compdata');
		_self.compdata = JSON.parse(datas);
		
		},
		methods: {
			
		}
	}
</script>

<style>	
.fl{float: left;}
.fr{float: right;}
.uni-label{color: #333333;font-size: 32rpx;}
.inp{width: 550rpx;margin-left: 10rpx;height: 60rpx;}
.inp input{height: 60rpx;line-height: 60rpx;text-align: right;}
.uni-row{margin-top: 20rpx;border-bottom: #BEBEBE solid 1rpx;height: 80rpx;padding: 10rpx;}
.utit{background-color: #E5E5E5;height: 60rpx;line-height: 60rpx;padding: 10rpx;}
.bomvi{position: absolute;bottom: 25rpx;width: 750rpx;}
.bombtn{width: 220rpx;background-color: #FFFFFF;margin: 5rpx;color: #333333;}

</style>
