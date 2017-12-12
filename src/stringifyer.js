import _ from 'lodash'

module.exports =  {

  /**
   * the finale strigify result
   * 
   * @var string
   */
  stringResult: '',

  /**
   * main strigify method
   * 
   * @param {object} obj 
   */
  stringify(obj) {
    
    if (!this.validate(obj)) {
      return ''
    }

    return this.recursiveRun(obj).slice(0, -1)
  },

  /**
   * run over the obeject or the array and create the string version
   * 
   * @param {object|array} obj 
   * @param {string} preFix 
   */
  recursiveRun(obj, preFix = '%replaceme%') {
    let keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {

      let value;

      let prefixStr = preFix.replace('%replaceme%', keys[i]);

      if (typeof obj[keys[i]] === 'array' || typeof obj[keys[i]] === 'object') {
        value = this.recursiveRun(obj[keys[i]], prefixStr  + '[%replaceme%]')  

        continue
      }

      value = obj[keys[i]]
      this.stringResult += prefixStr + '=' + value+ '&' 
    }

    return this.stringResult
  },

  /**
   * validate for object
   * 
   * @param {object} obj 
   */
  validate(obj) {
    if (typeof obj !== 'object') {
      throw 'You can only strigify an object'
      return false
    }

    return true
  }

}