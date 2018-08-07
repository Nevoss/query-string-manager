# query-string-manager
[![npm version](https://badge.fury.io/js/query-string-manager.svg)](https://badge.fury.io/js/query-string-manager)
[![Build Status](https://travis-ci.org/Nevoss/query-string-manager.svg?branch=master)](https://travis-ci.org/Nevoss/query-string-manager)
> manage the state of URL [query string](https://en.wikipedia.org/wiki/Query_string) in an elegant way

This package was writen becuase I did`t find a package, that was parsed a query-string like I want it to be parsed (complex objects and array), and in the same time to manage the current state of the query-string, and have the option to listen to any changes that happend in query-string from another places in my code.

hope you will enjoy it 😎


## Installation
```
$  npm install query-string-manager --save
```
## Usage

```js
// ES6 style
// current query-string = form[a]=a&form[b]=b&c=c

import queryStringManager from 'query-string-manager'

queryStringManager.listen((qs) => {
    console.log('listener called!')
})

// The method will read the current query string
queryStringManager.read()
//=> 'listener called!''

queryStringManager.get()
//=> {form: {a: 'a', b: 'b'}, c: 'c' }

queryStringManager.push('d', 'd')
//=> 'listener called!'
// and the current query string will be updated without refresh

queryStringManager.get()
//=> {form: {a: 'a', b: 'b'}, c: 'c', d: 'd'}
```

## API
**.read([string|null], [callListeners = true])**    

if the first argument is null the method will take `location.search` as first argument. the second argument is a boolean that by default call all the listeners that provide.
The method returns `this`

```js
queryStrinManager.read('?foo=bar&fi[a]=bar')
// will read the provided string and call all the listeners

queryStringManager.read(null, false)
// will read from location.search with out call all of the listeners
```

**.get([key = null], [defaultVal = null])**

when not providing and arguments its just return all the query-string parsed object
```js
// ?foo=bar&form[a]=fifi

queryStringManager.get()
//=> { foo: 'bar', form: {a: 'fifi'} }
```
when providing an arguments its act just like the [lodash get method](https://lodash.com/docs/4.17.4#get)
```js
// ?foo=bar&form[a]=fifi

queryStringManager.get('form.a')
//=> 'fifi'

queryStringManager.get('form.b', 'default')
//=> 'default'
```

**.set( string|object, [val = null] )**

when the first argument is an regular string its act just like the [lodash set method](https://lodash.com/docs/4.17.4#set)
```js
queryStringManager.set('form.a', 'someValue').get()
//=> { form: {a: 'someValue'} }
```
when prviding an object the object will be merge to the main query-strign object.
```js 
// current queryStringManager Object { a: 'foo', foo: 'bar' }

queryStringManager.set({
    a: 'a'
    b: {
        foo: 'bar'
    }
}).get()
//=> {a: 'a', b: { foo: 'bar' }, foo: 'bar'}
```

**.pushToUrl()**

just like it`s sound replace the current query-string with the queryStringManager state. and call all the listeners
```js
// url query-string = ?a=b

queryString.read()
queryStringManager.set({foo: 'bar'}).pushToUrl()

// url query-string = ?a=b&foo=bar
```

**.push( string|object, [val = null] )**

act just like `.set()` but also call `pushToUrl()` after the value was seted

**.listen( callback )**

add an callback function to the listeners array. when `pushToUrl()`, `push()` or `read()` are called. all the listeners that provied will be call.
```js
queryStringManager.listen(() => {
    console.log('first call')
})

queryStringManager.listen((qs) => {
    console.log('a value is ' + qs.get('a'))
})

queryStringManager.push('a', 'foo')
//=> 'first call'
//=> 'a value is foo'
```

**.parse( string )**

just like it sound - parse the query-string and returns an object

**.stringify( [queryStringObj] )**

if nothing or `null` is passed to the argument this will stringifiy the current state of the object.

if passed an object it will return the query-string of the object that was passed

**reset( [push = true] )**

clear all the state object. and has the option to `pushToUrl()`

**remove( string, [ push = true ] )**

work just like [lodash unset method](https://lodash.com/docs/4.17.4#unset) works.
and has the option to `pushToUrl()`

## Contribute
So... it will be nice to have some help 💗

1. Tests, tests and more tests 
2. better documentation (my english is not perfect)
2. anything else that you think can be nice for this project

## Build With

Thank you [lodash](https://lodash.com)

## License

MIT © Nevo Golan - <nevos12@gmail.com>
