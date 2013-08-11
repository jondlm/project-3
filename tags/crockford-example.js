for (var i = 0; i < 100; i++){
  var say = '';
  if(i % 3 === 0){
    say += 'fizz';
  } 
  if(i % 5 === 0){
    say += 'fuzz';
  }
  if(say === ''){
    console.log(i);
  }else {
    console.log(say);
  }
}