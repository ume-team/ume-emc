var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TARGET_WEBSERVICE_SERVER: '"http://localhost:8080/em-spi/rs/s01/"',
})
