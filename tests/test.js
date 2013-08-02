// TODO: tests here

var tap = require('tap')
  , language = require('../index.js')
  , if_tag = require('../tags/if.js')
  , for_tag = require('../tags/for.js')
  , compile
  , template;

compile = language({
    'if' : if_tag
  , 'for' : for_tag
});

var input =
  "<ul>"
+ "\n{% for item in items %}"
+ "\n    <li>{% if item.okay %}it's okay{% else %}it's not okay{% endif %}</li>"
+ "\n{% endfor %}"
+ "\n</ul>"
+ "\n{{ message }}";

template = compile(input);

template({
    items : [{okay: true}, {okay: false}]
  , message: "hello world"
}) // should render the above template