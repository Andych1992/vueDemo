<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @cancel="cancelSearch"></uni-search-bar>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1296db"></uni-segmented-control>
			<view class="content">
				<view>
					<view class="details" v-for="(item, index) in materials[current]" :key="index">
						<view class="title">
							<view class="t-biao"><text :style="{color:item.detail_balance>0?'#007AFF':'#4CD964'}">{{item.detail_balance>0?'入库  ':'退货  '}}</text>
								{{item.serialNumber}}</view>
							<view class="t-time">{{item.create_time}}</view>
						</view>
						<view class="cont">
							<view class="t-sum">发放物资数 55</view>
							<view class="t-status" :style="{background:index%2==0?'#F76260':'#007AFF'}">{{index%2==0?'捐赠':'采购'}}</view>
						</view>
						<view class="title">
							<view class="t-biao">来往单位 {{item.relationCom}}</view>
							<view class="t-time">联系人 {{item.relationUser}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<uni-fab :pattern="pattern" vertical="bottom" horizontal="right" direction="vertical" :content="content" @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
		var _self;
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				items: ["全部", "无偿捐赠", "上级下拨", "自行采购","采购退货"],
				content: [{
					iconPath: '/static/icon/giveOut.png',
					selectedIconPath: '/static/icon/giveOut.png',
					text: '新增',
					active: false
				}],
				current: 0,
				//请求类型
				operType: 'get',
				//页码
				page:1,
				pageSize:10,
				searchKey:'',
				materials:[[],[],[],[],[]],
				//1003代表采购入库1004采购退货
				materShowTypes:["","1001","1002","1003","1004"],
				mater:[
					{},
					{
						color:"#007AFF",
						name:"捐赠"
					},
					{
						color:"#F76260",
						name:"下拨"
					},
					{
						color:"#007AFF",
						name:"采购"
					},
					{
						color:"#4CD964",
						name:"退货"
					}
				]
			}
		},
		onLoad() {
			_self=this;
			_self.materialListGet(false);
		},
		methods: {
			
			materialListGet(falg){
				uni.showLoading({
					title: '加载数据中...'
				})
				var dataIn ={
					searchKey:_self.searchKey,
					 materOperType:'10',//表示入库
					 materShowType:_self.materShowTypes[_self.current],
					 pageSize:_self.pageSize,
					 page:_self.page
				}
				console.log(dataIn);
				this.$myCloud
				.callFunction({
							name: 'mater_main',
							data:{
								operType:_self.operType,
								dataIn:dataIn
							}
						})
						.then(res => {
							uni.hideLoading()
							if(res.success){
								console.log(res);
								var list = res.result.data.data;
								
								if(falg){
								_self.materials[_self.current].push(...list)
									console.log(_self.materials);
								}else{
									_self.materials[_self.current]=list
									console.log(_self.materials);
								}
							}else{
								
							}
							
						})
						.catch(err => {
							uni.hideLoading()
							uni.showModal({
								content: `数据获取失败，错误信息为：${err.message}`,
								showCancel: false
							})
							console.error(err)
						})		
			},
			//搜索
			search(e) {
				_self.searchKey = e.value;
				_self.materialListGet(false);
				
			},
			//取消搜索
			cancelSearch(){
				_self.searchKey = '';
				_self.materialListGet(false);
			},
			trigger(e) {
				switch (e.index) {
					case 0:
						uni.navigateTo({
							url: '/pages/enterMaterials/addEnter'
						})
						return;
				}
			},
			onClickItem(e) {
				this.current = e.currentIndex
				_self.materialListGet(false);
			},

		}
	}
</script>

<style lang="scss">
	.content {
		.details {
			padding: 2vw;
			font-size: 3.7vw;
			border-top: 1rpx solid #BEBEBE;
			
			&:last-child {
				border-bottom: 1rpx solid #BEBEBE;
			}
			
			.title {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;

				.t-biao {
					width: 50vw;
					padding-left: 2vw;
				}

				.t-time {
					width: 50vw;
					padding-left: 2vw;
				}
			}

			.cont {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				padding: 0vw 2vw 0vw 2vw;

				.t-sum {
					font-size: 3.7vw;
					line-height: 6vw;
				}

				.t-status {
					right: 3vw;
					width: 12vw;
					height: 6vw;
					color: #FFFFFF;
					text-align: center;
					font-size: 3.7vw;
					line-height: 6vw;
					background: #1296db;
					border-radius: 5rpx;
				}
			}
		}
		
	}
</style>
