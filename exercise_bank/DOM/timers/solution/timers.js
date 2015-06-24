var timer = document.getElementById("timer");
var reset = document.getElementById("reset");
var start = document.getElementById("start");
var pause = document.getElementById("pause");

var seconds = 0;
var timerId;

function updateTime(){
  seconds++;
  timer.textContent = 'Time elapsed: ' + seconds;
}

start.addEventListener('click', function() {
    console.log('start');
    timer.textContent = 'Time elapsed: ' + seconds;
    timerId = setInterval(updateTime, 1000);
});

pause.addEventListener('click', function() {
    clearInterval(timerId);
});

reset.addEventListener('click', function() {
    console.log('reset');
    seconds = 0;
    clearInterval(timerId);
    timer.textContent = 'Stop Watch';
});
