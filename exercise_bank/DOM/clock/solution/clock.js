$(function(){

  var intervalID = window.setInterval(animate, 1000);
  var secondsPassed = 0;

  var d = new Date();
  var hours = d.getHours() % 12;
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();

  var hourOffset = hours*30 + minutes/2 + seconds/120;
  var minuteOffset = minutes*6 + seconds/10;

  function animate(){
    $("#second-hand").css({
      'transform': 'rotate(' + ((seconds + secondsPassed) * 6) + 'deg)',
      '-moz-transform': 'rotate(' + ((seconds + secondsPassed) * 6) + 'deg)',
      '-o-transform': 'rotate(' + ((seconds + secondsPassed) * 6) + 'deg)',
      '-webkit-transform': 'rotate(' + ((seconds + secondsPassed) * 6) + 'deg)'
    });

    $("#minute-hand").css({
      'transform': 'rotate('+ (minuteOffset + secondsPassed /10) + 'deg)',
      '-moz-transform': 'rotate(' + (minuteOffset + secondsPassed /10) + 'deg)',
      '-o-transform': 'rotate(' + (minuteOffset + secondsPassed /10) + 'deg)',
      '-webkit-transform': 'rotate(' + (minuteOffset + secondsPassed /10) + 'deg)'
    });

    $("#hour-hand").css({
      'transform': 'rotate(' + (hourOffset + secondsPassed/120) + 'deg)',
      '-moz-transform': 'rotate(' + (hourOffset + secondsPassed/120) + 'deg)',
      '-o-transform': 'rotate(' + (hourOffset + secondsPassed/120) + 'deg)',
      '-webkit-transform': 'rotate(' + (hourOffset + secondsPassed/120) + 'deg)'
    });

    secondsPassed++;

  }
})