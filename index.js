var tinyT = require('tiny-t')
  , objectDive = require('object-dive');


module.exports = function(tagMapper){
 return function(tStr) {
  return function(obj) {
    var parser = new Parser(tagMapper)
      , matched
      , tag;

    matched = tStr.match(/{%\s*([\w\d\s\-\.]*)\s*%}/);

    if (matched) {
      tag = matched.split(' ')[0];
    }
    debugger;
    if (tag && tagMapper[tag]) {

    }

    // match tags with: /{%\s*([\w\d\s\-\.]*)\s*%}/
    
    // see if there's a tag parser function defined by the first word in match[1]
    
    // call that tag parser function with itself and match[1]

    return renderedString; // final output
  }
 }
};


/*******************************
             PARSER
*******************************/
function Parser(tagMapper){
  if (!(this instanceof Parser)){ // make the constructor "new" agnostic
    return new Parser(tagMapper);
  }
  this.tagMap = tagMapper;
}

Parser.prototype.parse = function(obj){


};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  }
};
