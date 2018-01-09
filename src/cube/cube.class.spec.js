const chai = require('chai')
const path = require('path')
const Cube = require('./cube.class')

chai.should()

describe('Cube class', () => {

  let cube = {}
  let square = {}

  before(done => {
    cube = new Cube(4, 10)
    done()
  })

  it('should update a given coordinate with a given value', done => {
    const coordinates = [[2, 2, 2], [1, 1, 1]]
    const values = [4, 23]
    coordinates.forEach((value, i) => cube.update(value, values[i]))
    done()
  })

  it('should get a single element from the cube', done => {
    cube.get([1, 1, 1]).should.equal(23)
    done()
  })

  it('should get a query result between two coordinates', () => {
    cube.query([2, 2, 2], [4, 4, 4]).should.equal(4)
  })

})
