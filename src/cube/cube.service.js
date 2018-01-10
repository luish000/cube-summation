const Tree = require('../tree/tree.model.js')
const Coordinate = require('../coordinate/coordinate.model.js')
const Cube = require('./cube.class.js')
const mongoose = require('mongoose');

class CubeService {

  async create({ n, m }) {
    const { dimensions, queries } = new Cube(n, m)
    return await Tree.create({ dimensions, queries })
  }

  async update({ tree, coordinate, value }) {
    const _id = mongoose.Types.ObjectId(tree)
    const { queries: m, dimensions } = await Tree.findOne({ _id })
    if (!this.canUpdate(coordinate, dimensions)) throw new Error()
    const [n] = dimensions
    const values = await Coordinate.find({ tree })
    const coordinates = new Cube(n, m).use(values).update(coordinate, value)
    const updates = coordinates.map(({ value, coordinate }) => {
      return this.updateCoordinate({ tree: _id, value, coordinate })
    })
    return await Promise.all(updates)
  }

  async query({ tree, from, to }) {
    const _id = mongoose.Types.ObjectId(tree)
    const { queries: m, dimensions } = await Tree.findOne({ _id })
    if (!this.canQuery(from, to, dimensions)) throw new Error()
    const [n] = dimensions
    let coordinates = await Coordinate.find({ tree })
    return new Cube(n, m).use(coordinates).query(from, to)
  }

  updateCoordinate({ tree, value, coordinate }) {
    const criteria = { tree, coordinate }
    const opts = { upsert: true }
    return Coordinate.update(criteria, { tree, value, coordinate }, opts)
  }

  canQuery(from, to, dimensions) {
    if (!this.validCoordinates([from, to], dimensions)) return false
    for (let i = 0; i < dimensions.length; i++) {
      if (from[i] > to[i]) return false
    }
    return true
  }

  canUpdate(coordinate, dimensions) {
    if (!this.validCoordinates([coordinate], dimensions)) return false
    return true
  }

  validCoordinates(coordinates, dimensions) {
    for (let i = 0; i < coordinates.length; i++) {
      for (let j = 0; j < coordinates[i].length; j++) {
        if (coordinates[i][j] > dimensions[j] || coordinates[i][j] < 0) {
          return false
        }
      }
    }
    return true
  }

}

module.exports = new CubeService()
