<template>
	<view>
		
		<view class="conview">
			<view class="uni-row" >
			<view class="inpus fl" >
				<image class="micon fl" src="../../static/icon/search.png"></image>
				<input type="text" class="fl" placeholder="关键字" />
			</view>
			<button class="mbtn fl">搜索</button>
		</view>
		</view>
		<view style="height: 10rpx;clear: both;"></view>
		
		
		<uni-list>
			<uni-list-item title="某某医院1" thumb="../../static/icon/compicon.png"></uni-list-item>
			
			<block  v-for="(item, index) in compdata" :key="index" >
			<uni-list-item @tap="listclick(index)"  :title=item.cpname :thumb=item.cpimg  ></uni-list-item>
			</block>
			
		</uni-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				compdata:[
					{cpname:'北京第一人民医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'srw1'},
					{cpname:'北京第二人民医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'sdf2'},
					{cpname:'北京解放军第三附属医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'sef3'}
				]
			}
		},
		methods: {
			listclick(e){
				
				var datas = JSON.stringify( this.compdata);
				uni.setStorageSync('compdata', datas);
				
				//uni.showModal({content: `开发中` + this.compdata[e].cpid ,showCancel: false}) 
								
				uni.navigateTo({
				    url: '/pages/mecompany/mecompanydes'
				});
				
				
			}
		}
	}
</script>

<style>
.conview{background-color: #FEFEFE; width: 730rpx;height: 80rpx;margin-left: 10rpx;}

.fl{float: left;}
.micon{width: 60rpx;height: 60rpx;margin-top: 10rpx;margin-left: 10rpx;}	
.uni-row{margin-top: 20rpx;}
.inpus{border: #D8D8D8 solid 1rpx;height: 80rpx;background-color: #FEFEFE;border-radius: 10rpx;}
.inpus input{height: 60rpx;line-height: 60rpx;padding: 10rpx;width: 460rpx;}
.mbtn{width: 160rpx !important;margin-left: 10rpx;background-color: #FFFFFF;}
</style>
