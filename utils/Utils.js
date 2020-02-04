/**
 * @name Global utils
 * @author SunSeekerX
 * @time 2019-12-02 15:38:59
 */

import HandleError from '@/utils/HandleError' // Handle error
export default {
	/**
	 * @param {Object} msg 需要显示的消息
	 * @param {Object} options 配置,同uni-app官网
	 */
	toast(msg, options) {
		uni.showToast(Object.assign({
			icon: 'none',
			title: msg,
			duration: 2000
		}, options));
	},

	/**
	 * @name 页面跳转
	 * @param {Object} url 跳转的地址
	 */
	navigateTo(ppower,url) {
		//权限判断
		var userinfodata = JSON.parse(uni.getStorageSync('userinfodata'))
		if(userinfodata.permission == 9)
		{
			uni.navigateTo({
				url: url,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
		console.log(ppower)
		if(!userinfodata.power || userinfodata.power == '0')
		{
			uni.showToast({
				title: '暂无权限'
			});
			return 
		}
		var powerIndex = userinfodata.power.indexOf(userinfodata.power.filter((p) => {
			return p.value == ppower && p.checked == true;
			})[0]);
		if(!powerIndex || powerIndex < 1)
		{
			uni.showToast({
				title: '暂无权限'
			});
			return 
		}
		uni.navigateTo({
			url: url,
			success: res => {},
			fail: () => {},
			complete: () => {}
		});
	},
	request({
		name,
		data
	}, $myCloud) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中...'
			})
			// Request
			$myCloud
				.callFunction({
					name,
					data
				})
				.then(res => {
					uni.hideLoading()
					if (res.success && res.result.success) {
						resolve(res.result)
					} else {
						if (res.result.msg) {
							uni.showModal({
								content: res.result.msg,
								showCancel: false
							})
						}
						
						HandleError.handleApiRequestException(res)
					}
				})
				.catch(err => {
					uni.hideLoading()
					HandleError.handleApiRequestException(res)
				})
		})
	},
	//获取当前时间 yyyy-MM-dd hh:mm:ss格式
	getCurrentTime() {
		//js获取当前时间
		Date.prototype.Format = function(fmt) { // author: meizz
			var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"h+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
					o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		return new Date().Format("yyyy-MM-dd hh:mm:ss");

	}
}
