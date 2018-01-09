const mongoose = require('mongoose')

const schema = {
  dimensions: Array,
  allowedOperations: Number
}

let Tree = mongoose.model('Tree', schema)

module.exports = Tree
