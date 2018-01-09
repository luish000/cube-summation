const Koa = require('koa')
const app = new Koa()
const config = require('node-yaml-config').load('./config.yaml')
const mongoose = require('mongoose')

app.use(ctx => {
  ctx.body = {}
})

mongoose.Promise = global.Promise;
const mongooseUri = `mongodb://${config.database.host}:${config.database.port}/`
mongoose.connect(mongooseUri, {useMongoClient: true})

module.exports = app.listen(config.server.port)
