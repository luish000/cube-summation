const Koa = require('koa')
const app = new Koa()
const config = require('node-yaml-config').load('./config.yaml')
const mongoose = require('mongoose')
const cube = require('./src/cube/cube.router')
const bodyParser = require('koa-bodyparser')
const Interactor = require('./src/interactor/interactor.class')


app.use(bodyParser())
app.use(cube.routes())
app.use(cube.allowedMethods());

mongoose.Promise = global.Promise;
const mongooseUri = `mongodb://${config.database.host}:${config.database.port}/`

mongoose.connect(mongooseUri, {useMongoClient: true})

mongoose.connection.on("error", function(err) {
  console.log(`Failed to connect to DB make sure that the database is running on ${mongooseUri}`)
})

mongoose.connection.on("connected", function(ref) {
  new Interactor().start()
})


module.exports = app.listen(config.server.port)
