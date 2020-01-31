<!-- 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<view class="list-item" hover-class='list-item--hover' @click="chooseImage">
			<view class="list-item__container">
				<view class="list-item__content">
					<text class="list-item__content-title">头像</text>
				</view>
				<view class="list-item__extra">
					<image :src="imgSrc" class="list-item__img"></image>
					<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
				</view>
			</view>
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="工号" rightText="1001" />
			<uni-list-item :show-arrow="true" title="名称" rightText="_陈默" />
			<uni-list-item :show-arrow="true" title="手机" rightText="1340****071" />
			<uni-list-item :show-arrow="true" title="性别" rightText="男" />
			<uni-list-item :show-arrow="true" title="部门" rightText="儿保科" />
			<uni-list-item :show-arrow="true" title="单位" rightText="XXX医院" />
			<uni-list-item :show-arrow="true" title="备注" rightText="暂无备注信息" />
		</uni-list>

	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data(){
			return {
				imgSrc:'../../static/logo.png',
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图']
			}
		},
		methods: {
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						this.imgSrc = res.tempFilePaths[0];
						console.log(this.imgSrc)
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
		
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			}
		}
	}
</script>

<style>
	.uni-row {
		border-bottom: #BEBEBE solid 1rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: #E5E5E5;
	}

	/* ============== */
	.list-item {
		font-size: 32rpx;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 30rpx;
	}

	.list-item--hover {
		background-color: #f1f1f1;
	}

	.list-item__container {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 24rpx 30rpx;
		padding-left: 0;
		flex: 1;
		position: relative;
		justify-content: space-between;
		align-items: center;
		/* #ifdef APP-PLUS || H5*/
		border-bottom-color: #e5e5e5;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.list-item__container:after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #e5e5e5;
	}
	/* #endif */
	.list-item__content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		overflow: hidden;
		flex-direction: column;
		color: #3b4144;

	}

	.list-item__content-title {
		font-size: 28rpx;
		color: #3b4144;
		overflow: hidden;
	}

	.list-item__extra {
		/* width: 25%;*/
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.list-item__img{
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
	}
</style>
