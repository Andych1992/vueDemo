<template>
	<view class="content">
		<view class="title">uniCloud 基础示例</view>
		<view class="tips">
			<view>1.在cloudfunctions目录右键创建并关联服务空间</view>
			<view>2.在cloudfunctions目录右键打开uniCloud控制台，在第1步关联的服务空间里手动创建名为unicloud-test的数据表</view>
			<view>3.在云函数目录（比如：add）右键选择“上传并部署”</view>
			<view>开始愉快的体验uniCloud吧！</view>
		</view>
		<view class="btn-list">
			<button type="primary" @click="inindex">到主页</button>
			<button type="primary" @click="$util.navigateTo('/pages/login/index')">登录测试</button>
			
			<button type="primary" @click="addtest">我自己增加的一个函数</button>
			<button type="primary" @click="remove">删除一条数据</button>
			<button type="primary" @click="update">修改数据</button>
			<button type="primary" @click="gettest">查询前10条数据</button>
			<button type="primary" @click="upload">上传文件</button>
			<image class="upload-preview" :src="imageSrc" mode="widthFix"></image>
		</view>
		
	<!-- 带描述信息 -->
	<uni-list>
		<block v-for="(item, Index) in testuser" :key="Index">
	    <uni-list-item :title=item.name :note=item._id></uni-list-item>
	   </block>
	</uni-list>	
		
		<view >
			我是分割 -----------------------------------
		</view>
		<!-- <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item> -->
		
	<uni-list>
	    <uni-list-item title="标题文字" :show-arrow="false"></uni-list-item>
	    <uni-list-item title="标题文字"></uni-list-item>
	    <uni-list-item title="标题文字" :show-badge="true" badge-text="12"></uni-list-item>
	    <uni-list-item title="禁用状态" :disabled="true" :show-badge="true" badge-text="12"></uni-list-item>
	</uni-list>	
	
	<!-- 带描述信息 -->
	<uni-list>
		
	    <uni-list-item title="标题文字" note="描述信息"></uni-list-item>
	    <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12"></uni-list-item>
	</uni-list>
	
	<!-- 包含图片 -->
	<uni-list>
	    <uni-list-item title="标题文字" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
	</uni-list>
	
	<!-- 包含图标 -->
	<uni-list>
	    <uni-list-item title="标题文字" :show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>
	</uni-list>
	
	<!-- 显示Switch -->
	<uni-list>
	    <uni-list-item title="标题文字" :show-switch="true" :show-arrow="false"></uni-list-item>
	</uni-list>
		
	</view>
</template>
<script>
	const myCloud = uniCloud.init({provider: 'aliyun',spaceId: '9ff5d7ec-21aa-40c9-b744-7d99f7b2f94d',clientSecret: 'HkSIujHTvGg6/K5LghniCA=='});
// import uniList from "@/components/uni-list/uni-list.vue"
// import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
var _self;		
	export default {
		data() {
			return {
				imageSrc: '',
				testuser:[]
			}
		},
		onLoad:function(){
		    _self = this;
		},
		methods: {
			//增加的自己的函数
			addtest(){
				uni.showLoading({title: '显示处理中...'})
				myCloud.callFunction({
					name: 'fengtest',
					data: {
						name: '张三',
						subType: '12',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
					    title: '成功添加一条数据，文档id为：${res.result.id}',
					    duration: 1000
					});
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
				},
		gettest(){
			uni.showLoading({title: '获取中...'})
			myCloud.callFunction({
				name: 'gettest',
				data: {
					userid: '1123424556',
					createTime: Date.now()
				}
			}).then((res)=>{
				uni.hideLoading();
				_self.testuser = res.result.data;
				//获了成功
				uni.showModal({
					content: ` 成功` + JSON.stringify(res.result.data),
					showCancel: false
				})
			}).catch((err) => {
					uni.hideLoading()
					uni.showModal({content: `失败，错误信息为：${err.message}`,showCancel: false})
				})
		},
		//进入主页
		inindex(){
			uni.switchTab({
			    url: '/pages/mainindex/mainindex'
			});
		}
		
				
		
			
		
		}
	//components: {uniList,uniListItem}
	}
</script>

<style>
	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
