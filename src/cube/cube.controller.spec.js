const chai = require('chai')
const http = require('chai-http')
const server = require('../../server.test.js')
const mongoose = require('mongoose')

chai.should()
chai.use(http)

describe('Cube Controller', () => {

  let cube = {}

  it('should create a cube', async function() {
    const res = await chai.request(server)
      .post('/cubes')
      .send({ n: 4, m: 4 })
    res.should.have.status(200)
    res.should.be.json
    res.body.should.have.property('queries')
    res.body.should.have.property('dimensions')
    res.body.queries.should.be.equal(4)
    res.body.dimensions.should.be.an('array').that.includes.members([4, 4, 4])
    cube = res.body
  })

  it('should update a cube', async function() {
    const values = { coordinate: [2, 2, 2], value: 4 }
    const res = await chai.request(server)
      .put(`/cubes/${cube._id}`)
      .send(values)
    res.should.have.status(200)
    res.should.be.json
  })

  it('should query the cube between two coordinates', async function() {
    const res = await chai.request(server)
      .get(`/cubes/${cube._id}/sum?from=2,2,2&to=4,4,4`)
    res.should.have.status(200)
    res.should.be.json
  })

})
