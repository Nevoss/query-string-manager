// import expect from 'expect'
import sinon from 'sinon'
import { expect } from 'chai'
import _ from 'lodash'
import queryStringManager from '../src'
import parser from '../src/parser'
import stringifyer from '../src/stringifyer'


describe('queryStringManager', () => {


  beforeEach(() => {
    queryStringManager.queryStringObject = {}
    queryStringManager.listeners = []
  })


  it('can parse query string with parser object', () => {
    let parseSpy = sinon.spy(parser, 'parse')
    let queryString = '?a=a&b=b'

    let valueReturend = queryStringManager.parse(queryString)

    expect(parser.parse.calledOnce).to.be.true
    expect(parser.parse.calledWith(queryString)).to.be.true
    expect(parser.parse.returned(valueReturend)).to.be.true

    parseSpy.restore()
  })


  it('can strigify queryStringObject with strigifyer object', () => {
    let strigifySpy = sinon.spy(stringifyer, 'stringify')
    
    queryStringManager.queryStringObject = {
      a: 'a',
      b: 'b'
    }

    let valueReturend = queryStringManager.stringify()

    expect(stringifyer.stringify.calledOnce).to.be.true
    expect(stringifyer.stringify.calledWith(queryStringManager.queryStringObject)).to.be.true
    expect(stringifyer.stringify.returned(valueReturend)).to.be.true

    strigifySpy.restore()
  })


  it('can strigify some object with strigifyer object', () => {
    let strigifySpy = sinon.spy(stringifyer, 'stringify')
    
    let someObj = {
      a: 'b',
      b: 'a'
    }

    let valueReturend = queryStringManager.stringify(someObj)

    expect(stringifyer.stringify.calledOnce).to.be.true
    expect(stringifyer.stringify.calledWith(someObj)).to.be.true
    expect(stringifyer.stringify.returned(valueReturend)).to.be.true

    strigifySpy.restore()
  })


  it('added callback function to the listeners array', () => {
    let spy = sinon.spy()
    queryStringManager.listen(spy)

    expect(queryStringManager.listeners).to.include(spy)
  })


  it('call all the listeners array if the item is function', () => {
    let spyOne = sinon.spy()
    let spyTwo = sinon.spy()

    queryStringManager.listeners = [
      spyOne,
      spyTwo,
      123,
      'asd'
    ]

    queryStringManager.callListeners()

    expect(spyOne.calledOnce).to.be.true
    expect(spyTwo.calledOnce).to.be.true
  })


  it('can set key and value to queryStringObject', () => {
    
    let setSpy = sinon.spy(_, 'set')
    
    queryStringManager.set('a.a', 'foo')

    expect(queryStringManager.queryStringObject).to.deep.equal({a: { a: 'foo' }})
    expect(_.set.calledOnce).to.be.true
    expect(_.set.calledWith(queryStringManager.queryStringObject, 'a.a', 'foo')).to.be.true

    setSpy.restore()
  })


  it('can set an object to queryStringObject', () => {
    queryStringManager.queryStringObject = {
      a: 2,
      b: 200
    }

    let setSpy = sinon.spy(_, 'merge')

    let assignObject = {
      b: 4
    }

    queryStringManager.set(assignObject)

    expect(queryStringManager.queryStringObject).to.deep.equal({a:2, b:4})
    expect(_.merge.calledOnce).to.deep.true
    expect(_.merge.calledWith(queryStringManager.queryStringObject, assignObject)).to.deep.true

    setSpy.restore()
  })


  it('can get all the queryStringObject', () => {
    queryStringManager.queryStringObject = {
      a: 2,
      b: 200
    }

    let returnedValue = queryStringManager.get()

    expect(returnedValue).to.deep.equal({a: 2, b: 200})
  })


  it('can get specific key frin queryStringObject', () => {

    queryStringManager.queryStringObject = {
      a: { a: 2 }
    }

    let getSpy = sinon.spy(_, 'get')

    let returnedValue = queryStringManager.get('a.a', 'default')

    expect(returnedValue).to.equal(2)
    expect(_.get.calledOnce).to.be.true
    expect(_.get.calledWith(queryStringManager.queryStringObject, 'a.a', 'default')).to.be.true
    expect(_.get.returned(returnedValue)).to.be.true

    getSpy.restore()
  })


  it('push the query string object to the url', () => {

    queryStringManager.queryStringObject = {
      a: 1
    }

    global.window = {
      history: {
        pushState(first, second, third) {
          return true
        }
      }
    }

    let callListenersSpy = sinon.spy(queryStringManager, 'callListeners')
    let pushStateSpy = sinon.spy(global.window.history, 'pushState')

    queryStringManager.pushToUrl()

    expect(global.window.history.pushState.calledOnce).to.be.true
    expect(global.window.history.pushState.calledWith(null, null, '?a=1')).to.be.true
    expect(queryStringManager.callListeners.calledOnce).to.be.true

    callListenersSpy.restore()
    pushStateSpy.restore()
  })


  it('set a key and push to url at the same method', () => {

    let pushToUrlStub = sinon.stub(queryStringManager, 'pushToUrl')
    let setSpy = sinon.spy(queryStringManager, 'set')

    queryStringManager.push('a.a', 'b')

    expect(queryStringManager.pushToUrl.calledOnce).to.be.true
    expect(queryStringManager.set.calledOnce).to.be.true
    expect(queryStringManager.set.calledWith('a.a', 'b')).to.be.true

    pushToUrlStub.restore()
    setSpy.restore()
  })


  it('can reset the queryStringObject and push to url if wanted', () => {
    
    let pushToUrlStub = sinon.stub(queryStringManager, 'pushToUrl')
    
    queryStringManager.queryStringObject = {
      a: 'a',
      b: {
        c: 'c'
      }
    }

    queryStringManager.reset(false)

    expect(queryStringManager.queryStringObject).to.deep.equal({})
    expect(queryStringManager.pushToUrl.notCalled).to.be.true

    queryStringManager.reset()

    expect(queryStringManager.pushToUrl.calledOnce).to.be.true

    pushToUrlStub.restore()
  })


  it('remove specific from queryStringObject and push to url if wanted', () => {

    let pushToUrlStub = sinon.stub(queryStringManager, 'pushToUrl')

    queryStringManager.queryStringObject = {
      a: 'a',
      b: {
        c: 'c'
      }
    }

    queryStringManager.remove('b.c', false)

    expect(queryStringManager.queryStringObject).to.deep.equal({ a: 'a', b: {} })
    expect(queryStringManager.pushToUrl.notCalled).to.be.true

    queryStringManager.remove('b')

    expect(queryStringManager.queryStringObject).to.deep.equal({ a: 'a' })
    expect(queryStringManager.pushToUrl.calledOnce).to.be.true

    pushToUrlStub.restore()
  })


  it('can read query string, parse it and call listeners if wanted', () => {
    let callListenersSpy = sinon.spy(queryStringManager, 'callListeners')
    let parseSpy = sinon.spy(queryStringManager, 'parse')

    queryStringManager.read('?a=1&b=2', false)

    expect(queryStringManager.parse.calledOnce).to.be.true
    expect(queryStringManager.parse.calledWith('?a=1&b=2')).to.be.true
    expect(queryStringManager.parse.returned(queryStringManager.queryStringObject)).to.be.true
    expect(queryStringManager.callListeners.notCalled).to.be.true

    queryStringManager.read('?a=1&b=2', true)

    expect(queryStringManager.parse.callCount).to.equal(2)
    expect(queryStringManager.callListeners.calledOnce).to.be.true

    callListenersSpy.restore()
    parseSpy.restore()
  })


  it('can read the query string from the window object', () => {
    let parseSpy = sinon.spy(queryStringManager, 'parse')

    global.window = {
      location: {
        search: '?a=b&b=c'
      }
    }

    queryStringManager.read()

    expect(queryStringManager.parse.calledOnce).to.be.true
    expect(queryStringManager.parse.calledWith('?a=b&b=c')).to.be.true
    expect(queryStringManager.parse.returned(queryStringManager.queryStringObject)).to.be.true

    parseSpy.restore()
  })
})