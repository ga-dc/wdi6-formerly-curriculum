describe("Game", function() {
  var game, totalGuesses;

  beforeEach(function() {
    totalGuesses = 8;
    game = new Game("butterfinger", totalGuesses);
  });

  describe("initialize", function() {
    it("has a game word (uppercased)", function(){
      expect(game.word).toBe("BUTTERFINGER");
    });

    it("has total allowed guesses", function() {
      expect(game.guessesLeft).toBe(8);
    });
  });

  describe("guess", function() {
    it("counts down the total guesses when wrong", function() {
      game.guess("z");
      expect(game.guessesLeft).toBe(totalGuesses - 1);
    });

    it("doesn't count down when guess is correct", function() {
      game.guess("b");
      expect(game.guessesLeft).toBe(totalGuesses);
    });

    it("adds to guessed letters (uppercased)", function() {
      game.guess("s");
      expect(game.guessedLetters).toContain("S");
    });

    it("doesn't add already guessed letters", function() {
      game.guess("s");
      game.guess("s");

      expect(game.guessedLetters.length).toBe(1);
    });

    it("doesn't take more than one letter", function(){
      expect(function() { game.guess("sd") }).toThrowError("too many letters");
    });

    it("doesn't guess if game is over", function() {
      spyOn(game, 'gameOver').and.callFake(function(){
        return true;
      });

      expect(function() { game.guess("s") }).toThrowError("game over!");
    });
  }); 

  describe("displayWord", function() {
    it("shows the word with correct guessed letters", function(){
      expect(game.wordDisplay()).toBe("_ _ _ _ _ _ _ _ _ _ _ _");
      game.guess("b");
      game.guess("r");
      expect(game.wordDisplay()).toBe("B _ _ _ _ R _ _ _ _ _ R");
      game.guess("t");
      expect(game.wordDisplay()).toBe("B _ T T _ R _ _ _ _ _ R");
    });

    it("shows the whole word if cheating", function() {
      expect(game.wordDisplay(true)).toBe("B U T T E R F I N G E R");
    });
  });

  describe("gameOver", function() {
    it("is over when the game is won", function() {
      spyOn(game, 'won').and.callFake(function(){
        return true;
      });

      expect(game.gameOver()).toBe(true);
    });

    it("is over when the player has guessed the max amount", function() {
      game.guessesLeft = 0;

      expect(game.gameOver()).toBe(true);
    });

    it("is over when the player gives up", function() {
      game.gaveUp = true;

      expect(game.gameOver()).toBe(true);
    });
  });

  describe("won", function() {
    it("won if all the correct letters have been guessed", function() {
      game.guessedLetters = game.word.split('');

      expect(game.won()).toBe(true);
    });

    it("isn't won the word hasn't been guessed", function() {
      expect(game.won()).toBe(false);
    });
  });
});