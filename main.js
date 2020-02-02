/**
 * @name Import libs
 */
import Vue from 'vue'

/**
 * @name Import Files
 */
import App from './App'
import store from '@/store'
import config from "@/common/config.js"
import Utils from '@/utils/Utils' // Common util
import HandleError from '@/utils/HandleError' // Handle error
const myCloud = uniCloud.init(config.uniCloud)
const request = ({
	name,
	data
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...'
		})
		// Request
		myCloud
			.callFunction({
				name,
				data
			})
			.then(res => {
				uni.hideLoading()
				if (res.result.success) {
					resolve(res.result)
				} else {
					if (res.result.msg) {
						uni.showModal({
							content: res.result.msg,
							showCancel: false
						})
					}
					// HandleError.handleApiRequestException(res.result.msg)
				}
			})
			.catch(err => {
				uni.hideLoading()
				HandleError.handleApiRequestException(err)
			})
	})
}

/**
 * @name Mounted func
 */
Vue.prototype.$store = store
Vue.prototype.config = config
Vue.prototype.$util = Utils // Mounted common utils
Vue.prototype.$handleError = HandleError // Mounted handle error
Vue.prototype.$myCloud = myCloud // Mounted myCloud
Vue.prototype.$request = request

/**
 * @name Libs config
 */
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	config,
	...App,
})
app.$mount()
