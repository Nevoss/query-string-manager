import parser from '../src/parser'
import { expect } from 'chai'

describe('parser', () => {
  
  it('throw exception if the argument passed is not string', () => {
    expect(() => {
      parser.parse({})
    }).to.throw()

    expect(() => {
      parser.parse(1)
    }).to.throw()

    expect(() => {
      parser.parse([])
    }).to.throw()
  })

  it('clear all uneccesery sign after the actual query string and before', () => {
    let queryString = '?a=a&b=b&#'
    expect(parser.clearString(queryString)).to.equals('a=a&b=b')
  })

  it('parse a regular query string currectly', () => {
    let queryString = '?a=some&b=else&c=ok'
    expect(parser.parse(queryString)).to.deep.equals({
      a: 'some', 
      b: 'else',
      c: 'ok'
    })
  })

  it('parse a value of only digits to number', () => {
    let queryString = '?a=1&b=22&c=2c'
    expect(parser.parse(queryString)).to.deep.equals({
      a: 1,
      b: 22,
      c: '2c'
    })
  })

  it('parse empty value as empty string and without equals to null', () => {
    let queryString = '?a=&b'
    expect(parser.parse(queryString)).to.deep.equals({
      a: '',
      b: null
    })
  })

  it('parse an array query string correctly', () => {
    let queryString = '?a[]=one&a[]=two&a[]=three&b[0]=one&b[1]=two'
    expect(parser.parse(queryString)).to.deep.equals({
      a: ['one', 'two', 'three'],
      b: ['one', 'two']
    })
  })

  it('parse a complex object query string correctly', () => {
    let queryString = '?a[a]=one&a[b]=two&a[c]=three&b[aa][aaa]=one&b[aa][bbb]=two&b[bb][]=two&b[bb][]=three&b[3]=three&c=1&d=2'
    expect(parser.parse(queryString)).to.deep.equals({
      a: {
        a: 'one', 
        b: 'two',
        c: 'three'
      },
      b: {
        aa: {
          aaa: 'one',
          bbb: 'two'
        },
        bb: [ 'two', 'three' ],
        '3': 'three'
      },
      c: 1,
      d: 2
    })
  })

})