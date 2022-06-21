const chokidar = require('chokidar')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const requireContext = require('require-context')
const path = require('path')

const mockDir = path.resolve(__dirname, './mock')

function registerRoutes(app) {
  let mocks = []
  const moduleFiles = requireContext(mockDir, true, /\.js$/)
  moduleFiles.keys().forEach((key) => {
    for (let apis of moduleFiles(key)) {
      mocks = mocks.concat(apis)
    }
  })

  let mockLastIndex = 0, mockRoutesLength = 0, mockStartIndex = 0

  for (let i = 0; i < mocks.length; i++) {
    let api = mocks[i]
    console.log('Mock added: [' + api.method + ']' + api.url)
    app[api.method](api.url, (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header("X-Powered-By",' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8")
      res.header('Connection', 'keep-alive')

      try {
        const response = api.response()
        res.json(response)
      } catch(e) {
        console.error(e)
      }
    })
  }

  mockLastIndex    = app._router.stack.length
  mockRoutesLength = Object.keys(mocks).length
  mockStartIndex   = mockLastIndex - mockRoutesLength
  
  return { mockRoutesLength, mockStartIndex }
}

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex   = mockRoutes.mockStartIndex

  chokidar.watch(mockDir, {
    ignored: /mock/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)
        // clear routes cache
        Object.keys(require.cache).forEach(i => {
          if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)]
          }
        })
        // register mock routes
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex   = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch(error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}