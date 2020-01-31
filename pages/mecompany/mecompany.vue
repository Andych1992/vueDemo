<template>
	<view>
		
		<view class="conview">
			<view class="uni-row" >
			<view class="inpus fl" >
				<image class="micon fl" src="../../static/icon/search.png"></image>
				<input type="text" class="fl" v-model="keystrs" placeholder="关键字" />
			</view>
			<button class="mbtn fl" @click="searchbtn">搜索</button>
		</view>
		</view>
		<view style="height: 10rpx;clear: both;"></view>
		
		<view class="uni-row" style="padding: 10rpx;">
			<button @click="newaddbtn"  type="primary">新增</button>
		</view>
<!--  var	compdatas = [
 {cpnames:'北京第一人民医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'srw1'},
 	{cpnames:'北京第二人民医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'sdf2'},
 	{cpnames:'北京解放军第三附属医院',cpimg:'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png',cpid:'sef3'}
 				] -->		
		
		<uni-list>
			<!-- <uni-list-item title="某某医院1" thumb="../../static/icon/compicon.png"></uni-list-item> -->
			<!--  {compname,jname,address,contacts,tel,cpaddress,cplogo,desc} -->
			<block  v-for="(item, index) in compdata" :key="index" >
			<uni-list-item @tap="listclick(index)"  :title=item.jname :thumb=item.cplogo :note=item.cpaddress > </uni-list-item>
			
			</block>
			
		</uni-list>

	</view>
</template>
		
<script>
var _self,userdata;	
export default {
		data() {
			return {
				userinfo:{},
				keystrs:"",
				compdata:[]
			}
		},
		onLoad() {
			_self=this;
			userdata = JSON.parse(uni.getStorageSync("userdata"));
			
			
		},
		methods: {
			searchbtn(){
				console.log(_self.keystrs);
				_self.getcomp(_self.keystrs);
			},
			getcomp(keystr = '0'){
				if(keystr == ""){keystr = '0';}
			
				uniCloud.callFunction({
						name: 'megetcomp',
						data:{keystr:keystr}
					})
					.then(res => {
						
						console.log(res.result)
						if(res.result.success == true){
							var mdata = res.result.data;
							console.log(mdata.data)
							_self.compdata = mdata.data;
						}else{
							uni.showModal({ content: res.result.msg, showCancel: false})
						}
						
					})
					.catch(err => {
						console.error(err)
					})
				
				
			},
			listclick(e){
				
				var datas = JSON.stringify( this.compdata);
				uni.setStorageSync('compdata', datas);
								
				uni.navigateTo({
				    url: '/pages/mecompany/mecompanydes?ty=o'
				});
				
				
			},
			newaddbtn(){
				uni.navigateTo({
				    url: '/pages/mecompany/mecompanydes?ty=n'
				});
			}
		}
	}
</script>

<style>
.conview{background-color: #FEFEFE; width: 730rpx;height: 80rpx;margin-left: 10rpx;}

.fl{float: left;}
.micon{width: 60rpx;height: 60rpx;margin-top: 10rpx;margin-left: 10rpx;}	
.uni-row{margin-top: 20rpx;}
.inpus{border: #D8D8D8 solid 1rpx;height: 80rpx;background-color: #FEFEFE;border-radius: 10rpx;}
.inpus input{height: 60rpx;line-height: 60rpx;padding: 10rpx;width: 460rpx;}
.mbtn{width: 160rpx !important;margin-left: 10rpx;background-color: #FFFFFF;}
</style>
