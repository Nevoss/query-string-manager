const _ = require('lodash')

module.exports =  {

  stringify(obj) {
    
    if (this.validate(obj)) {
      return ''
    }

    this.recursiveRun(obj)

  },

  recursiveRun(obj) {
    let keys = Object.keys(obj)

    let string = ''

    for (let i; i < keys.lenght; i++) {
      string += keys[i] + '='

      let value;

      if (typeof obj[key[i]] === 'array' || typeof obj[key[i]] === 'object') {
        value = this.recursiveRun(obj[key[i]])  
      } else {
        value = obj[key[i]]
      }

      string += value + '&'

      return string
    }
  },

  validate(obj) {
    if (typeof obj !== 'object') {
      return false
    }

    return true
  }

}