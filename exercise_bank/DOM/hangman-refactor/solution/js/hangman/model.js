function Hangman() {
  this.reset();
}

Hangman.prototype = {
  words: ['ruby', 'rails', 'javascript', 'array', 'hash', 'sinatra', 'model', 'controller', 'view', 'authentication', 'capybara', 'jasmine', 'sublime', 'terminal', 'system', 'backbone', 'function', 'prototype', 'documentation', 'development', 'data', 'closure', 'inheritance', 'scope', 'github', 'agile', 'route', 'context', 'deployment', 'database'],
  word: '',
  wordDisplay: '',
  chances: 0,
  guesses: null,
  active: true,
  victory: false,
  onUpdate: null,

  reset: function() {
    this.word = this.selectRandomWord().toUpperCase();
    this.active = true;
    this.chances = 6;
    this.guesses = [];
    this.update();
  },

  giveUp: function() {
    this.update({gameOver: true});
  },

  selectRandomWord: function() {
    var index = Math.round((this.words.length - 1) * Math.random());
    return this.words[index];
  },

  hasWordLetter: function(letter) {
    return this.word.indexOf(letter.toUpperCase()) >= 0;
  },

  hasGuess: function(letter) {
    return this.guesses.indexOf(letter.toUpperCase()) >= 0;
  },

  guess: function(letter) {
    if (!this.active) return;

    if (letter.length > 1) {
      throw "too many letters.";
    }

    if (!this.hasGuess(letter)) {
      this.guesses.push(letter.toUpperCase());

      if (!this.hasWordLetter(letter)) {
        this.chances -= 1;
      }

      this.update();
    }
  },

  update: function(params) {
    params = params || {};

    var display = '';
    var missingLetters = 0;

    for (var i=0; i < this.word.length; i++) {
      var hasGuess = this.hasGuess(this.word[i]);
      display += hasGuess ? this.word[i] : '_';

      if (!hasGuess) {
        missingLetters++;
      }
    }

    // Assess victory state:
    this.victory = !missingLetters;

    // Assess active state:
    if (this.active && this.chances && !params.gameOver) {
      this.active = !!missingLetters;
    } else {
      this.active = false;
    }

    // Assess word display state:
    this.wordDisplay = this.active ? display : this.word;

    // Invoke update callback:
    if (typeof this.onUpdate === 'function') {
      this.onUpdate();
    }
  }
};