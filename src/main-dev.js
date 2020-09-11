import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import baseurl from './baseUrl'
import './assets/css/golbal.css'
import  './assets/fonts/iconfont.css'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import './plugins/element.js'


// 加载进度条
Vue.use(VueQuillEditor, /* { default global options } */)

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
