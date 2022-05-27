import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  install: (app) => {
    app.component('SvgIcon', SvgIcon)
  }
}

const req = require.context('@/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
