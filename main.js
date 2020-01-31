import Vue from 'vue'
import App from './App'


import config from "./common/config.js"
import Utils from '@/utils/Utils' // Common util
import HandleError from '@/utils/HandleError' // Handle error

/**
 * @name Mounted func
 */
Vue.prototype.config=config
Vue.prototype.$util = Utils // Mounted common utils
Vue.prototype.$handleError = HandleError // Mounted handle error
Vue.prototype.$myCloud = '123' // Mounted myCloud

/**
 * @name Libs config
 */
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	config,
})
app.$mount()
