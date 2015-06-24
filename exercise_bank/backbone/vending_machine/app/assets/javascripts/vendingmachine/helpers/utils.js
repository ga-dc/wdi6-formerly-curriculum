define({
  // Formats a cents-integer into a dollars/cents string:
  formatCents: function(cents) {
    return '$' + (cents/100).toFixed(2);
  },

  // Parses a string into a cents-integer:
  parseCents: function(str) {
    var cents = parseFloat(str);
    return isNaN(cents) ? 0 : cents * 100;
  }
});