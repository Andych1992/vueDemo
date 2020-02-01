<template>
		<form @submit="subform" >
	<view class="addMaterial">
		<view class="information">
			基本信息
		</view>
		<view class="part">
			<view>物资图片</view>
			<!-- <input type="display:none;" name="mat_img" value="图片"> -->
			<view><image src="../../static/tabbar/indexpage.png" mode="" class="picture"></image></view>
		</view>
		<view class="part">
			<view>物资名称</view>
			<view><input type="text" name="mat_title" value="" placeholder="请输入物资名称"/></view>
		</view>
		<view class="part">
			<view>物资类别</view>
			<!-- <input type="display:none;" name="types" value="类别"> -->
			<view><span>请选择物资类别</span><image src="../../static/tabbar/indexpage.png" mode="" class="pictures"></view>
		</view>
		<view class="part">
			<view>计量单位</view>
			<view><input type="text" name="unit" value="" placeholder="请输入计量单位"/></view>
		</view>
		<view class="part">
			<view>库存数量</view>
			<view><input type="text" name="mat_number" value="" placeholder="请输库存数量"/></view>
		</view>
		<view class="part">
			<view>物料规格</view>
			<view><input type="text" name="model" value="" placeholder="请输入物料规格"/></view>
		</view>
		<!-- 华上进加 -->
		<view class="part">
			<view>生产厂家</view>
			<view><input name="manufacturer" type="text"  value="" placeholder="请输入生产厂家"/></view>
		</view>
		<!-- 华上进加 -->
		<view class="part">
			<view>物资条码</view>
			<view><input type="text" name="bar_code_number" value="" style="width: 400rpx;padding-right: 40rpx;" placeholder="请输入物资条码(不填默认生成)"/><image src="../../static/tabbar/indexpage.png" mode="" class="picturetree"></view>
		</view>
		<view class="part">
			<view>物资排序</view>
			<view><input type="text" name="mat_top" value="" placeholder="请输入序号"/></view>
		</view>
		<!-- 华上进加 -->
		<view class="part">
			<view>物资说明</view>
			<view><input type="text" name="mat_des" value="" placeholder="请输物资说明"/></view>
		</view>
		<!-- 华上进加 -->
		
		<view class="footer">
			<view class="footerIn">
				<button type="default">返回</button>
				<button type="default" form-type="submit">确认新增</button>
			</view>
		</view>
	</view>
	
	</form>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			subform(e){
				var formdata = e.detail.value;
				console.log(formdata)
				//model_id 物资主键唯一标识 
				var timestamp=new Date().getTime();
				formdata.model_id = "M_ID"+timestamp+Math.floor(Math.random()*10);
				formdata.mat_img = "物资图片";
				formdata.types = "物资类型";
				
				uni.showLoading({title: '数据存储中...'})
				this.$myCloud.callFunction({
						name: 'materialAdd',
						data:formdata
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			}
			
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	.addMaterial{
		width: 100%;
		height: 100%;
		overflow-y: auto;
		font-size: 25rpx;
	}
	.addMaterial .information{
		width: 100%;
		padding: 20rpx 30rpx;
		background-color: #B2B2B2;
	}
	.addMaterial .part{
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		border-bottom: 1rpx solid #D8D8D8;
	}
	.addMaterial .part span{
		color: #808080;
	}
	.addMaterial .part input{
		font-size: 20rpx;
		text-align: right;
	}
	.addMaterial .part .picture{
		width: 50rpx;
		height: 50rpx;
	}
	.addMaterial .part .picture img{
		width: 100%;
		height: 100%;
	}
	.addMaterial .part .pictures{
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top: 12rpx;
	}
	.addMaterial .part .pictures img{
		width: 100%;
		height: 100%;
	}
	.addMaterial .part .picturetree{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top:18rpx;
		/* margin-left: 10rpx; */
		right: 30rpx;
	}
	.addMaterial .part .picturetree img{
		width: 100%;
		height: 100%;
	}
	.addMaterial .footer{
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	.addMaterial .footer .footerIn{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	/deep/ .uni-button[type=default]{
		margin-left: 0!important;
		margin-right: 0!important;
	}
</style>
