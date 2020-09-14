import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/home'),
    redirect: '/welcome',
    children: [
      {
        path: '/users',
        component: () => import('../components/users/users')
      },
      {
        path: '/welcome',
        component: () => import('../components/welcome/welcome')
      },
      {
        path: '/roles',
        component: () => import('../components/rights/roles')
      },
      {
        path: '/rights',
        component: () => import('../components/rights/rights')
      },
      {
        path: '/reports',
        component: () => import('../components/reports/reports')
      }, 
      {
        path: '/orders',
        component: () => import('../components/orders/orders')
      },
      {
        path: '/goods',
        component: () => import('../components/goods/goods')
      },
      {
        path: '/categories',
        component: () => import('../components/goods/categories')
      },
      {
        path: '/params',
        component: () => import('../components/goods/params')
      },
      {
        path: '/goods/add',
        component: () => import('../components/goods/add')
      }
    ]
  }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}//解决重复路由console报错

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  //to表示即将跳转的页面
  //from表示从哪个页面开始的跳转
  //next是一个函数,表示放行
  if (to.path === '/login')
    return next()
  //如果去登录页,直接放行
  const login_status = window.sessionStorage.getItem('token')
  if (!login_status)
    return next('/login')
  next()
  //如果没有检测到token,则跳转至登录页
})

export default router
