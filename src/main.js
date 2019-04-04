import Vue from 'vue'
import App from './App'
import * as router from './utils/route.js'
import * as utils from './utils/utils.js'
import request from './utils/request'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$router = router
Vue.prototype.$http = request
Vue.prototype.$store = store
Vue.prototype.$utils = utils

const app = new Vue(App)
app.$mount()
