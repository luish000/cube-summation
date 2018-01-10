const CubeService = require('./cube.service')

class CubeController {

  async create(ctx, next) {
    try {
      const cube = await CubeService.create(ctx.request.body)
      ctx.res.status = 201
      ctx.response.body = cube
    } catch(e) {
      ctx.throw(400, e)
    }
  }

  async update(ctx, next) {
    try {
      ctx.request.body.tree = ctx.params.id
      const cube = await CubeService.update(ctx.request.body)
      ctx.res.status = 200
      ctx.response.body = {}
    } catch(e) {
      ctx.throw(400, e)
    }

  }

  async query(ctx, next) {
    try {
      const { from, to } = ctx.query
      const tree = ctx.params.id
      const obj = { tree, from: from.split(','), to: to.split(',') }
      const value = await CubeService.query(obj)
      ctx.res.status = 200
      ctx.response.body = { value }
    } catch(e) {
      ctx.throw(400, e)
    }
  }

}

module.exports = new CubeController()
