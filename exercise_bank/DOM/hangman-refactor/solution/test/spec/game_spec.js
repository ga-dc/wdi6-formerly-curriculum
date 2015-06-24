describe("Hangman", function() {
  var game;
  var CHANCES;

  beforeEach(function() {
    game = new Hangman();
    CHANCES = game.chances;
  });

  describe("selectRandomWord", function() {
    it("should pick the first word option with a random value of 0.", function() {
      var random = sinon.stub(Math, 'random').returns(0);
      expect(game.selectRandomWord()).toBe(game.words[0]);
      random.restore();
    });

    it("should pick the last word option with a random value of 1.", function() {
      var random = sinon.stub(Math, 'random').returns(1);
      expect(game.selectRandomWord()).toBe(game.words[game.words.length-1]);
      random.restore();
    });
  });

  describe("hasWordLetter", function() {
    beforeEach(function() {
      game.word = 'ZEBRA';
    });

    it("should return true if the active word contains the specified letter.", function() {
      expect(game.hasWordLetter('Z')).toBe(true);
    });

    it("should return false if the active word does not contain the specified letter.", function() {
      expect(game.hasWordLetter('X')).toBe(false);
    });
  });

  describe("hasGuess", function() {
    beforeEach(function() {
      game.guesses.push('Z');
    });

    it("should return true if the list of guesses contains the specified letter.", function() {
      expect(game.hasGuess('Z')).toBe(true);
    });

    it("should return false if the list of guesses does not contain the specified letter.", function() {
      expect(game.hasGuess('X')).toBe(false);
    });
  });

  describe("update (with idempotent outcomes)", function() {
    beforeEach(function() {
      game.word = 'SEES';
    });

    it("should render the word display based on current guesses while game is active.", function() {
      game.active = true;
      game.guesses = ['E'];
      game.update();
      expect(game.wordDisplay).toBe('_EE_');
    });

    it("should render the full word display when the game is no longer active.", function() {
      game.active = false;
      game.update();
      expect(game.wordDisplay).toBe('SEES');
    });

    it("should resolve victory as true when all letters have been guessed.", function() {
      game.guesses = ['S', 'E'];
      game.update();
      expect(game.victory).toBe(true);
    });

    it("should resolve victory as false when letters are still missing.", function() {
      game.update();
      expect(game.victory).toBe(false);
    });

    it("should deactivate the game when all letters have been guessed.", function() {
      game.guesses = ['S', 'E'];
      game.update();
      expect(game.active).toBe(false);
    });

    it("should deactivate the game when all chances have been exhausted.", function() {
      game.chances = 0;
      game.update();
      expect(game.active).toBe(false);
    });

    it("should forcibly conclude the game when passed a {gameOver: true} option.", function() {
      game.update({gameOver: true});
      expect(game.active).toBe(false);
    });

    it("should invoke the 'onUpdate' callback, if one is defined.", function() {
      game.onUpdate = sinon.spy();
      game.update();
      expect(game.onUpdate.calledOnce).toBe(true);
    });
  });

  describe("guess", function() {
    beforeEach(function() {
      game.word = 'BATMAN';
    });

    it("should add a new letter to the array of guesses.", function() {
      game.guess('Z');
      expect(game.hasGuess('Z')).toBe(true);
      expect(game.guesses.length).toBe(1);
    });

    it("should take no action while the game is inactive.", function() {
      game.active = false;
      game.guess('Z');
      expect(game.guesses.length).toBe(0);
    });

    it("should throw an error when guess length is invalid.", function() {
      expect(function() {
        game.guess('ZZ');
      }).toThrow();
    });

    it("should decrement chances when guessing a new failed letter.", function() {
      game.guess('Z');
      expect(game.chances).toBe(CHANCES - 1);
    });

    it("should not decrement chances when guessing the same failed letter.", function() {
      game.guess('Z');
      game.guess('Z');
      expect(game.chances).toBe(CHANCES - 1);
    });

    it("should not decrement chances when guessing a successful letter.", function() {
      game.guess('B');
      expect(game.chances).toBe(CHANCES);
    });

    it("should update the game state after a successful guess.", function() {
      var updateSpy = sinon.spy(game, 'update');
      game.guess('B');
      expect(updateSpy.calledOnce).toBe(true);
      updateSpy.restore();
    });
  });

  describe("giveUp", function() {
    it("should call the 'update' method with a {gameOver: true} option.", function() {
      var updateSpy = sinon.spy(game, 'update');
      game.giveUp();
      expect(updateSpy.calledWith({gameOver: true})).toBe(true);
      updateSpy.restore();
    });

    it("should deactivate the game.", function() {
      game.giveUp();
      expect(game.active).toBe(false);
    });
  });

  describe("reset", function() {
    it("should generate a new random word.", function() {
      var randomWord = sinon.stub(game, 'selectRandomWord').returns('banana');
      game.reset();
      expect(game.word).toBe('BANANA');
      randomWord.restore();
    });

    it("should reset all guesses.", function() {
      game.guesses = ['A'];
      game.reset();
      expect(game.guesses.length).toBe(0);
    });

    it("should call update.", function() {
      var updateSpy = sinon.spy(game, 'update');
      game.reset();
      expect(updateSpy.calledOnce).toBe(true);
      updateSpy.restore();
    });
  });
});