// TODO: tests here

var tap = require('tap')
  , language = require('../index.js')
  , if_tag = require('../tags/if.js')
  , for_tag = require('../tags/for.js')
  , compile
  , template
  , input;

compile = language({
    'if' : if_tag
  , 'for' : for_tag
});


template = compile(input);

var r = template({
    items : [{okay: true}, {okay: false}]
  , message: "hello world"
}); // should render the above template

tap.test('check the for loop', function(t){
  input = "{% for item in items %}{% item.name %}{% endfor %}";
  template = compile(input);
  obj = {
    items: [{name: 'jon'}, {name: 'jon'}]
  };

  t.equal(template(obj), 'jonjon', 'ensure we compiled correctly');
  t.end();
});