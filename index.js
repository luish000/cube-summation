const FenwickTree = require('./fenwick-tree.js')

const array = [[1, 2], [3, 4]]

const tree = new FenwickTree([4, 4, 4])


// const k = tree.alternative()

// k[0][0][0] = 1

// console.log(k)

tree.update([1, 1, 1], 4)
tree.update([3, 3, 3], 23)
tree.update([4, 4, 4], 24)
// tree.update([2, 1], 2)
// tree.update([1, 2], 3)
// tree.update([2, 2], 4)

// [[], []]

// tree[0][0][0] = 1

console.log(tree.sum([4, 4, 4]))
