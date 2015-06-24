var Movie = Backbone.Model.extend({
  posterSrc: function() {
    var src = this.get("poster");

    if ( src != "N/A") {
      return src;
    } else {
      return "http://fillmurray.com/200/300";
    }
  },

  toggleSeen: function() {
    this.set("seen", !this.get("seen"));
  }
});