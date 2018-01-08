/*
 *
 * What is a binary indexed tree ?
 *
 * A binary indexed tree or Fenwick tree is a data structure that can
 * efficiently update elements and calculate prefix sums in a table of
 * numbers.
 *
 * How does Binary Indexed Tree work?
 * The idea is based on the fact that all positive integers can be represented
 * as sum of powers of 2. For example 19 can be represented as 16 + 2 + 1.
 * Every node of BI Tree stores sum of n elements where n is a power of 2.
 *
 * If you want more information about what is a Fenwick tree check this link
 * https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/
 *
 * How works this class?
 * The class create an structure based on an array of dimensions, for instance
 * if we need create a 2 x 2 matrix we call:
 *
 * tree = BinaryIndexedTree([2, 2])
 *
 * Now the constructor of BinaryIndexedTree sets  3 basics fields: dimensions,
 * size, depth and 1 other important field called array, array stores in every
 * position a BinaryIndexedTree instance, this is the key of the structure
 * because with this we can do the operations recursively.
 *
 * for example in the method sum: if we need the sum from the origin to
 * coordinates (2, 2) the only that we need to do is position ourselves in
 * array[coordinates[depth = 0]] an ask if this is the deepest, if the
 * answer is not we call array[2].sum([2, 2]) this call is going to do the same:
 *
 * 1 - position ourselves in array[coordinates[depth = 1]]
 * 2 - if is deepest then add to the sum variable the value of the pos i - 1
 * 3 - get the parent of the position i = 2 i = 0010 i, -i = 1110 i - (i & -i) = 0
 * 4 - if i > 0 repeat if not then return the sum
 */

module.exports = class BinaryIndexedTree {

  constructor(dimensions = [100, 100, 100], depth = 0) {
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

  update(coordinates, value, carry = []) {
    let i = coordinates[this.depth]
    let r = []
    while (i <= this.size) {
      const k = i - 1
      if (this.deepest) {
        carry.push(i)
        this.array[k] += value
        r.push({ coordinate: carry.slice(), value: this.array[k] })
        carry.pop()
      } else {
        carry.push(i)
        r = r.concat(this.array[k].update(coordinates, value, carry.slice()))
        carry.pop()
      }
      i = i + (i & -i)
    }
    return r
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
