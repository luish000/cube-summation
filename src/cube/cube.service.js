const Cube = require('tree/tree.model.js')

class CubeService {

  async create({ n, m }) {
    const values = { dimensions: [n, n, n], allowedOperations: m }
    return await Tree.create(values)
  }

  async query({ _id, from, to }) {
    const { allowedOperations, dimensions } = await Tree.findOne({ _id })
    const coordinates = await Coordinate.find({ tree: cube })
    return new BinaryIndexedTree(dimensions).use(coordinates).sum(to)
  }

  update({ coordinate, value }) {
    const { allowedOperations, dimensions } = await Tree.findOne({ _id })
    const coordinates = await Coordinate.find({ tree: cube })
    return new BinaryIndexedTree(dimensions).use(coordinates).update(coordinate, value)
  }

}
