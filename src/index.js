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
   * @param {string|null} queryString 
   * @param {boolean} callListeners 
   */
  read(queryString = null, callListeners = true) {

    if (queryString === null) {
      queryString = window.location.search
    }

    this.queryStringObject = this.parse(queryString)

    if (callListeners) {
      this.callListeners()
    }

    return this
  },

  /**
   * make use of the parser object to parse the query string
   * 
   * @param {string} queryString 
   */
  parse(queryString) {
    return parser.parse(queryString)
  },

  /**
   * stringfy 
   * 
   * @param {object|null} queryStringObj 
   */
  stringify(queryStringObj = null) {
    if (!queryStringObj) {
      queryStringObj = this.queryStringObject
    }

    return stringifyer.stringify(queryStringObj)
  },

  /**
   * add funcions to listeners
   * 
   * @param {function} callback 
   */
  listen(callback) {
    this.listeners.push(callback)

    return this
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

    return this
  },

  /**
   * set method ob queryStringObject
   * 
   * @param {string|object} key 
   * @param {mixed} val 
   */
  set(key, val = null) {
    if (typeof key === 'object') {
      this.queryStringObject = _.merge(this.queryStringObject, key)

      return this
    }

    _.set(this.queryStringObject, key, val)

    return this
  },

  /**
   * get all or specific key on queryStringObject
   * 
   * @param {string|null} key 
   * @param {mixed} defaultVal
   */
  get(key = null, defaultVal = null) {
    if (!key) {
      return this.queryStringObject
    }
    
    return _.get(this.queryStringObject, key, defaultVal)
  },
  
  /**
   * set the current state of queryStringObject in the url 
   * with out refresh!
   * 
   */
  pushToUrl() {
    if (typeof history !== 'undefined') {
      history.pushState(null, null, '?' + this.stringify())
    }

    this.callListeners()

    return this
  },

  /**
   * set and item or object and push to url
   * 
   * @param {mixed} key 
   * @param {mixed} val 
   */
  push(key, val = null) {
    this.set(key, val)
    this.pushToUrl()

    return this
  },

  /**
   * reset queryStringObject and push to the url if wanted
   * 
   * @param {boolean} push 
   */
  reset(push = true) {
    this.queryStringObject = {}

    if (push) {
      this.pushToUrl()
    }

    return this
  },

  /**
   * remove a specific key in queryStringObject
   * 
   * @param {mixed} key 
   */
  remove(key, push = true) {
    _.unset(this.queryStringObject, key)

    if (push) {
      this.pushToUrl()
    }

    return this
  },
}