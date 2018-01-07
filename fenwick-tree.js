module.exports = class BinaryIndexedTree {

  constructor(dimensions, depth = 0) {
    const [anyDimension] = dimensions // The dimensions always will be equal to N
    this.dimensions = dimensions
    this.size = anyDimension
    this.depth = depth
    this.array = []
    for (let i = 0; i < anyDimension; i ++) {
      this.deepest ? this.array.push(0) : this.array.push(new BinaryIndexedTree(dimensions, depth + 1))
    }
  }

  update(coordinates, value) {
    let i = coordinates[this.depth]
    while (i <= this.size) {
      const k = i - 1
      this.deepest ? this.array[k] += value : this.array[k].update(coordinates, value)
      i = i + (i & -i)
    }
  }

  sum(coordinates) {
    let i = coordinates[this.depth]
    let carry = 0
    while (i > 0) {
      const k = i - 1
      carry += this.deepest ? this.array[k] : this.array[k].sum(coordinates)
      i -= (i & -i)
    }
    return carry
  }

  get deepest() {
    return this.depth == this.dimensions.length - 1
  }

}
