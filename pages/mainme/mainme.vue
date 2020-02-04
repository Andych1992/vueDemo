<!-- 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view style="height: 300rpx;background-color: #007AFF;"></view>
		<view class="head">
			<view class="u-f u-f-ac">
				<view class="headpic"><image :src="userinfo.photo" mode="widthFix" lazy-load></image></view>
				<view class="headinfo u-f-column">
					<view>{{userinfo.sname}}</view>
					<view>单位:{{userinfo.company?userinfo.company.compname:''}}</view>
					<!-- <view>{{userinfo.regDate}}</view> -->
					<view>部门:{{userinfo.section?userinfo.section.section:''}}</view>
				</view>
			</view>
		</view>

		<view class="listinfo">
			<uni-list>
				<block v-for="(item, index) in listinfo" :key="index"><uni-list-item :title="item.title" :thumb="item.img" @click="clicklist(item.type)" /></block>
			</uni-list>
		</view>
		<button class="btn" @click="exitbtn">注销登陆</button>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
var _self, userdata
export default {
	computed: {
		...mapState(['token', 'userInfo'])
	},
	data() {
		return {
			userinfo: {},
			listinfo: []
		}
	},
	onLoad() {
		_self = this
	},
	onShow() {
		// console.log('token>>>', this.token)
		// console.log('userInfo>>>', this.userInfo) 
		userdata = this.userInfo //JSON.parse(uni.getStorageSync('USER_INFO'))
		_self.loadlistinit();
	},
	onPullDownRefresh() {
		_self.loadlistinit();
	},
	methods: {
		...mapMutations(['USER_LOGIN_OUT','UPDATE_USER_INFO']),
		loadlistinit() {
			// console.log(userdata)
			if (userdata.permission == '9') {
				//超级管理员 userdata.types == '6' || 
				var listdata = [
					{
						type: 'rygl',
						title: '人员管理',
						img: '../../static/icon/rygl.png'
					},
					{
						type: 'dwgl',
						title: '单位管理',
						img: '../../static/icon/dwgl.png'
					},
					{
						type: 'grzl',
						title: '个人资料',
						img: '../../static/icon/gwzl.png'
					}
				]
				_self.listinfo = listdata
			} else if (userdata.permission == '0') {
				//普通状态
				var listdata = [
					{
						type: 'grzl',
						title: '个人资料',
						img: '../../static/icon/gwzl.png'
					}
				]
				_self.listinfo = listdata
			} else {
				//可能未登陆
				uni.showModal({
					content: '未登陆',
					showCancel: false
				})
				uni.navigateTo({
					url: '../login/login'
				});
				return 
			}
			_self.getuserinfo()
		},

		clicklist(type) {
			switch (type) {
				case 'rygl':
					// console.log('人员管理')
					uni.navigateTo({
						url: '../mainuser_oper/mainuserList'
					})
					break
				case 'dwgl':
					uni.navigateTo({
						url: '/pages/mecompany/mecompany'
					})

					break
				case 'grzl':
					console.log('个人资料')
					uni.navigateTo({
						url: '/pages/mainme/mainmeinfo'
					})
					break
			}
		},
		getuserinfo() {
			console.log(JSON.stringify(userdata))
			uni.showLoading({
				title: '加载中...'
			})
			// uniCloud
			this.$myCloud
				.callFunction({
					// name: 'megetuserinfo',
					// data: {
					// 	//token: userdata.token
					// 	_id: userdata._id
					// },
					name: 'mainuser_oper',
					data:{
						operType: 'get',
						dataIn:{
							_id: userdata._id
						}
					}
				})
				.then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					console.log(res.result)
					if (res.success) {
						var datas = res.result.data[0];
						console.log(datas)
						if (datas.photo == '0'|| datas.photo == '../../static/logo.png') {
							datas.photo = '../../static/logo.png'
						}
						if (datas.sname == '0') {
							datas.sname = '未设置'
						}
						if (datas.company == '0') {
							datas.company.compname = '未设置'
						}
						if (datas.section == '0') {
							datas.section.section = '未设置'
						}
						_self.userinfo = datas
						// {
						// 	headpic: datas.photo,
						// 	sname: datas.sname,
						// 	create_time: datas.regtime,
						// 	company: datas.company,
						// 	section: datas.section
						// }
						// // _self.UPDATE_USER_INFO(_self.userinfo);
						uni.setStorageSync('userinfodata', JSON.stringify(datas))
					} else {
					}
				})
				.catch(err => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					console.error(err)
				})
		},
		//注销登陆
		exitbtn() {
			_self.USER_LOGIN_OUT();
			// uni.setStorageSync('userdata', '0')
			console.log('token>>>', _self.token)
			console.log('userInfo>>>', _self.userInfo) 
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
}
</script>

<style>
page {
	background: #eeeeee;
}

.head {
	background-color: #fefefe;
	margin: -130upx 20upx 20upx 20upx;
	border-radius: 20upx;
	padding: 40upx 30upx;
}

.headpic {
	margin-right: 30upx;
}

.headpic > image {
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
}

.headinfo {
	font-size: 26upx;
	color: #666666;
}

.headinfo view {
	padding: 5upx 0;
}

.headinfo > view:first-child {
	font-size: 32upx;
	font-weight: bold;
	color: #333333;
}

.listinfo {
	padding: 20upx;
	background-color: #ffffff;
	margin: 20upx 0;
}

.btn {
	margin: 0 20upx;
	background: #ffffff;
	color: #ff3333;
	font-size: 32upx;
}
</style>
