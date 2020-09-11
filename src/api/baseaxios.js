import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const service = axios.create({
    baseURL:'http://120.24.4.171:8888/api/private/v1'
})
service.interceptors.request.use(config =>{
    config.headers.Authorization = window.sessionStorage.getItem("token")
    NProgress.start()
    return config
  })
  // 在request拦截器中,隐藏进度条NProgress.done()
  service.interceptors.response.use(config =>{
    NProgress.done()
    return config
  })
export default service