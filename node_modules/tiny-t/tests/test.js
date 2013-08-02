var assert = require('assert')
  , tinyT = require('../index.js')
  , testCount = 0;

var template = tinyT('hey {{ broSynonym }} are you {{ verb }} about surfing?');
testCount++;
assert.equal(
    template({broSynonym: 'bra', verb: 'stoked'})
  , 'hey bra are you stoked about surfing?'
  , 'Basic template test to ensure it can parse correctly'
);


template = tinyT('hey {{ broSynonym }} are you {{ verb }} about surfing? Im {{verb}}');
testCount++;
assert.equal(
    template({broSynonym: 'bra', verb: 'stoked'})
  , 'hey bra are you stoked about surfing? Im stoked'
  , 'Make sure multiple, duplicate keys are parsed correctly'
);

console.log('--------------------------------');
console.log(testCount + ' tests completed successfully');
console.log('--------------------------------');
