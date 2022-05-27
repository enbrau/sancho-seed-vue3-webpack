import { createStore } from 'vuex'

const modules = {}
const moduleFiles = require.context('./modules/', false, /\.js$/) 
moduleFiles.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = moduleFiles(key).default
  console.log(`[Sancho] Storage unit loaded: ${moduleName}`)
})

export default modules
