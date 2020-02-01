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
			<uni-list-item :show-arrow="true" title="工号" :rightText="userinfo._ids" />
			<uni-list-item :show-arrow="true" title="名称" :rightText="userinfo.sname" @click="editinfo('sname')" />
			<uni-list-item :show-arrow="true" title="身份证号" :rightText="userinfo.cards" @click="editinfo('card')" />
			<uni-list-item :show-arrow="true" title="手机" :rightText="userinfo.phones" @click="editinfo('phone')"/>
			
			<view class="listitem">
				    <view class="listitemt">年龄</view>
					<view class="listitemd">
						<uni-icons type="arrowright" style="color: #AAAAAA;" size="18"></uni-icons>
						</view>
					<view class="listditmc"> 
					<picker  @change="chooseages" :value="maindex" :range="mages">
					    <view class="uni-input">{{mages[maindex]}}</view>
					</picker>
					</view>
					
			<view style="clear: both;"></view>
			</view>
			
			
			<uni-list-item :show-arrow="true" title="性别" :rightText="userinfo.sex" @click="chooseSex" />
			<uni-list-item :show-arrow="true" title="单位" :rightText="userinfo.comp" @click="chooseComp"/>
			<uni-list-item :show-arrow="true" title="部门" :rightText="userinfo.dept" @click="chooseDept"/>
			<uni-list-item :show-arrow="true" title="备注" :rightText="userinfo.desc" @click="editinfo('desc')" />
		</uni-list>

	<view  style="padding: 10rpx;height: 100rpx;border: none;margin-top: 20rpx;">
		<button @click="seveinfobtn"  type="primary">保存</button>
	</view>
	

	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	var _self,userdata;
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
				//头像
				imgSrc:'../../static/logo.png',
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				mcompid:"0",isbm:false,
				mpgto:"0",
				//个人资料
				sexType:['男', '女'],
				deptType:['妇产科','儿保科'],
				compType:['xxx医院','xxx二院'],
				mages:[],
				maindex:18,
				userinfo:{
					_id:"1001",
					_ids:"1001",
					sname:"未设置",
					card:"0",
					cards:"0",
					age:"18",
					phone:"未设置",
					phones:"未设置",
					desc:"暂无备注信息",
					sex:'男',
					dept:'请选择部门',
					sectionid:'0',
					comp:'请选择单位',
					compid:'0'
				}
			}
		},
		onLoad() {
			_self = this;
			_self.ageinit();
			userdata = JSON.parse(uni.getStorageSync("userinfodata"));
			_self.getuserinfodata();
				
		},
		onShow() {
			
		var pgcom = uni.getStorageSync('pgcom');
		if(pgcom == "cpget"){
			var mcompdataget = JSON.parse(uni.getStorageSync('compdata'));
			uni.setStorageSync('pgcom', "0");
			_self.userinfo.comp = mcompdataget.compname;
			_self.mcompid = mcompdataget._id;
			_self.userinfo.compid = mcompdataget._id;
			console.log("这是选择公司回来的" + _self.mcompid);
			_self.getbm();
		}else if(pgcom =="infoed"){
			var meditext = uni.getStorageSync('editext');
			uni.setStorageSync('pgcom', "0");
			switch (_self.mpgto) {
				case 'sname':
					//姓名
					_self.userinfo.sname = meditext;
					break;
				case 'card':
					//姓名
					var uid =  meditext;
						uid = uid.substring(0,6) + "******" + uid.substring(uid.length - 6,uid.length);
					_self.userinfo.cards = uid;
					_self.userinfo.card = meditext;
					break;
				case 'phone':
					//电话
					_self.userinfo.phone = meditext;
					var mext = meditext.substring(0,4) + "******" + meditext.substring(meditext.length - 4,meditext.length);
					
					_self.userinfo.phones = mext;
					break;
				case 'desc':
					//备注
					_self.userinfo.desc = meditext;
					break;
			}
			
		}
		
		
		},
		methods: {
			//初始化数据
			getuserinfodata(){
				var uid = userdata._id;
					
				uid = uid.substring(0,6) + "******" + uid.substring(uid.length - 6,uid.length);
				_self.userinfo._id = userdata._id;
				_self.userinfo._ids = uid;
				
				uid =  userdata.id_card;
				uid = uid.substring(0,6) + "******" + uid.substring(uid.length - 6,uid.length);
				_self.userinfo.cards = uid;
				_self.userinfo.card = userdata.id_card;
				
				
				
				_self.userinfo.sname = userdata.sname;
				_self.userinfo.age = userdata.age;
				_self.maindex = userdata.age;
				
				uid =  userdata.phone;
				uid = uid.substring(0,6) + "******" + uid.substring(uid.length - 6,uid.length);
				
				_self.userinfo.phone = userdata.phone;
				_self.userinfo.phones = uid;
				
				_self.userinfo.desc = userdata.desc;
				_self.userinfo.sex = userdata.sex;
				_self.userinfo.dept = userdata.section;
				_self.userinfo.sectionid = userdata.sectionid;
				_self.userinfo.comp = userdata.company;
				_self.userinfo.compid = userdata.compid;
				_self.imgSrc = userdata.photo;
				
		
			},
			ageinit(){
				var mage = Array();
				for(var i=0;i<160;i++){
					mage.push(i);
				}
				_self.mages = mage;
			},
			//设置单位
			
		
			getbm(){
				//console.log("获取部门" + _self.mcompid);
				_self.isbm = false;
				this.$myCloud.callFunction({
						name: 'mebmtabget',
						data:{keystr:'0',compid:_self.mcompid}
					}).then(res => {
						_self.isbm = true;
						console.log(res.result)
						if(res.result.success == true){
							var mdata = res.result.data;
							console.log(mdata.data)
							if(mdata.data.length < 1){
								_self.deptType = [{section:"暂无部门",id:"0"}];
							}else{
								_self.deptType = mdata.data;
							}
							
						}else{uni.showToast({title: '暂无部门',icon:'none'});}
					}).catch(err => {console.error(err)})
			},
			seveinfobtn(){
				//保存个人信息
				var uf = _self.userinfo;
				//pages/mainme/mainmeinfoedit
				var fomdata = {_id:uf._id,sname:uf.sname,id_card:uf.card,photo:_self.imgSrc,
				phone:uf.phone,age:uf.age,desc:uf.desc,sex:uf.sex,section:uf.sectionid,company:uf.compid}
				
				console.log(JSON.stringify(fomdata))
				
				uni.showLoading({
					title: '加载中...'
				})
				// uniCloud
				this.$myCloud.callFunction({
						name: 'meuserinfosave',
						data: fomdata
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
						if (res.result.success) {
							uni.showToast({
							    title: res.result.msg,
							    duration: 1000
							});
							
							uni.switchTab({
								url: '/pages/mainme/mainme'
							});
				
						} else {
							uni.showModal({ content: res.result.msg, showCancel: false})
				
						}
				
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
				
				
				
				
			},
			editinfo(e){
				_self.mpgto = e;
				uni.navigateTo({
					url: '/pages/mainme/mainmeinfoedit?pg=' + e
				});
				
			},
			//单位
			chooseComp(){
				uni.navigateTo({
					url: '/pages/mainme/mainmegetcp'
				});
				
				
			},
			//部门
			chooseDept(){
				if(_self.isbm == false){
					uni.showToast({title: '正在准备',icon:'none'});
					return;
				}
				
				uni.showActionSheet({
					title:'选择部门',
					itemList: this.deptType.map((item)=>{return item.section}),
					success: (e) => {
						console.log(e.tapIndex);
						this.userinfo.dept = this.deptType[e.tapIndex].section;
						this.userinfo.sectionid = this.deptType[e.tapIndex]._id;
					}
				})
			},
			chooseages(e){
				//年龄选择
				//console.log('picker发送选择改变，携带值为', e.target.value)
				  _self.maindex = e.target.value
				  _self.userinfo.age = e.target.value
			},
			//性别
			chooseSex() {
				uni.showActionSheet({
					title:'选择性别',
					itemList: this.sexType,
					success: (e) => {
						console.log(e.tapIndex);
						this.userinfo.sex = this.sexType[e.tapIndex]
					}
				})
			},
			//修改头像
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
	.listitem{margin-left: 30rpx; height: 80rpx;line-height: 80rpx; padding-right: 20rpx;border-top: #E5E5E5 solid 1rpx;}
	.listitemt{float: left;font-size: 26rpx;color: #333333;}
	.listitemd{float: right;margin-right: 10rpx;}
	.listditmc{float: right;font-size: 18rpx;color: #999999;}
	
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
