

// getting called with (parser, 'for item in items ')

// template({
//     items : [{okay: true}, {okay: false}]
//   , message: "hello world"
// })

// an example for tag
module.exports = function(parser, contents) {
  var bits = contents.split(/\s+/)  // ["for", "item", "in", "items"]
    , contextTarget = bits[1] // "item"
    , lookupContextVariable = parser.lookup(bits[3]) // call parser.lookup("items") // it will get back a function that takes an obj
    , forBody // undefined
    , emptyBody // undefined

  parser.parse({ // call the parse function with an object, hmm...
      'endfor': endfor
    , 'empty': empty
  })

  return function(context) {
    var target = lookupContextVariable(context) // Will lookup some property on the template object input, based on the unknown context (at this point)
      , output = []
      , loopContext

    if(!target || !target.length) {
      return emptyBody ? emptyBody(context) : '' // "items" property wasn't found, do something
    }
    // "items" property was found, loop through the array and do something

    // [{okay: true}, {okay: false}]

    for(var i = 0, len = target.length; i < len; ++i) {
      loopContext = Object.create(context) // by using Object.create, it will create a new object and inherit the prototype of the "context" object
      loopContext[contextTarget] = target[i]  // set 
      loopContext.forloop = {
          parent: loopContext.forloop
        , index: i
        , isfirst: i === 0
        , islast: i === len - 1
        , length: len
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