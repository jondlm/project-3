// Note, this module is not functional

var tinyT = require('tiny-t')
  , objectDive = require('object-dive');


module.exports = function(map){
 return function(inputStr) {
  return function(inputObj) {

    // var parser = new Parser(map, input);

    // Do you matching here, not in the parse function
    // If we got a new map, then let's use it for this parse round
    matched = inputStr.match(/{%\s*([\w\d\s\-\.]*)\s*%}/); // 

    if (matched) {
      tag = matched[1].split(' ')[0]; // grab the first word in the match, like "for"
    }
    if (tag && map[tag]) {
      map[tag](this, matched[1]);
    }
    if (!matched){ // not sure about this..
      // TODO: pipe into tinyT
      return contents;

    return renderedString; // final output
  };
 };
};


/*******************************
             PARSER
*******************************/
function Parser(topMap, topTemplateString){
  if (!(this instanceof Parser)){ // make the constructor "new" agnostic
    return new Parser(topMap, topTemplateString);
  }

  this.topMap = topMap; // I may not need to retain the original map and template string
  this.topTemplateString = topTemplateString;

  return this;
}

Parser.prototype.parse = function(map, contents){ //
  var matched
    , tag;


};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  };
};
