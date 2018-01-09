const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = {
  tree: Schema.Types.ObjectId,
  value: Number,
  coordinate: []
}

let Coordinate = mongoose.model('Coordinate', schema)

module.exports = Coordinate
