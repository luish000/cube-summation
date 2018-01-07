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
    const values = [4, 23, 20, 10]
    coordinates.forEach((value, i) => tree.update(value, values[i]))
    done()
  })

  it('should get a single element from the array', done => {
    tree.element([1, 1, 1]).should.equal(23)
    done()
  })

  it('should from the origin point to a given coordinate', () => {
    const coordinates = [[3, 3, 3], [1, 1, 1], [1, 2, 1], [4, 4, 4]]
    const values = [37, 23, 33, 57]
    coordinates.forEach((value, i) => tree.sum(value).should.equal(values[i]))
  })

})
