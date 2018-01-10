const CubeController = require('./cube.controller')
var Router = require('koa-router')
var router = new Router()

module.exports = router
  .get('/cubes/:id/sum', CubeController.query)
  .post('/cubes', CubeController.create)
  .put('/cubes/:id', CubeController.update)
