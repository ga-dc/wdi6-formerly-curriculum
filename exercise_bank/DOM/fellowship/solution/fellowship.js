// Dramatis Personae

var hobbits = [
  "Frodo Baggins",
  "Samwise 'Sam' Gamgee",
  "Meriadoc \"Merry\" Brandybuck",
  "Peregrin 'Pippin' Took"
];

var buddies = [
  "Gandalf the Grey",
  "Legolas",
  "Gimli",
  "Strider",
  "Boromir"
];

var lands = ["The Shire", "Rivendell", "Mordor"];

function makeMiddleEarth(lands) {
  var middleEarth = document.createElement('section');
  middleEarth.id = "middle-earth";
  for (var i = 0; i < lands.length; i++) {
    var articleTag = document.createElement('article');
    var h1Tag = document.createElement('h1');
    h1Tag.textContent = lands[i];
    articleTag.appendChild(h1Tag);
    middleEarth.appendChild(articleTag);
  }
  document.body.appendChild(middleEarth);
}
makeMiddleEarth(lands);

// 2
function makeHobbits(hobbits) {
  var hobbitsList = document.createElement('ul');
  // display an unordered list of hobbits in the shire
  for (var i = 0; i < hobbits.length; i++) {
    // give each hobbit a class of hobbit
    var hobbit = document.createElement('li');
    hobbit.textContent = hobbits[i];
    hobbit.className = "hobbit";
    hobbitsList.appendChild(hobbit)
  }
  var shire = document.getElementsByTagName('article')[0];
  shire.appendChild(hobbitsList);
}
makeHobbits(hobbits);

// 3
function keepItSecretKeepItSafe() {
  // create a div with an id of 'the-ring'
  var ring = document.createElement('div');
  ring.id = "the-ring";
  // add the ring as a child of Frodo
  var frodo = document.getElementsByClassName('hobbit')[0];
  frodo.appendChild(ring);
}
keepItSecretKeepItSafe();

// 4
function makeBuddies(buddies) {
  // create an aside tag
  var asideTag = document.createElement('aside');
  // display an unordered list of buddies in the aside
  var buddiesList = document.createElement('ul');
  // Make the Gandalf text node have a grey background
  for (var i = 0; i < buddies.length; i++) {
    var buddy = document.createElement('li');
    buddy.textContent = buddies[i];
    buddiesList.appendChild(buddy);
  }
  asideTag.appendChild(buddiesList);
  var rivendell = document.getElementsByTagName('article')[1];
  rivendell.parentNode.insertBefore(asideTag, rivendell);
}
makeBuddies(buddies);

// 5
function beautifulStranger() {
  // change the buddy 'Strider' textnode to "Aragorn"
  var buddies = document.getElementsByTagName('aside')[0].getElementsByTagName('li');
  var strider = buddies[3];
  strider.textContent = "Aragorn";
}
beautifulStranger();


// 6
function forgeTheFellowShip() {
  // move the hobbits and the buddies to Rivendell
  // create a new div called 'the-fellowship'
  var theFellowship = document.createElement('div');
  theFellowship.id = 'the-fellowship';
  theFellowship.appendChild(document.createElement('ul'));
  // add each hobbit and buddy one at a time to 'the-fellowship'
  var hobbitList = document.getElementById('the-ring').parentNode.parentNode;
  var hobbitCount = hobbitList.childElementCount;
  for (var i = 0; i < hobbitCount; i++) {
    var hobbit = hobbitList.childNodes[0];
    theFellowship.children[0].appendChild(hobbit);
    alert(hobbit.textContent + " has joined the party");
  // after each character is added make an alert that they have joined your party
  }
  var buddies = document.getElementsByTagName('aside')[0].children[0].children;
  var buddyCount = buddies.length;
  for (var j = 0; j < buddyCount; j++) {
    var buddy = buddies[0];
    theFellowship.children[0].appendChild(buddy);
    alert(buddy.textContent + " has joined the party");
  }
  var rivendell = document.getElementsByTagName('article')[1];
  rivendell.appendChild(theFellowship);
}
forgeTheFellowShip();