import { createApp } from 'vue'
import $router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import components from '@/components'

import App from './App.vue'
import { preloadHook } from './hooks'

import '@/utils/handle-window-resize.js'

let instance = null
let router = $router

function render(props = {}) {
  const { container } = props

  router = require('@/router')

  instance = createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(components)

  preloadHook.promise(instance).then(() => {
    instance.mount(container ? container.querySelector('#app') : '#app')
  })
}

// run as main application
import { registerMicroApps, start } from 'qiankun'
const apps = require('../sub-apps.js')
if (apps.length > 0) {
  registerMicroApps(apps)
  start()
}

// run as independent application
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// run as micro application
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.unmount()
  instance = null
  router = null
  console.log('[vue] vue app unmounted')
}
