function search(name) {
  $.ajax({
      url: 'http://www.strudel.org.uk/lookUP/json/?name='+name,
      dataType: 'jsonp'
    })
    .then(function(data) {
      var display = '';

      if (data.image) {
        if (data.image.src.indexOf('//') === 0) {
          data.image.src = 'http:'+ data.image.src;
        }

        display = '<img src="'+ data.image.src +'" alt="'+ data.target.name +'">';
      } else {
        display = "Whoops, we couldn't find that one!"
      }
      
      $('#preview').html(display);
    });
}


$('#search').on('submit', function(evt) {
  evt.preventDefault();
  
  var name = escape($('#search-name').val());

  search(name);
});