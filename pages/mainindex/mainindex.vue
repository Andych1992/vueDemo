<template>
	<view>
		<view style="height: 500rpx;background-color: #007AFF;">
			
			<view class="contitle"> 新冠物资发放管理</view>
			
		</view>
		<view class="conview">
			<uni-grid :column="3" class="mygrid" :show-border=bor>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资入库</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资发放</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资库存</text>
				</uni-grid-item>
			</uni-grid>
			
			<uni-grid :column="3" class="mygrid" :show-border=bor >
				<uni-grid-item >
					<image class="gridimg" src="../../static/logo.png"></image>
					<text class="gridtext">物资设置</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资类别</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">单位/组织</text>
				</uni-grid-item>
			</uni-grid>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bor:false
			}
		},
		methods: {
			
			
			
		}
	}
</script>


<style>
.contitle{color: #FFFFFF;text-align: center;padding-top: 100rpx;}
.conview{background-color: #FEFEFE; width: 550rpx;height: 380rpx;border: #C0C0C0 solid 1rpx;  border-radius: 5rpx; position: absolute;left: 100rpx; top: 350rpx;}
.gridimg{width: 100rpx;height: 100rpx;margin: auto;}
.gridtext{text-align: center;font-size: 28rpx;}

</style>
