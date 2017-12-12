const queryStringManager = require('./dist')

let result = queryStringManager.read('?by[a][a]=1&by[a][b]=2&with=2')

console.log(result.stringify());