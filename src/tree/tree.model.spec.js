const chai = require('chai')
const path = require('path')
const http = require('chai-http')
const Tree = require('./tree.model.js')
const server = require('../../server.test.js')
const mongoose = require('mongoose')

chai.should()

describe('Tree model', () => {

  let tree = {}

  it('should create a tree document in the DB', async function() {
    tree = await Tree.create({dimensions: [2, 2, 2], queries: 10 })
  })

  it('should return a tree mongooose instance from the DB', async function() {
    const { _id } = tree
    tree = await Tree.find({ _id })
  })

})
