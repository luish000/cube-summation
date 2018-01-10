const chai = require('chai')
const path = require('path')
const http = require('chai-http')
const Coordinate = require('./coordinate.model.js')
const Tree = require('../tree/tree.model.js')
const server = require('../../server.test.js')

chai.should()

describe('Coordinate model', () => {

  let tree = {}
  let coordinate = {}

  it('should create a coordinate document in the DB', async function() {
    tree = await Tree.create({dimensions: [2, 2, 2], allowedOperations: 10 })
    coordinate = await Coordinate.create({tree: tree._id, coordinate: [2, 2, 2], value: 10})
  })

})
