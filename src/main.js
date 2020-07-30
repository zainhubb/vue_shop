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
// 格式化时间过滤器
Vue.filter('dateformat',function(originalval){
  const dt = new Date(originalval)
  const y = dt.getFullYear()
  // padStart第一个参数:默认位数,第二个参数:位数不足时填充
  const m = (dt.getMonth()+1+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')
  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
