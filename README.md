# console-class

> Get yourself a light, togglable, namespaced and colored `console.log` in the browser.

Perfect for libraries, you can export the new `console` object and instruct the users to enable and disable it at will. Example at the bottom.

## Install 
```sh
npm i --save console-class
```

## Usage

```js
import Console from 'console-class';
const console = new Console('AJAX');

console.log('Loading');
// -> [AJAX] Loading
```

### Toggle all logging of instance

```js
const console = new Console('AJAX').off();
console.info('This will not appear');
console.on();
console.info('This will appear');
```

### Custom color or style

```js
const console = new Console('AJAX', {
    color: '#4feb88'
}).off();
```


```js
const console = new Console('AJAX', {
    style: 'border: 10px solid %color%',
    color: '#4feb88' // only used if `%color%` appears somewhere in the style
}).off();
```

### Methods supported

```js
console.log('Something happened');
console.info('Something is happening');
console.warn('Something bad happened');
console.error('Something really bad happened');
console.trace('Something happened here');
```

But more (that are already supported by the browser) can be added this way, but keep in mind that they might break.

```js
const console = new Console('AJAX', {
    methods: ['table'] //methods in this array will be added to the above
    // "table" likely won't work
}).off();
```

If you need to use other incompatible methods, either call them directly on the global console:

```js
window.console.table(arrayOfSomething)
```

Or just don't override the load console variable:

```js
import Console from 'console-class';
const c = new Console('AJAX');

c.log('Loading');
// -> [AJAX] Loading
console.table(arrayOfSomething);
// -> | table | of | data |
```

## Usage example for redistributable libraries

```js
// my-lib.js
import Console from 'console-class';
const console = new Console('My Lib').off(); // start disabled

function doSomething () { console.log('Hello World!'); }
doSomething.logging = console;
export default doSomething;
```

```js
// usage.js
import myLib from 'my-lib';

myLib();
// no logging

myLib.logging.on();
myLib();
// [My Lib] Hello World!
```

## Toggle multiple sub-consoles

If you depend on a library that itself exports a `console` with `.on()` and `.off()`, declare that in your Console definition so that library's `console` will be toggled together with yours:

```js
// my-lib.js
import someLibrary from 'some-library';
import Console from 'console-class';
const console = new Console('My Lib', {
    sub: [
        someLibrary.logging
    ]
}).off(); // start disabled and disable all the ones in `sub` too
```
