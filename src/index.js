import parser from './parser'
import stringifyer from './stringifyer' 
import _ from 'lodash'

module.exports = {
  
  /**
   * Hold the query striwebng object
   * 
   * @var {object}
   */
  queryStringObject: {},

  /**
   * hold all the listeners
   * 
   * @var {array} 
   */
  listeners: [],

  /**
   * read the query string and pass is to the main object
   * 
   * @param {string} queryString 
   * @param {boolean} callListeners 
   */
  read(queryString = window.location.search, callListeners = true) {

    this.parse(queryString).callListeners()

    return this
  },

  /**
   * make use of the parser object to parse the query string
   * 
   * @param {string} queryString 
   */
  parse(queryString) {
    this.queryStringObject = parser.parse(queryString)

    return this
  },

  /**
   * stringfy 
   * 
   * @param {mixed} queryStringObj 
   */
  stringify(queryStringObj = null) {
    if (!queryStringObj) {
      queryStringObj = this.queryStringObject
    }

    return stringifyer.stringify(queryStringObj)
  },

  /**
   * Call all the listeners that provided
   */
  callListeners() {
    for (let i = 0; i < this.listeners.length; i++) {
      if (typeof this.listeners[i] === 'function') {
        this.listeners[i](this)
      }
    }
  },

  /**
   * get all or specific key
   * 
   * @param {mixed} key 
   */
  get(key = null) {
    if (!key) {
      return this.queryStringObject
    }


  }
  
}