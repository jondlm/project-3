// Note, this module is not functional
'use strict';

var tinyT = require('tiny-t')
  , objectDive = require('object-dive')
  , parser;


module.exports = function(tags){
  return function(inputStr) {
    return function(inputObj) {
      var parser = new Parser(tags, str)
      return parser.start();
    };
  };
};


/*******************************
             PARSER
*******************************/
// Parser constructor
function Parser(tags, userInput){
  if (!(this instanceof Parser)) { // make the constructor "new" agnostic
    return new Parser(tags, userInput);
  }

  this.regex = /{%\s*([\w\d\s\-\.]*)\s*%}/;
  this.userInput = userInput.replace(/\n/gm, ''); // remove new lines
  this.tags = tags;
  this.output = [];
  this.at = 0; // starting point

  return this;
}

// Kick-off the parsing
Parser.prototype.start = function() {
  var r = this.regex
    , s = this.userInput
    , t = this.tags
    , o = [];

  while (r.exec(s.slice(this.at))){
    var match = r.exec(s.slice(this.at));
    var tag = undefined;

    if (match) {
      tag = match[1].split(' ')[0]; // "for"
      this.at = this.at + match[0].length; // advance `at` counter
    }
    if (tag && t[tag]) {
      var result = t[tag](this, match[1]);
      o.push(result);
    }
    if (!match) {
      return s.slice(this.at); // NOT SURE
    }
  }
  return o;
}

Parser.prototype.parse = function(obj){ //
  
};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  };
};
