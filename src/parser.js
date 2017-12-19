import _ from 'lodash'

module.exports = {

  /**
   * THe final object that will rbe returned
   * 
   * @var {object}
   */
  parsedObj: {},

  /**
   * the main parse method
   * 
   * @param {string} str 
   */
  parse(str) {

    this.parsedObj = {}

    if (!this.validateString(str)) {
      return {}
    }

    str = this.clearString(str)

    if (!str) {
      return {}
    }

    _.forEach(str.split('&'), (part) => {
      let pair = part.replace(/\+/g, ' ').split('=');
      let value = pair[1]

      let key = this.splitKeyIfNeeded(pair[0])

      let pathString = ''

      for (let i = 0; i < key.length; i++) {

        pathString = this.buildObj(key[i], pathString, value)

      }
    })

    return this.parsedObj
  },

  /**
   * check if string is valid
   * 
   * @param {string} str 
   */
  validateString(str) {
    if (typeof str !== 'string') {
      throw new Error('you can parse only string!')
      return false
    }

    return true
  },

  /**
   * claer the string
   * 
   * @param {string} str 
   */
  clearString(str) {
    return decodeURIComponent(str.trim().replace(/^[?#&]/, '').replace(/[#&]+$/, ''));
  },

  /**
   * split the string to an array base on php parser style
   * 
   * @param {string} key 
   */
  splitKeyIfNeeded(key) {
    return key.replace(/\]/g, '').split('[')
  },

  /**
   * build a specific key on the final object
   * 
   * @param {string} currentKey 
   * @param {string} pathString 
   * @param {string} value 
   */
  buildObj(currentKey, pathString, value) {

    if (_.isEmpty(currentKey)) {

      let index = _.isArray(_.get(this.parsedObj, pathString)) ? _.get(this.parsedObj, pathString).length : 0

      _.set(this.parsedObj, `${pathString}[${index}]`, value)

      return pathString
    }

    pathString = _.isEmpty(pathString) ? currentKey : `${pathString}.${currentKey}`

    if (_.has(this.parsedObj, pathString) && !isFinite(currentKey)) {
      return pathString
    }

    value = this.transformFinalValue(value)

    _.set(this.parsedObj, pathString, value)

    return pathString
  },

  /**
   * transform some types of data to another type of data if needed
   * 
   * @param {string} value 
   */
  transformFinalValue(value) {
    if (typeof value === 'undefined') {
      return null
    }

    if (/^\d+$/.test(value)) {
      return parseInt(value)
    }

    return value
  }

}