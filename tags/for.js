/* jslint asi:true */

// getting called with (parser, 'for item in items ')

// If we've got here, we know we have a for loop on our hands
module.exports = function(parser, contents) {
  var bits = contents.split(/\s+/)                   // ["for", "item", "in", "items"]
    , contextTarget = bits[1]                        // "item"
    , lookupContextVariable = parser.lookup(bits[3]) // call parser.lookup("items") // it will get back a function that takes an obj
    , forBody                                        // undefined
    , emptyBody;                                     // undefined
    debugger;

  parser.parse({ // immediately call the parse function with an object, hmm...
      'endfor': endfor
    , 'empty': empty
  });

  function endfor(tpl) {
    if(forBody) {
      emptyBody = tpl
    } else {
      forBody = tpl
    }
  }

  function empty(tpl) { // tpl must be a function sometimes
    forBody = tpl
    parser.parse({'endfor': endfor})
  }

  // Doesn't get called until after we have our "list of functions"
  return function(context) { // `context` must be the object that the user supplied with the values we are supposed to lookup
    // `context` should be the object that contains the items for us to look up
    var target = lookupContextVariable(context) // Lookup the "items" property on the context object
      , output = []
      , loopContext;

    if(!target || !target.length) {
      return emptyBody ? emptyBody(context) : ''; // if `emptyBody` exists, return a call with `context`, else return ''
    }

    // "items" property was found, loop through the array and do something

    // target === [{okay: true}, {okay: false}]

    for(var i = 0, len = target.length; i < len; ++i) {
      loopContext = Object.create(context)    // clone `context` into `loopContext`
      loopContext[contextTarget] = target[i]  // set loopContext["item"] = true, the second time to false
      loopContext.forloop = {
          parent: loopContext.forloop
        , index: i              // 0
        , isfirst: i === 0      // true
        , islast: i === len - 1 // false
        , length: len           // 2
      }
      output.push(forBody(loopContext))
      /**
       * loopContext = {
       *   item: true,
       *   parent: {},
       *   index: 0,
       *   isfirst: true,
       *   islast: false,
       *   length: 2
       * 
       * }
       */
    }

    return output.join('')
  }

}