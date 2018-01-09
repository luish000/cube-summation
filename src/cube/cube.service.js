const Tree = require('../tree/tree.model.js')
const Coordinate = require('../coordinate/coordinate.model.js')
const Cube = require('./cube.class.js')

module.exports = class CubeService {

  static async create({ n, m }) {
    const { dimensions, queries } = new Cube(n, m)
    return await Tree.create({ dimensions, queries })
  }

  static async update({ tree, coordinate, value }) {
    const { queries: m, dimensions } = await Tree.findOne({ _id: tree })
    const [n] = dimensions
    const values = await Coordinate.find({ tree })
    const coordinates = new Cube(n, m).use(values).update(coordinate, value)
    const updates = coordinates.map(({ value, coordinate }) => {
      const criteria = { tree, coordinate }
      const data = { tree, value, coordinate }
      return Coordinate.update(criteria, data, { upsert: true })
    })
    return await Promise.all(updates)
  }

  static async query({ tree, from, to }) {
    const { queries: m, dimensions } = await Tree.findOne({ _id: tree })
    const [n] = dimensions
    let coordinates = await Coordinate.find({ tree })
    return new Cube(n, m).use(coordinates).query(from, to)
  }

}
