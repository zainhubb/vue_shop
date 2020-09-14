import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import baseURL from '../baseUrl'
const service = axios.create({
    baseURL:baseURL
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