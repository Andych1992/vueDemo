<!-- 人员管理 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search"></uni-search-bar>
		<uni-list>
			<block v-for="(item,index) in userList" :key='index'>
				<uni-list-item :show-arrow="true" title="儿保科-小王" 
					thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" 
					@click="operUserInfo('get')"/>
			</block>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList:[{},{},{},{},{},{},{},{},{},{},{}]
			}
		},
		methods: {
			search() {
				console.log('搜索')
			},
			operUserInfo(type){
				switch (type){
					case 'get':
						uni.navigateTo({
							url: './mainuserinfo'
						});
						break;
					case 'add':
						uni.navigateTo({
							url: './mainuserinfo'
						});
						break;
				}
			}
		}
	}
</script>

<style>

</style>
