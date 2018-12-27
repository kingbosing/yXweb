import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function goToLogin() {
  // window.location.href = '#/home/index'

  if (getToken()) {
    // window.location.href = '#/home/index'
    router.push({ path: '/home/index' })
  } else {
    router.push({ path: '/loginModule_index' })
    // window.location.href = '/home/index'
  }
}
// permissiom judge function
function hasPermission(roles, permissionRoles) {
  return true
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  // if (!permissionRoles) return true
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect', '/loginModule_index', '/register_index', '/register/RegisteInformation',
  '/register/RegisteSuccession', '/loginModule/ForgetPassword', '/loginModule/ResetPassword', '/loginModule/ResetSuccessful'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log('****')
  console.log('​getToken', getToken())
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    // console.log(to.path)
    if (to.path === '/loginModule_index') {
      next({ path: '/home/index' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => {
          console.log('​res', res)
          // 拉取user_info
          // if (!res.data.token) {
          //   goToLogin()
          //   return
          // }
          const roles = res.data.Data // note: roles must be a array! such as: ['editor','develop']
          // next({ ...to, replace: true })
          store.dispatch('GenerateRoutes', { roles }).then((res) => {
            console.log('​res', res)
            // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          // 刷新公司
          store.dispatch('GetCompany').then(() => {})

          // 公司部门及员工树
          store.dispatch('GetCompanyAllTree').then(() => {})
          // 财务是否初始化
          store.dispatch('GetFinancialInitial').then(() => {})
          // 获取权限
          store.dispatch('GetAuthority').then(() => {})
        })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
              // goToLogin()
            })
          })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next() //
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // goToLogin()
      next('/loginModule_index') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
