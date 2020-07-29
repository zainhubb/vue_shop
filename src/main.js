import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/golbal.css'
import  './assets/fonts/iconfont.css'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
// 在request拦截器中,展示进度条NProgress.start()
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem("token")
  NProgress.start()
  return config
})
// 在request拦截器中,隐藏进度条NProgress.done()
axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
