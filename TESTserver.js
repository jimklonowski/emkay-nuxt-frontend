const https = require('https')
const fs = require('fs')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const isProd = process.env.NODE_ENV === 'production'
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Nuxt.js setup
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
if (!isProd) {
  const builder = new Builder(nuxt)
  builder.build() // build in dev mode
}

// HTTPS Server
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
}

// Create the server
https.createServer(options, nuxt.render).listen(port, host)
console.log(`Server listening on ${host}:${port}.`)
