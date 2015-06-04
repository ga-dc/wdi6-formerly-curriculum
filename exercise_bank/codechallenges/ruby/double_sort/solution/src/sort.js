function doubleSort(array){
  var numbers = array.filter(function(element){
    return isNumber(element);
  });

  var words = array.filter(function(element){
    return !isNumber(element);
  });

  numbers.sort(function(a,b){
    return a - b;
  });
  words.sort();

  var sorted = array.map(function(element){
    if(isNumber(element)){
      return numbers.shift();
    } else {
      return words.shift();
    }
  });

  return sorted;
}

function isNumber(string){
  return parseInt(string)> 0;
}