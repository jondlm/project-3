// TODO: tests here

var tap = require('tap')
  , language = require('../index.js')
  , if_tag = require('../tags/if.js')
  , for_tag = require('../tags/for.js')
  , compile = language({
    'if' : if_tag
  , 'for' : for_tag
});



tap.test('test the supplied example', function(t){
  var input = ""
    , template = compile(input)
    , obj = {
        items : [{okay: true}, {okay: false}]
      , message: "hello world"
      }
    , result = template(obj);

  t.equal(result, '', 'full functionality test');
  t.end();
});

tap.test('check only the for loop', function(t){
  var input = "{% for item in items %}{% item.name %}{% endfor %}"
    , template = compile(input)
    , obj = {
        items: [{name: 'jon'}, {name: 'jon'}]
      }
    , result = template(obj);

  t.equal(result, 'jonjon', 'basic for loop test');
  t.end();
});

tap.test('check only the handlebar template', function(t){
  var input = "here is {{ name }}"
    , template = compile(input)
    , obj = {
        name: 'frank'
      }
    , result = template(obj);

  t.equal(result, 'here is frank', 'basic handlebar test');
  t.end();
});