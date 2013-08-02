var tap = require('tap');
var objectSearch = require('../index.js');

tap.test('make sure we can find nested properties', function(t){
  var find = objectSearch('one.two.three')
    , found = find({one: {two: {three: 'its so dark in here'}}});

  t.equal(found, 'its so dark in here', 'check the find result');
  t.end();
});

tap.test('make sure we can find non-nested properties', function(t){
  var find = objectSearch('findMe')
    , found = find({findMe: 'top shelf, baby'});

  t.equal(found, 'top shelf, baby', 'check the single property find result');
  t.end();
});

tap.test('make sure undefined is properly returned when a property isnt found', function(t){
  var find = objectSearch('inconsequential')
    , notFound = find({}) || find() || find(null) || find(undefined);

  t.equal(notFound, undefined, 'check that we got undefined');
  t.end();
});