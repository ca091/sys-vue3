import { createWebHistory, createRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import routes from './routes'
import Cache from '@shared/Cache'
import { checkRoutePermission } from '@shared/Permissions'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const WhitePages: string[] = [
  'watch',
]

router.beforeEach(async(to, from, next) => {
  console.log('from: ' + String(from.name))
  if (to.name === 'login') {
    next()
  } else {
    if (Cache.local.get(Cache.Key.Token)) {
      let key = to.name ? to.name.toString() : ''
      if (!checkRoutePermission(key)) {
        ElMessage({
          type: 'error',
          message: '无权访问',
        })
        next(false)
      } else {
        next()
      }
      // 需要使用js临时缓存，页面刷新时失效
      // if (!getRouteSeted()) {
      //   router.addRoute(generateRoutes())
      //   next({path: to.path, query: to.query})
      // } else {
      //   next()
      // }
    } else {
      if (WhitePages.includes(to.name as string)) {
        return next()
      }
      next({name: 'login'})
    }
  }
})

export default router
