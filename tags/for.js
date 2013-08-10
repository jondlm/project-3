/* jslint asi:true */

// getting called with (parser, 'for item in items ')

// If we've got here, we know we have a for loop on our hands
module.exports = function(parser, contents) {
  var bits = contents.split(/\s+/)                   // ["for", "item", "in", "items"]
    , contextTarget = bits[1]                        // "item"
    , lookupContextVariable = parser.lookup(bits[3]) // call parser.lookup("items") // it will get back a function that takes an obj
    , forBody                                        // undefined
    , emptyBody;                                     // undefined

  parser.parse({ // immediately call the parse function with an object, hmm...
      'endfor': endfor // a function that takes a "string"?
    , 'empty': empty   // a function that takes a "string", it sets the forBody and calls parser.parse({'endfor': endfor})
  });

  // Doesn't get called until later
  return function(context) { // "context" is supposed to be an object
    // `context` should be the object that contains the items for us to look up
    var target = lookupContextVariable(context) // Lookup the "items" property on the context object
      , output = []
      , loopContext;

    if(!target || !target.length) {
      return emptyBody ? emptyBody(context) : ''; // "items" property wasn't found, do something
    }

    // "items" property was found, loop through the array and do something

    // [{okay: true}, {okay: false}]

    for(var i = 0, len = target.length; i < len; ++i) {
      // First thing we do is inherit all of the tree that came before us.
      loopContext = Object.create(context)    // keep all the old properties foud on context
      loopContext[contextTarget] = target[i]  // set loopContext["item"] = true, the second time to false
      loopContext.forloop = {
          parent: loopContext.forloop
        , index: i              // 0
        , isfirst: i === 0      // true
        , islast: i === len - 1 // false
        , length: len           // 2
      }
      output.push(forBody(loopContext))
    }

    return output.join('')
  }

  function empty(tpl) {
    forBody = tpl
    parser.parse({'endfor': endfor})
  }

  function endfor(tpl) {
    if(forBody) {
      emptyBody = tpl
    } else {
      forBody = tpl
    }
  }
}