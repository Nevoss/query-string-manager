import parser from '../src/parser'
import expect from 'expect'

describe('parser', () => {
  
  it('throw exception if the argument passed is not string', () => {
    expect(() => {
      parser.parse({})
    }).toThrow()

    expect(() => {
      parser.parse(1)
    }).toThrow()

    expect(() => {
      parser.parse([])
    }).toThrow()
  })

  it('clear all uneccesery sign after the actual query string and before', () => {
    let queryString = '?a=a&b=b&#'
    expect(parser.clearString(queryString)).toEqual('a=a&b=b')
  })

  it('parse a regular query string currectly', () => {
    let queryString = '?a=some&b=else&c=ok'
    expect(parser.parse(queryString)).toEqual({
      a: 'some', 
      b: 'else',
      c: 'ok'
    })
  })

  it('parse a value of only digits to number', () => {
    let queryString = '?a=1&b=22&c=2c'
    expect(parser.parse(queryString)).toEqual({
      a: 1,
      b: 22,
      c: '2c'
    })
  })

  it('parse empty value as empty string and without equals to null', () => {
    let queryString = '?a=&b'
    expect(parser.parse(queryString)).toEqual({
      a: '',
      b: null
    })
  })

  it('parse an array query string correctly', () => {
    let queryString = '?a[]=one&a[]=two&a[]=three&b[0]=one&b[1]=two'
    expect(parser.parse(queryString)).toEqual({
      a: ['one', 'two', 'three'],
      b: ['one', 'two']
    })
  })

  it('parse a complex object query string correctly', () => {
    let queryString = '?a[a]=one&a[b]=two&a[c]=three&b[aa][aaa]=one&b[aa][bbb]=two&b[bb][]=two&b[bb][]=three&b[3]=three&c=1&d=2'
    expect(parser.parse(queryString)).toEqual({
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