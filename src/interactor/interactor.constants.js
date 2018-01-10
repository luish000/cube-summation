const n = 'Hey! Please enter the size of the cube (N)'
const m = 'Great! How many operation would you like perform (M)?'
const perform = `Nice! Now you can perform an operation, for instance: update 1 1 1 4 or query 1 1 1 2 2 2`
const queryNote = '(remember... the firts coords should be <= second coords and <= that dimensions length)'
const updateNote = '(remember.. the coordinates should be <= that dimensions length)'
const queryExample = `for update you should enter: UPDATE 1 1 1 1 ${updateNote}`
const updateExample = `for query you should enter: QUERY 1 1 1 2 2 2 ${queryNote}`
const errorPerformingOperation = 'Oopps!! The info that you have sent have an invalid format'



module.exports = {

  steps: [n, m, perform],
  wrongOperation: [errorPerformingOperation, queryExample, updateExample]

}
