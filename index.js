const FenwickTree = require('./fenwick-tree.js')

const array = [[1, 2], [3, 4]]

const tree = FenwickTree.instance([3, 3, 3])


tree.update([1, 1, 1], 3)
tree.update([2, 2, 2], 4)
tree.update([1, 2, 2], 4)
tree.update([1, 1, 2], 4)
tree.update([3, 3, 3], 23)
// tree.update([2, 1], 2)
// tree.update([1, 2], 3)
// tree.update([2, 2], 4)

// [[], []]

console.log(tree.sum([3, 3, 3]))
