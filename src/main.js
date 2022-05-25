import { createApp } from 'vue'
import store from '@/store'
import i18n from '@/i18n'

import App from './App.vue'

createApp(App)
  .use(store)
  .use(i18n)
  .mount('#app')

import '@/utils/handle-window-resize.js'
