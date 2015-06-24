function HangmanView(model) {
  this.model = model;
  this.initialize();
}

HangmanView.prototype = {
  initialize: function() {
    // Get UI elements:
    this.uiLetter = document.querySelector('#letter');
    this.uiGuesses = document.querySelector('[data-ui="guesses"]');
    this.uiChances = document.querySelector('[data-ui="chances"]');
    this.uiResult = document.querySelector('[data-ui="result"]');
    this.uiWord = document.querySelector('[data-ui="word"]');
    this.uiNewGame = document.querySelector('[data-ui="newgame"]');
    this.uiGiveUp = document.querySelector('[data-ui="giveup"]');

    // Bind UI listeners:
    this.uiLetter.addEventListener("keyup", _.bind(this.onLetter, this));
    this.uiNewGame.addEventListener('click', _.bind(this.onNewGame, this));
    this.uiGiveUp.addEventListener("click",_.bind(this.onGiveUp, this));
    this.model.onUpdate = _.bind(this.render, this);
    this.render();
  },

  render: function() {
    var result = '';

    if (!this.model.active) {
      result = 'You ' + (this.model.victory ? 'win!' : 'lose');
    }

    this.uiChances.innerText = this.model.chances;
    this.uiGuesses.innerText = this.model.guesses.join(" ");
    this.uiWord.innerText = this.model.wordDisplay;
    this.uiResult.innerText = result;
  },

  onNewGame: function() {
    this.model.reset();
  },

  onGiveUp: function() {
    this.model.giveUp();
  },

  onLetter: function() {
    var letter = this.uiLetter.value;
    this.uiLetter.value = '';
    this.model.guess(letter);
  }
};