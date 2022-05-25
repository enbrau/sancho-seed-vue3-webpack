import lodash from 'lodash'

export default function(app) {
  return new Promise((resolve) => {
    app.config.globalProperties['_'] = lodash
    app.config.globalProperties['$lodash'] = lodash
    resolve()
  })
}
