/**
 * @name Global utils
 * @author SunSeekerX
 * @time 2019-12-02 15:38:59
 */
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
	navigateTo(url) {
		uni.navigateTo({
			url: url,
			success: res => {},
			fail: () => {},
			complete: () => {}
		});
	},
	//获取当前时间 yyyy-MM-dd hh:mm:ss格式
	 getCurrentTime() {
		//js获取当前时间
		Date.prototype.Format = function (fmt) { // author: meizz
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
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		      return fmt;
		}
		 return new Date().Format("yyyy-MM-dd hh:mm:ss");
		
	}
}
