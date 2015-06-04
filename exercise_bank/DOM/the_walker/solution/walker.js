// Get the walker image:
var walker = document.getElementById('walker');

// Configure motion params:
var walkingLeft = true;
var leftBorder = 400;
var rightBorder = 700;
var speed = 5;
var xPos = rightBorder;

// Create an update function that will trigger every frame:
function update() {
  // Walk 5 pixels per iteration:
  xPos += walkingLeft ? -speed : speed;
  walker.style.left = xPos + "px";

  // Turn around when you've crossed a border:
  if (xPos < leftBorder || xPos > rightBorder) {
    walker.classList.toggle("flip");
    walkingLeft = !walkingLeft;
  }
};

// Establish an update interval (framerate):
setInterval(update, 100);


// Setup a click handler that manually toggles walker direction: 
walker.addEventListener('click', function() {
  walker.classList.toggle("flip");
  walkingLeft = !walkingLeft;
});