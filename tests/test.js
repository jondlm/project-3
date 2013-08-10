// TODO: tests here

var tap = require('tap')
  , language = require('../index.js')
  , if_tag = require('../tags/if.js')
  , for_tag = require('../tags/for.js')
  , compile = language({
    'if' : if_tag
  , 'for' : for_tag
});


// just do this one test for now
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

/* Should be functional

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

tap.test('test the supplied example', function(t){
  var input = '<ul> {% for item in items %} <li>{% if item.okay %}its okay{% else %}its not okay{% endif %}</li> {% endfor %} </ul>{{ message }}'
    , expected = '<ul>  <li>its okay</li> <li>its not okay</li> </ul>hello world'
    , template = compile(input)
    , obj = {
        items : [{okay: true}, {okay: false}]
      , message: "hello world"
      }
    , result = template(obj);

  t.equal(result, expected, 'full functionality test');
  t.end();
});
*/
