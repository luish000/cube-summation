const readline = require('readline')
const cmd = require('node-cmd')
const _ = require('lodash')
const rp = require('request-promise')
const qs = require('querystring');
const CubeService = require('../cube/cube.service')
const { steps, wrongOperation } = require('./interactor.constants')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'rappi-challenge> '
})

rl.prompt()

module.exports = class Interactor {

  constructor() {
    this.step = 0
    this.n = 0
    this.m = 0
    this.cube = {}
  }

  async start() {
    this.printStep()
    rl.on('line', async (line) => {
      if (this.step == 0 && !_.isNaN(_.toNumber(line))) {
        this.n = _.toNumber(line)
        return this.advance()
      }
      if (this.step == 1 && !_.isNaN(_.toNumber(line))) {
        this.m = _.toNumber(line)
        const result = await this.perform(`create ${this.n} ${this.m}`)
        if (!result) return
        this.cube = result
        return this.advance()
      }
      if (this.step == 2) {
        const result = await this.perform(line)
        if (result == null) this.printErrorPerformingOperation()
        if (result != null) this.m -= 1
        if (this.m == 0) return this.reset()
        return this.continueOperations()
      }
      console.log(context[this.step])
    }).on('close', () => {
      console.log('Have a great day :)')
      process.exit(0)
    })
  }

  printStep() {
    rl.prompt()
    console.log(steps[this.step])
    rl.prompt()
  }

  advance() {
    this.step += 1
    this.printStep()
  }

  reset() {
    this.step = 0
    printStep()
  }

  continueOperations() {
    rl.prompt()
    console.log(`You have ${this.m} attempts left, keep going with another operation`)
    rl.prompt()
  }

  printErrorPerformingOperation() {
    for (let i = 0; i < wrongOperation.length; i++) {
      rl.prompt()
      console.log(wrongOperation[i])
    }
  }

  async perform(line) {
    try {
      const array = line.trim().split(' ')
      let numbers = array.filter(value => !_.isNaN(_.toNumber(value)))
      numbers = numbers.map(n => Number(n))
      if (line.includes('create')) {
        const [n, m] = numbers
        if (n <=0 || m <= 0) return
        return await CubeService.create({ n, m })
      }
      if ((line.includes('update') || line.includes('UPDATE')) && numbers.length == 4) {
        const [a, b, c, value] = numbers
        const update = await CubeService.update({ tree: this.cube._id, coordinate: [a, b, c], value })
        console.log(`Good! updated position ${[a, b, c]}`)
        return update
      }
      if ((line.includes('query') || line.includes('QUERY')) && numbers.length == 6) {
        const [a, b, c, d, e, f] = numbers
        const query = await CubeService.query({ tree: this.cube._id, from: [a, b, c], to: [d, e, f] })
        console.log(`Good! the query result is ${query}`)
        return query
      }
    } catch(e) {
      console.log('error', e)
    }
  }

}
