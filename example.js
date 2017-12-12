const queryStringManager = require('./dist')

let qsManager = queryStringManager.read('?by[a][a]=1&by[a][b]=2&with=2')

qsManager.set('by', 20)

console.log(qsManager.get());