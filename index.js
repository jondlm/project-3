// Note, this module is not functional

var tinyT = require('tiny-t')
  , objectDive = require('object-dive');


module.exports = function(tags){

  var parser = new Parser(tags);

  return function(inputStr) {
    return function(inputObj) {
      var arr = [] // arr[i].
        , listOfFunction = []
        , allMatches
        , r = /{%\s*([\w\d\s\-\.]*)\s*%}/
        , inStr = inputStr.replace(/\n/gm, ''); // strip out new lines

      while (r.exec(inStr)){
        var m = r.exec(inStr);
        arr.push(m);
        inStr = m.input.slice(m.index + m[0].length);
      }

      for (var i = arr.length - 1; i >= 0; i--) {
        var match = arr[i];

        if (match) {
          tag = match[1].split(' ')[0];
          debugger;
        }
        if (tag && tags[tag]) {
          var temp = tags[tag](parser, match[1]);
          listOfFunction.push(temp);
        }

      }
      debugger;

      // when all is said and done with the parser, 
      return 'final output?'; // final output
    };
  };
};


/*******************************
             PARSER
*******************************/
// Parser constructor
function Parser(tags){
  if (!(this instanceof Parser)) { // make the constructor "new" agnostic
    return new Parser(tags);
  }

  this.tags = tags;

  return this;
}

Parser.prototype.parse = function(obj){ //
  var tokens = Object.keys(obj);

  // add the new tokens to our mapping 
  tokens.forEach(function(i){

  });

};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  };
};
