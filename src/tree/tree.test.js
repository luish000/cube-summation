const chai = require('chai')
const path = require('path')
const BinaryIndexedTree = require('./tree')

chai.should()

describe('Tree', () => {

  let cube = {}
  let square = {}

  before(done => {
    cube = new BinaryIndexedTree([4, 4, 4])
    square = new BinaryIndexedTree([3, 3])
    done()
  })

  it('should update a given coordinate with a given value (square)', done => {
    const coordinates = [
      [1, 1], [1, 2], [1, 3],       // 1 2 3
      [2, 1], [2, 2], [2, 3],       // 4 5 6
      [3, 1], [3, 2], [3, 3]        // 7 8 9
    ]
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    coordinates.forEach((value, i) => square.update(value, values[i]))
    done()
  })

  it('should get the sum from the origin to a given coordinate (square)', done => {
    const coordinates = [
      [1, 1], [1, 2], [1, 3],       // 1 2 3
      [2, 1], [2, 2], [2, 3],       // 4 5 6
      [3, 1], [3, 2], [3, 3]        // 7 8 9
    ]
    const values = [1, 3, 6, 5, 12, 21, 12, 27, 45]
    coordinates.forEach((value, i) => square.sum(value).should.equal(values[i]))
    done()
  })

  it('should update a given coordinate with a given value (cube)', done => {
    const coordinates = [[2, 2, 2], [1, 1, 1], [4, 4, 4], [1, 2, 1]]
    const values = [4, 23, 20, 1000000000]
    coordinates.forEach((value, i) => cube.update(value, values[i]))
    done()
  })

  it('should get a single element from the cube', done => {
    cube.get([1, 1, 1]).should.equal(23)
    done()
  })

  it('should get the sum from the origin to a given coordinate (cube)', () => {
    const coordinates = [[3, 3, 3], [1, 1, 1], [1, 2, 1], [4, 4, 4]]
    const values = [1000000027, 23, 1000000023, 1000000047]
    coordinates.forEach((value, i) => cube.sum(value).should.equal(values[i]))
  })

})
