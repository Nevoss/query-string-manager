const queryStringManager = require('./src')

let result = queryStringManager.read('?by=name&form[name]=somthing&form[email]=nevos12@gmail.com&form[keys][]=1&form[keys][]=2&form[keys][]=3')

console.log(result.get());