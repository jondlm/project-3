var tinyT = require('tiny-t')
  , objectDive = require('object-dive');


module.exports = function(map){
 return function(tStr) {
  return function(obj) {
    var parser = new Parser(map, tStr);

    parser.parse(map, tStr);

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
function Parser(topMap, topTemplateString){
  if (!(this instanceof Parser)){ // make the constructor "new" agnostic
    return new Parser(topMap, topTemplateString);
  }

  this.topMap = topMap; // I may not need to retain the original map and template string
  this.topTemplateString = topTemplateString;

  return this;
}
/*  parser.parse({
        'endfor': endfor
      , 'empty': empty
    })   */
Parser.prototype.parse = function(map, contents){
  var matched
    , tag;
    
  // If we got a new map, then let's use it for this parse round
  matched = contents.match(/{%\s*([\w\d\s\-\.]*)\s*%}/);

  if (matched) {
    tag = matched[1].split(' ')[0]; // grab the first word in the match, like "for"
  }
  if (tag && map[tag]) {
    debugger;
    map[tag](this, matched[1]);
  }
  if (!matched){
    // TODO: pipe into tinyT
    return contents;
  }

};

Parser.prototype.lookup = function(str){
  return function(obj){
    var t = objectDive(str);
    return t(obj); 
  }
};
