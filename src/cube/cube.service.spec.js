const chai = require('chai')
const CubeService = require('./cube.service')
const Cube = require('./cube.class')

chai.should()

describe('Cube service', () => {

  let cube = {}

  it('should create an N cube', async () => {
    const [n, m] = [4, 10]
    cube = await CubeService.create({ n, m })
  })

  it('should update a given coordinate with a given value', async () => {
    const coordinates = [
      { coordinate: [2, 2, 2], value: 4, tree: cube._id },
      { coordinate: [1, 1, 1], value: 23 , tree: cube._id}
    ]
    await CubeService.update(coordinates[0])
    await CubeService.update(coordinates[1])
  })

  it('should get the query between 2 coordinates', async () => {
    const val = await CubeService.query({tree: cube._id, from: [2,2,2], to: [4,4,4] })
    val.should.equal(4)
  })

})
