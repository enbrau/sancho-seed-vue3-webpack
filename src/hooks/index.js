import { AsyncParallelHook, SyncHook } from 'tapable'

function createHook(hookObject, hookType, hooks, tapMethod) {
  for (const hookName in hooks) {
    hookObject[tapMethod](hookName, (param) => {
      return hooks[hookName](param)
    })
    console.log(`[Sancho][Hook] Loaded: ${hookType} - ${hookName}`)
  }
  return hookObject
}

const preloadHooks = {}
const preloadHookFiles = require.context('./preload/', false, /\.js$/)
preloadHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  preloadHooks[moduleName] = preloadHookFiles(key).default
})
export const preloadHook = createHook(new AsyncParallelHook(['app']), 'preload',  preloadHooks, 'tapPromise')

const requestHooks = {}
const requestHookFiles = require.context('./request/', false, /\.js$/)
requestHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  requestHooks[moduleName] = requestHookFiles(key).default
})
export const requestHook  = createHook(new SyncHook(['request']), 'request', requestHooks, 'tap')

const responseHooks = {}
const responseHookFiles = require.context('./response/', false, /\.js$/)
responseHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  responseHooks[moduleName] = responseHookFiles(key).default
})
export const responseHook = createHook(new SyncHook(['response']), 'response', responseHooks, 'tap')

const errorHooks = {}
const errorHookFiles = require.context('./error/', false, /\.js$/)
errorHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  errorHooks[moduleName] = errorHookFiles(key).default
})
export const errorHook = createHook(new SyncHook(['error']), 'error',  errorHooks, 'tap')

const beforeRouteHooks = {}
const beforeRouteHookFiles = require.context('./beforeRoute/', false, /\.js$/)
beforeRouteHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  beforeRouteHooks[moduleName] = beforeRouteHookFiles(key).default
})
export const beforeRouteHook = createHook(new AsyncParallelHook(['to', 'from', 'next']), 'beforeRoute',  beforeRouteHooks, 'tapPromise')

const afterRouteHooks = {}
const afterRouteHookFiles = require.context('./afterRoute/', false, /\.js$/)
afterRouteHookFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  afterRouteHooks[moduleName] = afterRouteHookFiles(key).default
})
export const afterRouteHook = createHook(new AsyncParallelHook(['route']), 'afterRoute',  afterRouteHooks, 'tapPromise')
