const chai = require('chai')
const path = require('path')
const BinaryIndexedTree = require('./tree')

chai.should()

describe('Tree', () => {

  before(done => {
    tree = new BinaryIndexedTree([4, 4, 4])
    done()
  })

  it('should update a given coordinate with a given value', done => {
    const coordinates = [[2, 2, 2], [1, 1, 1], [4, 4, 4], [1, 2, 1]]
    const values = [4, 23, 20, 1000000000]
    coordinates.forEach((value, i) => tree.update(value, values[i]))
    done()
  })

  it('should get a single element from the array', done => {
    tree.get([1, 1, 1]).should.equal(23)
    done()
  })

  it('should from the origin point to a given coordinate', () => {
    const coordinates = [[3, 3, 3], [1, 1, 1], [1, 2, 1], [4, 4, 4]]
    const values = [1000000027, 23, 1000000023, 1000000047]
    coordinates.forEach((value, i) => tree.sum(value).should.equal(values[i]))
  })

})
