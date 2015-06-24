var keyword = '';
var offset = 0;
var total = 1;

function next() {
  if (!keyword || offset >= total) return;

  $.getJSON('http://api.giphy.com/v1/gifs/search?q='+keyword+'&offset='+offset+'&api_key=dc6zaTOxFJmzC', function(json) {
    
    // Set total number of gifs for this keyword:
    total = json.pagination.total_count;

    // Render all image tags:
    var images = '';

    for (var i=0; i < json.data.length; i++) {
      images += '<img src="' + json.data[i].images.original.url + '" data-offset="'+offset+'"/>';
      offset++;
    }

    $('body').append(images);
  });  
}

$('form').on('submit', function(evt) {
  evt.preventDefault();

  keyword = escape($("#keyword").val());
  offset = 0;

  next();
  this.reset();
});


// Inifinite Scroll

$(window).on('scroll', _.debounce(function() {
  if($(window).scrollTop() + $(window).height() >= $(document).height()){
    next();
  }
}, 150));

// Delegated Events

$("body").on('click', 'img', function() {
    $(this).toggleClass('big');
});