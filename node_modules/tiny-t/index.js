module.exports = template;

// Main function that accepts a string with {{ }} sections in it that will later be replaced
function template(templateString){
  var matches = templateString.match(/\{\{\s*\w+\s*\}\}/g);

  function transform(obj){
    return traverseAndReplace(templateString, matches, obj);
  }

  return transform;
}

/****************************************
                 HELPERS
****************************************/

// While this recursive function works, it could be optimized as it 
// runs more times than is technically necessary.
function traverseAndReplace(str, arr, obj) {
  var len = arr.length
    , rendered = str;

  function tryNext(i) {
    if (i >= len)
      return rendered;

    var key = arr[i].match(/\w+/);

    if (key && obj[key]) {
      rendered = rendered.replace(arr[i], obj[key]);
      return tryNext(i+1);
    }
  }

  return tryNext(0);
}
