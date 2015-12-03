function Snowman(name) {
  this.name = name;
  this.features = ["carrot nose", "stick arms"];
}

Snowman.prototype = {
  hug: function(){
    if (this.name == "Olaf") {
      return "I like warm hugs!";
    }
    else {
      return "Why are you hugging snow?";
    }
  }
};

module.exports = Snowman;
