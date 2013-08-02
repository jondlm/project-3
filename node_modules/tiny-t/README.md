# Tiny-t

**Not intended for production use**

Tiny-t is a very small module that accepts a string like `hello {{ name }}, what are you up to {{ day }}?` and returns a function that takes an object that will map to the properties in the template string. 

## Example

```javascript
var template = require('tiny-t')('hey {{ name }}');

console.log(template({name : 'jon'}));
```