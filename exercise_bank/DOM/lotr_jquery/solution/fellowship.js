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

//1
function makeMiddleEarth(lands) {
  var middleEarth = $('<section>');
  middleEarth.attr('id', "middle-earth");

  $.each(lands, function(index, land) {
    var article = $('<article>');
    var h1 = $('<h1>' + land + '</h1>')
    article.append(h1);
    middleEarth.append(article);
  });

  $('body').append(middleEarth);
}
makeMiddleEarth(lands);

// 2
function makeHobbits(hobbits) {
  var hobbitsList = $('<ul>');
  $.each(hobbits, function(index, hobbit){
    var li = $('<li>' + hobbit + '</li>');
    li.addClass('hobbit');
    hobbitsList.append(li);
  })
  var shire = $('article').first();
  shire.append(hobbitsList);
}
makeHobbits(hobbits);

// 3
function keepItSecretKeepItSafe() {
    var ring = $('<div>');
    ring.attr('id', 'ring');
    var frodo = $('.hobbit').first();
    frodo.append(ring);
}
keepItSecretKeepItSafe();

// 4
function makeBuddies(buddies) {
  var aside = $('<aside>');
  var buddiesList = $('<ul>');
  buddiesList.addClass('buddies');
  $.each(buddies, function(index, buddy){
    var li = $('<li>' + buddy + '</li>');
    li.addClass('buddy');
    if( buddy === "Gandalf the Grey" ) {
      li.css('background', 'grey');
    }
    buddiesList.append(li);
  });
  aside.append(buddiesList);
  $('article:eq(1)').before(aside);
}
makeBuddies(buddies);

// 5
function beautifulStranger() {
  var strider = $('.buddies li:nth-child(3)');
  strider.text('Aragorn');
}
beautifulStranger();


// 6
function forgeTheFellowShip() {
  var rivendell = $('article:eq(1)');

  var theFellowship = $('<div>');
  theFellowship.attr('id', 'the-fellowship');
  var fellowshipList = $('<ul>');
  theFellowship.append(fellowshipList);

  rivendell.append(theFellowship);

  hobbitList = $('.hobbit');
  $.each(hobbitList, function(index, hobbit){
    fellowshipList.append(hobbit);
    console.log(hobbit.textContent + " has joined!");
  });

  buddyList = $('.buddy');
  $.each(buddyList, function(index, buddy){
    fellowshipList.append(buddy);
    console.log(buddy.textContent + " has joined!");
  });
}
forgeTheFellowShip();