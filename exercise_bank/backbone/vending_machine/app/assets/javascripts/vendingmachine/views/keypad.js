define(function(require) {

  // Imports:
  var Backbone = require('backbone');

  // Implementation:
  var KeypadView = Backbone.View.extend({
    events: {
      'click button': 'onKeypad'
    },

    onKeypad: function(evt) {
      evt.preventDefault();
      var keycode = $(evt.currentTarget).attr('data-ui');

      if (keycode == 'clear') {
        this.model.resetCode();
      } else {
        this.model.addKeyCode(keycode);
      }
    }
  });

  return KeypadView;
});