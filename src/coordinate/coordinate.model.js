const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = {
  tree: Schema.Types.ObjectId,
  content: Number,
  value: []
}

let Coordinate = mongoose.model('Coordinate', schema)

module.exports = Coordinate
