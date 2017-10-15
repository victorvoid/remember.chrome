# remember.chrome
[![NPM version][npm-image]][npm-url]

A chrome alarm manager to schedule code to run periodically or at a specified time in the future. </p>

## Getting started

### Install remember.chrome with npm:

```sh
$ npm install remember.chrome
```

### Initialize your alarm:

#### Parameters: 

`Remember({ string name, Number periodInMinutes, Number delayInMinutes, Boolean debug })`

```js
import Remember from 'remember.chrome'

const alarm = Remember({
  name: 'hello', 
  periodInMinutes: 1
})
.create()

setTimeout(() => {
  alarm.stop()
}, 300000)

//When it is 5 minutes, it stops running an alert
```

### Background being remembered

```js

import Remember from 'remember.chrome'

Remember()
.listener()
.then(alarm => {
  // you will enter here, each minute that you configured
  console.log(alarm) // hello
})
```

### You can activate the debugger

```js
import Remember from 'remember.chrome'

const alarm = Remember({ 
  name: 'hello',
  periodInMinutes: 2, 
  delayInMinutes: 1, 
  debug: true 
})
.create()

//log:
[Remember] created,
           name: hello,
           period in minutes: 2,
           delay in minutes: 1


setTimeout(() => {
  alarm.stop() //log: [Remember] hello stopped
}, 300000)

```

License
-------

The code is available under the [MIT License](LICENSE.md).


[npm-image]: https://badge.fury.io/js/remember.chrome.svg
[npm-url]: https://npmjs.org/package/remember.chrome
