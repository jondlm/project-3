# object-dive

object-dive is a tiny module that searches an object for a specified property. If the property is found, its value is returned, otherwise it returns `undefined`.

## Installation

Run `npm install object-dive` to install.

## Basic usage

```javascript
var objectSearch = require('object-dive')
  , pattern = objectSearch('levelOne.levelTwo')
  , obj = {
      levelOne : {
        levelTwo: 'You found me... Have some cake, the cake is a lie'
      }
    };

console.log(pattern(obj)); // -> 'You found me... Have some cake, the cake is a lie'
```

## Tests

To run the tests you must `npm install tap`. Run the tests with `npm test`.

## License
MIT