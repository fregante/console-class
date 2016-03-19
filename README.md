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
const console = new Console('AJAX', false); //FALSE means start disabled
console.info('This will not appear');
console.on();
console.info('This will appear');
console.off();
console.info('This will not appear');
```

### Custom color or style

```js
console.color = '#4feb88';
```


```js
console.style = 'border: 10px solid %color%';
console.color = '#4feb88'; // only usage if `%color%` appears somewhere in the style
```

### Methods supported

```js
console.log('Something happened');
console.info('Something is happening');
console.warn('Something bad happened');
console.error('Something really bad happened');
```

But more (that are already supported by the browser) can be added this way, but keep in mind that they might break.

```js
console.addMethod('table'); //this likely won't work
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
const console = new Console('My Lib', false); // start disabled
export { console as logging };

export default function () {
    // do something
    console.log('Hello World!');
}

```

```js
// usage.js
import myLib = 'my-lib';

myLib();
// no logging

myLib.logging.on();
myLib();
// [My Lib] Hello World!
```









