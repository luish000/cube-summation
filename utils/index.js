function clone(arr) {
  var i, copy
  if(Array.isArray(arr)) {
    const { depth, dimensions } = arr
    copy = arr.slice(0)
    copy.depth = depth
    copy.dimensions = dimensions
    for( i = 0; i < copy.length; i++ ) {
        copy[i] = clone(copy[i])
    }
    return copy
  } else if( typeof arr === 'object' ) {
    throw 'Cannot clone array containing an object!'
  } else {
    return arr
  }
}

module.exports = { clone }
