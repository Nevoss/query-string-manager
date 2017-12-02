import _ from 'lodash'

export default {

  default: {},

  finalObj: {},

  parse(str = null) {

    if (!this.validateString(str)) {
      return this.default
    }

    str = this.clearString(str)

    if (!str) {
      return this.default
    }

    var obj = {}

    _.forEach(str.split('&'), (part) => {
      let pair = part.replace(/\+/g, ' ').split('=');
      let value = pair[1]

      let key = this.splitKeyIfNeeded(pair[0])

      let pathString = ''

      for (let i = 0; i < key.length; i++) {

        if (_.isEmpty(key[i])) {
          let index = _.isArray(_.get(obj, pathString)) ? _.get(obj, pathString).length : 0

          _.set(obj, `${pathString}[${index}]`, value)
          continue;
        }

        let pathString = _.isEmpty(pathString) ? key[i] : `${pathString}.${key[i]}`

        if (_.has(obj, pathString) && !isFinite(key[i])) {
          continue;
        }

        _.set(obj, pathString, value)
      }
    })

    return obj
  },

  validateString(str) {
    if (typeof str !== 'string') {
      return false
    }

    return true
  },

  clearString(str) {
    return decodeURIComponent(str.trim().replace(/^[?#&]/, ''));
  },

  splitKeyIfNeeded(key) {
    return key.replace(/\]/g, '').split('[')
  }

}