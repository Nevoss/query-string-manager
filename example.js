const queryStringManager = require('./dist')

let qsManager = queryStringManager.read('?by[a][a]=1&by[a][b]=2&with=2')

qsManager.push('by', 20)
console.log(qsManager.stringify());
qsManager.push('by', 1)
console.log(qsManager.stringify());
qsManager.push('by', 2)
console.log(qsManager.stringify());
