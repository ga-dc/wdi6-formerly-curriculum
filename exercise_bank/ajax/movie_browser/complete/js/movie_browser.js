// API Docs at: 
// http://www.omdbapi.com


function search(keyword) {
  var url = 'http://www.omdbapi.com/?s='+escape(keyword);

  $.getJSON(url).then(function(data) {
    var display = '<option value="">Movies matching "'+ keyword +'"...</option>';

    for (var i=0; i < data.Search.length; i++) {
      var movie = data.Search[i];
      display += ['<option value="', movie.imdbID, '">', movie.Title, '</option>'].join('');
    } 

    $('#movie-select').show().html(display);
  });
}

function show(imdbId) {
  if (!imdbId) return;

  var url = 'http://www.omdbapi.com/?i='+imdbId;

  $.getJSON(url).then(function(data) {
    var detail = '<h2>' + data.Title + '</h2>';
    detail += '<img src="'+ data.Poster +'" alt="'+ data.Title +'">';
    $('#movie-detail').html(detail);
  });
}


// Search form:

$('#search').on('submit', function(evt) {
  evt.preventDefault();
  var $search = $('#movie-search');
  var keyword = $search.val();
  $search.val('');

  search(keyword);
});


// Movie selector:

$('#movie-select').hide().on('change', function() {
  show(this.value);
});