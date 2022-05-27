import api from '@/api'

export default function(app) {
  return new Promise((resolve) => {
    app.config.globalProperties['$api'] = api
    resolve()
  })
}
