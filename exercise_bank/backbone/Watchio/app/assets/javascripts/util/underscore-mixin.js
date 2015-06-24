_.mixin({
  toSnakeCase: function(string) {
    var transformed = string.charAt(0).toLowerCase() + string.substr(1);
    return transformed.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
  }
});