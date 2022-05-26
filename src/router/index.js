import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeRouteHook, afterRouteHook, errorHook } from '@/hooks'

let staticRoutes = []
const moduleFiles = require.context('./modules/', false, /\.js$/)
moduleFiles.keys().forEach((key) => {
  staticRoutes = staticRoutes.concat(moduleFiles(key).default)
  console.log(`[Sancho] Routes loaded: ${key}`)
})

const routes = [
  ...staticRoutes,
  { path: '/404', component: () => import('@/views/error/404.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ left: 0 }),
  routes
})

router.beforeEach(async (to, from, next) => {
  return beforeRouteHook.promise(to, from, next)
    .then(() => {
      next()
    })
    .catch((error) => {
      errorHook.call(error)
    })
})

router.afterEach(async (route) => {
  return afterRouteHook.promise(route)
    .catch((error) => {
      errorHook.call(error)
    })
})

export default router
