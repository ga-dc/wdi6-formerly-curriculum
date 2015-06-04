function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  
  $.getJSON(url).then(function(data) {
    var html = '';

    for (var i=0; i < data.artists.length; i++) {
      var artist = data.artists[i];
      html += '<li><a href="'+ artist.href +'">'+ artist.name +'</a></li>';
    }

    $('#results').html(html);
  });
}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;

  $.getJSON(url).then(function(data) {
    var html = '';

    for (var i=0; i < data.tracks.length; i++) {
      var track = data.tracks[i];
      html += '<li><a href="'+ track.href +'">'+ track.name +'</a></li>';
    }

    $('#results').html(html);
  });
}


$('#search').on('submit', function(evt) {
  evt.preventDefault();
  var searchType = $('#search-type').val();
  keyword = escape($('#search-keyword').val());

  if (searchType === 'artist') {
    searchByArtist(keyword);
  } else {
    searchByTrack(keyword);
  }
});