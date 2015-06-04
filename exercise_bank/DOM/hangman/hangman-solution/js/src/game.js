var Game = function(word, totalGuesses) {
  this.word = word.toUpperCase();
  this.guessesLeft = totalGuesses;
  this.guessedLetters = [];
};

Game.prototype.guess = function(letter) {
  letter = letter.toUpperCase();

  if (letter.length > 1) {
    throw new Error("too many letters");
  } else if (this.gameOver()) {
    throw new Error("game over!");
  };

  if (this.guessedLetters.indexOf(letter) == -1) {
    this.guessedLetters.push(letter);

    if (this.word.indexOf(letter) == -1) {
      this.guessesLeft -= 1;  
    };
  };
};

Game.prototype.gameOver = function() {
  return this.guessesLeft == 0 || this.won() || this.gaveUp;
};

Game.prototype.wordDisplay = function(cheat) {
  var display = "";

  if (cheat) {
    display = this.word.split('').join(" ");
  } else {
    this.word.split('').forEach(function(letter, i){
      if (this.guessedLetters.indexOf(letter) != -1) {
        display += letter;
      } else {
        display += "_";
      }

      display += " ";  
    }.bind(this));
  };

  return display.trim();
};

Game.prototype.won = function() {
  for (var i = 0; i < this.word.length; ++i) {
    if (this.guessedLetters.indexOf(this.word[i]) == -1) {
      return false;
    }
  };

  return true;
};