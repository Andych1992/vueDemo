<template>
	<view class="materiaInformation">
		<view class="search">
			<view class="searchIn">
				<view class="keft">
					<input type="text" value="请输入搜索内容" />
				</view>
				<view class="imgs">
					<image src="../../static/icon/search.png" mode=""></image>
				</view>
			</view>
		</view>
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		    <view class ='part'>
				<view class="partIn" v-for="(item2,index) in item.material" :key="index">
					<view class="group">
						<view>
							物资名称：
						</view>
						<view>
							{{item2.name}}
						</view>
					</view>
					<view class="group">
						<view>
							生产厂家：
						</view>
						<view>
							{{item2.sanufacturer}}
						</view>
					</view>
					<view class="group">
						<view>
							产品规格：
						</view>
						<view>
							{{item2.specifications}}
						</view>
					</view>
				</view>
			</view>
		  </swiper-item>
		</swiper>
		<view class="footer">
			<view class="footerIn">
				<button type="default"  size="mini" @click="goback"><uni-icons type="undo" size="20"></uni-icons>返回</button>
				<button type="default" size="mini" @click="newadd"><uni-icons type="plus" size="20"></uni-icons>新增物资</button>
			</view>
		</view>
	</view>
</template>
<script>
	import WucTab from '../../components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			 return {
			  TabCur: 0,
			  tabList: [
				  { name: '全部',
				    material:[
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'}
					  ],
				  },
				  { name: '医护用品',
				    material:[
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'}
					  ],
				  },
				  { name: '其他',
				    material:[
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'},
					  {name:'3m医用口罩',sanufacturer:'北京市海淀区白云公司',specifications:'10个/盒'}
					  ],
				  }
				]
			}
		},
		components: { WucTab },
		methods: {
			tabChange(index) {
				this.TabCur = index;
			},
			goback(){
				uni.navigateBack()
			},
			newadd(){
				uni.navigateTo({
				    url: '/pages/addMaterial/addMaterial'
			    })
			}
		},
		mounted() {
			this.$nextTick(()=>{
				let uniswipers = document.getElementsByTagName('uni-swiper')[0]
				var height = document.body.clientHeight-document.getElementsByTagName('uni-page-head')[0].clientHeight-document.getElementsByClassName('uni-scroll-view')[0].clientHeight-document.getElementsByClassName('search')[0].clientHeight-document.getElementsByClassName('footer')[0].clientHeight
				console.log(height +'px')
				uniswipers.style.height = height +'px'
				uniswipers.style.overflowY = auto
			})
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	.materiaInformation{
		width: 100%;
		height: 100%;
		font-size: 34rpx;
		.part{
			height: 100%;
			overflow-y: auto;
			font-size: 26rpx;
			padding: 0rpx 20rpx;
			.uni-swiper-wrapper{
				overflow-y: auto!important;
				background: red($color: #000000);
			}
			.partIn{
				padding-top: 10rpx;
				border-radius: 16rpx;
				padding: 10rpx 20rpx;
				border: 1rpx solid #D8D8D8;
				margin-top: 20rpx;
				.group{
					padding-bottom: 10rpx;
					display: flex;
					justify-content: space-between;
				}			
			}
		}
		.search{
			width: 100%;
			padding: 30rpx 0 0 0;
			.searchIn{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				border: 1rpx solid #dcdcdc;
				.keft{
					flex: 6;
					input{
						width: 100%;
					}
				}
				.imgs{
					uni-image{
						width:36rpx;
						height:36rpx;
					}
				}
			}
		}
		.footer{
			width: 100%;
			.footerIn{
				padding: 26rpx 20rpx;
				display: flex;
				justify-content: space-between;
				uni-button{
					margin: 0!important;
				}
			}
		}
	}
</style>
