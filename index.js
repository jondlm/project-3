// Note, this module is not functional
'use strict';

var tinyT = require('tiny-t')
  , objectDive = require('object-dive')
  , parser;


module.exports = function(tags){
  return function(inputStr) {
    return function(inputObj) {
      var regex = /{%\s*([\w\d\s\-\.]*)\s*%}/
        , str = inputStr.replace(/\n/gm, '') // strip out new lines
        , parser = new Parser(tags, str)
        , match = regex.exec(inputStr)
        , tag;

        console.log(parser.parse(tags)(inputObj));

      // var arr = [] // arr[i].
      //   , listOfFunction = []
      //   , allMatches
      //   , r = /{%\s*([\w\d\s\-\.]*)\s*%}/
      //   , inStr = inputStr.replace(/\n/gm, ''); // strip out new lines

      // while (r.exec(inStr)){
      //   var m = r.exec(inStr);
      //   arr.push(m);
      //   inStr = m.input.slice(m.index + m[0].length);
      // }

      // for (var i = arr.length - 1; i >= 0; i--) {
      //   var match = arr[i];

      //   if (match) {
      //     tag = match[1].split(' ')[0];
      //     debugger;
      //   }
      //   if (tag && tags[tag]) {
      //     var temp = tags[tag](parser, match[1]);
      //     listOfFunction.push(temp);
      //   }

      // }
      // debugger;

      // when all is said and done with the parser, 
      return 'final output?'; // final output
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
  this.userInput = userInput;
  this.tags = tags;
  this.output = [];
  this.at = 0; // starting point

  return this;
}

Parser.prototype.parse = function(obj){ //
  var match = this.regex.exec(this.userInput.slice(this.at))
    , tag;

  // when i'm passed on `obj` I need to regex for one of those matches...

  if (match) {
    tag = match[1].split(' ')[0]; // "for"
    this.at = this.at + match[0].length; // move position past current token
  }
  if (tag && this.tags[tag]) {
    var whatIsThis = this.tags[tag](this, match[1]);
    return whatIsThis;
  } else if (tag && obj[tag]) {
    obj[tag](this, match[1]);
  }
};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  };
};
