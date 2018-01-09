const mongoose = require('mongoose')

const schema = {
  dimensions: Array,
  queries: Number
}

let Tree = mongoose.model('Tree', schema)

module.exports = Tree
