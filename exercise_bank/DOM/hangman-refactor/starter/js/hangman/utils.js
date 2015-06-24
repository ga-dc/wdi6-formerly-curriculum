var _ = {

  bind: function(method, context) {
    // return a function that calls a method with the specified context.
    return function() {
      method.apply(context, arguments);
    };
  }
  
};