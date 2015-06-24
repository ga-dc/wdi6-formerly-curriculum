function CaesarCipher(key, message){
  this.key = key || 0;
  this.message = message || "";

  this.encrypt = function(input){
    // test the input for type (it's weird in js!)
    var inputMessage = (typeof(input) === "string") ? input : null;
    var inputKey     = (typeof(input) === "number") ? input : null;
    // set the working key and message to the input
    var message = inputMessage || this.message;
    var key     = inputKey     || this.key;
    
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var encryptedMessage = "";

    // manipulate the message!!
    message = message
      .toLowerCase()
      .replace(/ /g,"")
      .split("");
    
    for (var i = 0; i < message.length; i++ ){
      var newIndex = alphabet.indexOf(message[i]) + key;
      encryptedMessage += alphabet[newIndex % 26];
    } 

    //set the object property
    this.message = encryptedMessage;

    return encryptedMessage;
  };

  this.decrypt = function () {
    var key = (26 - this.key);
    this.message = this.encrypt(key).toUpperCase();
    return this.message;
  };
}