const Koa = require('koa')
const app = new Koa()
const config = require('node-yaml-config').load('./config.yaml')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(
  `mongodb://${config.database.host}:${config.database.port}/rappi`, {
  useMongoClient: true
})


app.use(ctx => {
  ctx.body = {}
})

const server = app.listen(config.server.port)

module.exports = server
