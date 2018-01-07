module.exports = class BinaryIndexedTree {

  constructor(dimensions = [4, 4, 4], depth = 0) {
    const [anyDimension] = dimensions
    this.dimensions = dimensions
    this.size = anyDimension // The dimensions always will be equal to N
    this.depth = depth
    this.array = this.deepest ? new Float64Array(anyDimension) : []
    if (!this.deepest) {
      for (let i = 0; i < anyDimension; i ++) {
        this.array.push(new BinaryIndexedTree(dimensions, depth + 1))
      }
    }
  }

  update(coordinates, value) {
    let i = coordinates[this.depth]
    let r = 0
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

  get(coordinates, i = 0) {
    if (this.deepest) return this.array[coordinates[i] - 1]
    return this.array[coordinates[i] - 1].get(coordinates, i + 1)
  }


}
