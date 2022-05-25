import $store from '@/store'

const interval = 300
let lastClick = Date.now() - interval

window.onresize = function() {
  if (Date.now() - lastClick >= interval) {
    $store.dispatch('app/updateWindowSize')
    lastClick = Date.now()
  }
}
