import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import components from '@/components'

import App from './App.vue'

const app = createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .use(components)

import { preloadHook } from './hooks'
preloadHook.promise(app).then(() => {
  app.mount('#app')
})

import '@/utils/handle-window-resize.js'
