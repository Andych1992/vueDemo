<!-- 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<uni-list>
			
			<!-- <uni-list-item :show-badge="true" title="列表右侧带箭头 + 角标" badge-text="AAA" badge-type="ss" rightText="bbb"/> -->
			<uni-list-item :show-arrow="true" title="工号" rightText="1001"/>
			<uni-list-item :show-arrow="true" title="名称" rightText="_陈默"/>
			<uni-list-item :show-arrow="true" title="手机" rightText="1340****071"/>
			<uni-list-item :show-arrow="true" title="性别" rightText="男"/>
			<uni-list-item :show-arrow="true" title="部门" rightText="儿保科"/>
			<uni-list-item :show-arrow="true" title="单位" rightText="XXX医院"/>
			<uni-list-item :show-arrow="true" title="备注" rightText="暂无备注信息"/>
		</uni-list>
		
	</view>
</template>

<script>
</script>

<style>
	.uni-row {
		border-bottom: #BEBEBE solid 1rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: #E5E5E5;
	}
</style>
