const { clone } = require('./utils')
module.exports = class FenwickTree extends Array {

  static instance(dimensions) {
    const init = (i = 0, depth = 0) => {
      if (i > dimensions.length - 1) return 0
      const tree = new FenwickTree(dimensions[0])
      tree.dimensions = dimensions
      tree.depth = depth
      return clone(tree.fill(init(i + 1, depth + 1)))
    }
    return init()
  }

  update(coordinates, value) {
    let i = coordinates[this.depth]
    let shouldAccumulate = true
    while(i <= this.length) {
      if (this.depth === this.dimensions.length - 1) {
        this[i - 1] += value
      }
      else {
        this[i - 1].update(coordinates, value)
      }
      i = i + (i & -i)
    }
  }

  sum(coordinates) {
    let i = coordinates[this.depth]
    let sum = 0
    let deeper = depth => depth === this.dimensions.length - 1
    while(i > 0) {
      const value = (deeper(this.depth)) ? this[i -1] : this[i - 1].sum(coordinates)
      sum += value
      i -= (i & -i)
    }
    return sum
  }

}
