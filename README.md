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

`new Remember(string name, Number period, Number delay)`

```js
import Remember from 'remember.chrome'

const remember = new Remember('hello', 1)

remember.create()

setTimeout(() => {
  remember.cancel()
}, 300000)

//When it is 5 minutes, it stops running an alert
```

### Background being remembered

```js

import Remember from 'remember.chrome'

Remember
.listener()
.then((alarm) => {
  console.log(alarm) // hello
})
```


License
-------

The code is available under the [MIT License](LICENSE.md).


[npm-image]: https://badge.fury.io/js/remember.chrome.svg
[npm-url]: https://npmjs.org/package/remember.chrome
