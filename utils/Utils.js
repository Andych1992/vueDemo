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
}
