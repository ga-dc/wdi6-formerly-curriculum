var setColor = document.querySelector('#set-color');
var colorInput = document.querySelector('#color-field');
var colorField = document.querySelector('.brush');

setColor.addEventListener('click', function(eventObject) {
  eventObject.preventDefault();
  colorField.style.backgroundColor = colorInput.value.toString();
});

for(var i = 0; i <8000; i++){
  var div = document.createElement("div");
  div.className = "square";
  document.body.appendChild(div);
  div.addEventListener("mouseover", function() {
    this.style.background = colorField.style.backgroundColor;
  })
};