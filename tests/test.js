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

template = compile("template string");

template({
    items : [{okay: true}, {okay: false}]
  , message: "hello world"
}) // should render the above template