// Callback:
// --------------------------
// Give setInterval a "callback" to trigger after each interval.
setInterval(function() {
  $('#callback-message').html('<b>Callback at:</b> ' + new Date().toTimeString());
}, 1000);


// Event:
// --------------------------
// Bind an event handler onto a DOM element,
// it will be invoked each time the named event occurs.
$('#event-bttn')[0].addEventListener('click', function(evt) {
  var date = new Date(evt.timeStamp); 
  $('#event-message').html('<b>Event "'+ evt.type +'"occured at:</b> ' + date.toTimeString());
});

// Promise:
// --------------------------
var promise1 = $.Deferred();
var promise2 = $.Deferred();

// Resolutions:

promise1.then(function(data) {
  $('#promise-bttn1').after('&#10003;');
});

promise2.then(function(data) {
  $('#promise-bttn2').after('&#10003;');
});


// Behaviors:

$('#promise-bttn1').click(function() {
  promise1.resolve();
});

$('#promise-bttn2').click(function() {
  promise2.resolve();
});


// Brute force handling...

var twoPromises = Q.all([promise1, promise2]);

twoPromises.then(function() {
  $('#promise-message').html('<b>All promises resolved at:</b> ' + new Date().toTimeString());
});