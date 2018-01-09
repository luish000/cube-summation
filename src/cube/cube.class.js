const Tree = require('../tree/tree.class.js')
module.exports = class Cube extends Tree {

  constructor(n, m) {
    super([n, n, n])
    this.queries = m
  }

  query([a, b, c], [d, e, f]) {
    const x = this.sum([d, e, f])- this.sum([a - 1, e, f]) -
                   this.sum(d, b - 1, f) + this.sum(a - 1, b - 1, f)
    const y = this.sum(d, e, f - 1) - this.sum(a - 1, e, c - 1) -
                   this.sum(d, b - 1, c - 1)  + this.sum(a - 1,b - 1,c - 1)
    return x - y
  }

}
