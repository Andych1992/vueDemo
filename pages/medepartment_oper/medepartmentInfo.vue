<!-- 部门 这个文件我重构 (常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="部门编号" disabled :rightText="departmentInfo._ids?departmentInfo._ids:'自动生成'" />
			<uni-list-item :show-arrow="true" title="所属单位" :rightText="departmentInfo.cpaddress?departmentInfo.cpaddress:'暂无设置'" @click="togglePopup('cpaddress','单位地址',departmentInfo.cpaddress)" />
			<uni-list-item :show-arrow="true" title="部门名称" :rightText="departmentInfo.section?departmentInfo.section:'暂无设置'" @click="togglePopup('section','部门名称',departmentInfo.section)" />
			<uni-list-item :show-arrow="true" title="备注信息" :rightText="departmentInfo.desc?departmentInfo.desc:'暂无设置'" @click="togglePopup('desc','备注信息',departmentInfo.desc)" />
			<uni-list-item :show-arrow="true" title="排序" :rightText="departmentInfo.indexs?departmentInfo.indexs:'0'" @click="togglePopup('indexs','排序',departmentInfo.indexs)" />

		</uni-list>
		<view class="button">
			<view class="b-t" @click='delPage'>
				<uni-icons class="icon" type="minus" size="26"></uni-icons>
				<view class="wz">删除</view>
			</view>
			<view class="b-t" @click='savePage'>
				<uni-icons class="icon" type="cloud-upload" size="26"></uni-icons>
				<view class="wz">保存</view>
			</view>
		</view>
		<!-- 弹窗 @input="onKeyInput" -->
		<uni-popup ref="showtip" type="center" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">{{popupTitle}}</text>
				<input class="uni-input" v-model="popupValue" focus :placeholder="'请输入'+popupTitle" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">取消</text>
					<text class="uni-tip-button" @click="enter()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				//进入类型
				operType: 'add',
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				//基本信息
				departmentInfo:{
					_id: "", // string，自生成
					_ids:"", // string 编号
					compid: "", // string 单位ID
					section:"",//部门名称
					desc:"",//备注
					indexs:""//顺序	
				}
			}
		},
		onLoad(options) {
			_self = this;
			var _id = options.id
			if (_id) {
				if (_id == 'add') {
					_self.operType = 'add'
					uni.setNavigationBarTitle({
						title: "部门资料-新增"
					})
				} else {
					_self.operType = 'save'
					uni.setNavigationBarTitle({
						title: "部门资料-编辑"
					})
					_self.departmentInfo._id = _id;
					//获取资料
					_self.infoGet();
				}
			} else {
				uni.showToast({
					title: '未获取到信息',
					icon: 'none',
					duration: 1000
				});
				// setTimeout(function() {
				// 	uni.navigateTo({
				// 		url: './mainuser'
				// 	});
				// }, 1000);
			
			}
			
		},
		methods: {
			//自动生成最大编号
			getMaxCode(fun) {
				_self.$request({
					name: 'medepartment_maxcodeget',
					data: {
						table: 'department',
						fields: '_ids',
						length: 6
					}
				}).then(res => {
					let maxcode
					if (res.success) {
						maxcode = res.data.maxcode;
					} else {
						maxcode = '';
					}
					fun(maxcode);
				})
			},
			//删除
			delPage() {
				uni.showModal({
					title: '询问',
					content: '确定删除当前部门资料吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						_self.$myCloud
							.callFunction({
								name: 'medepartment_oper',
								data: {
									operType: 'del',
									dataIn: _self.departmentInfo
								}
							})
							.then(res => {
								uni.hideLoading()
								console.log(res);
								if (res.result.success) {
									uni.showToast({
										title: res.result.msg,
										duration: 1000
									});
									setTimeout(function() {
										uni.navigateTo({
											url: './mecompanyList'
										});
									}, 1000);
			
								} else {
									uni.showModal({
										content: res.result.msg,
										showCancel: false
									})
								}
							})
							.catch(err => {
								uni.hideLoading()
								console.error(err)
							})
					},
				});
			},
			//保存
			savePage() {
				if(_self.operType == 'add')
				{
					//新增 自动生成编号
					_self.getMaxCode((e)=>{
							_self.departmentInfo._ids = e;
							_self.saveInfo()
						}
					)
				}
				else
				{
					//普通保存
					_self.saveInfo()
				}
			},
			saveInfo(){
				console.log(_self.departmentInfo)
				if(!_self.departmentInfo.compname)
				{
					uni.showModal({
						title: '警告',
						content: '请输入单位名称',
						showCancel: false,
						confirmText: '确定'
					});
					return 
				}
				this.$myCloud
					.callFunction({
						name: 'medepartment_oper',
						data: {
							operType: _self.operType,
							dataIn: _self.departmentInfo
						}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res);
						if (res.result.success) {
							uni.showToast({
								title: res.result.msg,
								duration: 1000
							});
							setTimeout(function() {
								uni.navigateTo({
									url: './mecompanyList'
								});
							}, 1000);
			
							// uni.navigateBack({
							// 	delta: 1
							// });
							// uni.switchTab({
							// 	url: '/pages/mainme/mainme'
							// });
						} else {
							uni.showModal({
								content: res.result.msg,
								showCancel: false
							})
						}
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			//Popup
			togglePopup(column, title, value) {
				console.log(title)
				this.popupColumn = column
				this.popupTitle = title
				this.popupValue = value
				this.$nextTick(() => {
					this.$refs['showtip'].open()
				})
			},
			cancel() {
				this.$refs['showtip'].close()
			},
			enter() {
				console.log(this.popupValue);
				switch (this.popupColumn) {
					case '_ids':
						this.departmentInfo._ids = this.popupValue
						break;
					case 'section':
						this.departmentInfo.section = this.popupValue
						break;
					case 'desc':
						this.departmentInfo.desc = this.popupValue
						break;
					case 'indexs':
						this.departmentInfo.indexs = this.popupValue
						break;
				}
				this.$refs['showtip'].close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			onKeyInput(e) {
				console.log(e.detail.value)
			},
			//信息获取
			infoGet(){
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'medepartment_oper',
						data:{
							operType: 'get',
							dataIn:{
								_id: _self.departmentInfo._id
							}
						}
					})
					.then(res => {
						uni.hideLoading()
						if (res.success) {
							console.log(res)
							var info = res.result.data;
							_self.departmentInfo = info[0];
							console.log(_self.departmentInfo)
						} else {
							// uni.showModal({ content:"暂无部门资料信息", showCancel: false})
						}
				
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			}
		},
	}
</script>

<style lang="scss">
	// 底部按钮
	.button {
		position: fixed;
		bottom: 0vw;
		width: 94vw;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 2vw 3vw;

		.b-t {

			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			width: 22vw;
			height: 10vw;
			border-radius: 1vw;
			border: 1rpx solid #BEBEBE;
			background: #F1F1F1;

			.icon {
				line-height: 10vw;
			}

			.wz {
				margin-left: 1vw;
				font-size: 3.8vw;
				line-height: 10vw;
			}
		}

	}

	//Popup	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
	*/
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
	//基本信息
	.uni-row {
		border-bottom: #BEBEBE solid 1rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: #E5E5E5;
		font-size: 28upx;
		padding-left: 20upx;
	}
</style>
