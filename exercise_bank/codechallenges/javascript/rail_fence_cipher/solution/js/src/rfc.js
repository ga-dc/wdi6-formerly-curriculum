function encode(stringToEncode){
  // I need to progress through the given string character by character.
  // I want to create three rows (likely as strings), and assign the active row
  // the letter in question, and the other 2 rows a '.' character before progressing
  // to the next character

  var fence = ['', '', ''],
      activeRow = 0,
      goingDown = true;

  for (var i = 0; i < stringToEncode.length; i++){
    // I need to add a value to each row of the fence the active row from the first to the second and second to the first or
    for (var m = 0; m < fence.length; m++){
      fence[m] += m === activeRow ? stringToEncode[i] : '.';
    }
    // I want to increase the active row if we're going down and decrement
    activeRow += goingDown ? 1 : -1;
    // the active row if we're going up
    if (activeRow === 2){
      goingDown = false;
    } else if (activeRow === 0){
      goingDown = true;
    }
  }
  // I want to return an upcased string, concatenated from the three rows,
  // minus any '.' values
  var encodedString = '';
  for(var i = 0; i < fence.length; i++){
    var uninterruptedRail = fence[i].replace(/\./g, '');
    encodedString += uninterruptedRail;
  }
  return encodedString;
}
