describe("CaesarCipher", function(){
  var key = 1; // note that these are all primitives...
  var message = "attackatdawn";
  var encryptedMessage = "buubdlbuebxo";

  // describe the properties of CaesarCipher objects
  describe("has", function(){
    var cipher = new CaesarCipher();
    
    it("a numeric key", function(){
      expect(cipher.key).toBeDefined();
      expect(cipher.key).toEqual(jasmine.any(Number));
    });
    it("a string message", function(){
      expect(cipher.message).toBeDefined();
      expect(cipher.message).toEqual(jasmine.any(String));
    });
    it("an encrypt method", function(){
      expect(cipher.encrypt).toBeDefined();
      expect(cipher.encrypt).toEqual(jasmine.any(Function));
    });
    it("a decrypt method", function(){
      expect(cipher.decrypt).toBeDefined();
      expect(cipher.decrypt).toEqual(jasmine.any(Function));
    });
  });

  // describe the initialization of CaesarCipher objects,
  //  whether the "context" or situation is such that a
  //  key is entered, a key and a message are entered, or
  //  nothing is entered as parameters
  describe("when nothing is passed to the constructor", function(){
    var cipher = new CaesarCipher();

    it("has a key of 0", function(){
      expect(cipher.key).toBe(0);
    });
    it("has an empty string message", function(){
      expect(cipher.message).toBe("");
    });
  });

  describe("when a key only is passed to the constructor", function(){
    var cipher = new CaesarCipher(key);

    it("has a key property of the same amount", function(){
      expect(cipher.key).toBe(key);
    });
    it("has an empty string message", function(){
      expect(cipher.message).toBe("");
    });
  });

  describe("when a key and a message are passed to the constructor", function(){
    var cipher = new CaesarCipher(key, message);

    it("has a key property equal to that key", function(){
      expect(cipher.key).toBe(key);
    });
    it("has an message property equal to that message", function(){
      expect(cipher.message).toBe(message);
    });
  });

  // describe the behavior of a CaesarCipher object
  describe("#encrypt", function(){
    var cipher;

    beforeEach(function(){
      cipher = new CaesarCipher(key, message);
    });
    afterEach(function(){
      cipher = null;
    });

    it("returns a message encrypted with the key", function(){
      expect(cipher.encrypt()).toBe(encryptedMessage);
    });
    it("encrypts the message property inside the cipher object", function(){
      cipher.encrypt();
      expect(cipher.message).toBe(encryptedMessage);
    });
    it("allows keys larger than 25", function(){
      cipher.key = 27;
      expect(cipher.encrypt()).toBe(encryptedMessage);
    });
    it("removes all spaces from the message", function() {
      cipher.message = "attack at dawn"
      expect(cipher.encrypt()).toBe(encryptedMessage);
    });
    it("is case-insensitive", function() {
      cipher.message = "aTtACkAtDAWn";
      expect(cipher.encrypt()).toBe(encryptedMessage);
    });

    describe("when passed a key", function(){
      var cipher = new CaesarCipher(11, message);

      it("overrides the key property for purposes of encryption", function() {
        expect(cipher.encrypt(1)).toBe(encryptedMessage);
      });
      it("doesn't actually change the key property", function() {
        cipher.encrypt(1);
        expect(cipher.key).toBe(11);
      });
    });

    describe("when passed a message", function(){
      var alternateMessage = "tommybahama";
      var cipher = new CaesarCipher(key, alternateMessage);

      it("overrides the message property for encryption", function() {
        expect(cipher.encrypt(message)).toBe(encryptedMessage);
      });
    });
  });

  describe("#decrypt", function(){
    var cipher;

    beforeEach(function(){
      cipher = new CaesarCipher(key, message);
      cipher.encrypt();
    });
    afterEach(function(){
      cipher = null;
    });

    it("returns the message property, now decrypted with the key, in upper-case", function(){
      expect(cipher.decrypt()).toEqual(message.toUpperCase());
    });
    it("decrypts the message property inside the cipher object", function(){
      cipher.decrypt();
      expect(cipher.message).toEqual(message.toUpperCase());
    });
  });
  
});

