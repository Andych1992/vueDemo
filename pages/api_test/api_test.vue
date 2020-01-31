<template>
	<view>
		<button type="primary" @click="registerTest">注册云函数接口测试</button>
		<button type="primary" @click="loginTest">登录云函数接口测试</button>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		// registerTest
		registerTest() {
			this.$myCloud
				.callFunction({
					name: 'register',
					data: {
						username: '13800000000',
						password: '123456'
					}
				})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.error(err)
				})
		},
		// loginTest
		loginTest() {
			this.$myCloud
				.callFunction({
					name: 'login',
					data: {
						username: '13800000000',
						password: '123456'
					}
				})
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.error(err)
				})
		}
	}
}
</script>

<style></style>
