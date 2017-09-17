var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PROXY_KEY: '"/ume-ems/rest/s01/"',
  TARGET_WEBSERVICE_SERVER: '"http://localhost:8080/ume-ems-webapp/rest/s01/"',
})
