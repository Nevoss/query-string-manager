import stringifyer from '../src/stringifyer'
import expect from 'expect'

describe('stringifyer', () => {
  
  it('throw an error if the main argument is not an object', () => {
    expect(() => {
      stringifyer.stringify('string')
    }).toThrow()

    expect(() => {
      stringifyer.stringify(1)
    }).toThrow()

    expect(() => {
      stringifyer.stringify(true)
    }).toThrow()
  })

  it ('stringify basic query string objects', () => {
    let queryStringObj = {
      a: 'a',
      b: 'b',
      c: 3
    }
    
    expect(stringifyer.stringify(queryStringObj)).toEqual(
      'a=a&b=b&c=3'
    )
  })

  it('handle null and empty string correctly', () => {
    let queryStringObj = {
      a: null,
      b: '',
      c: 2,
    }
    
    expect(stringifyer.stringify(queryStringObj)).toEqual(
      'a&b=&c=2'
    )
  })

  it('stringify an array correctly', () => {
    let queryStringObj = {
      a: [ 'a', 'b', 'c' ]
    }

    expect(stringifyer.stringify(queryStringObj)).toEqual('a[0]=a&a[1]=b&a[2]=c')
  })

  it('stringify a complex object correctly', () => {
    let queryStringObj = {
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
        bb: ['two', 'three'],
        '3': 'three'
      },
      c: 1,
      d: 2
    }

    expect(stringifyer.stringify(queryStringObj)).toEqual(
      'a[a]=one&a[b]=two&a[c]=three&b[3]=three&b[aa][aaa]=one&b[aa][bbb]=two&b[bb][0]=two&b[bb][1]=three&c=1&d=2'
    )
  })

})