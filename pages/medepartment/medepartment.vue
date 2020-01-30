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
			<uni-list-item title="某某部门" thumb="../../static/icon/compicon.png"></uni-list-item>
			
			<block  v-for="(item, index) in bmdata" :key="index" >
			<uni-list-item @tap="listclick(index)" thumb="../../static/icon/compicon.png"  :title=item.cpname  ></uni-list-item>
			</block>
			
		</uni-list>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bmdata:[
					{cpname:'呼吸科',bmid:'srw1'},
					{cpname:'诊断科',bmid:'sdf2'},
					{cpname:'住院部',bmid:'sef3'}
				]
			}
		},
		methods: {
			listclick(e){
				
				var datas = JSON.stringify( this.bmdata);
				uni.setStorageSync('bmdata', datas);
							
				uni.navigateTo({
				    url: '/pages/medepartment/medepartmentdes'
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
