var gifs;
var counter = 0;

function getGifs(keyword){
  $.getJSON('/search?keyword='+keyword, function(response){
    gifs = response;

  $('#add').on('click', function(){
    appendGif();
  });

  });  
}

function appendGif(){
  var img = $('<img src="' + gifs.data[counter].images.original.url + '" />');
  $('body').append(img);
  counter++;
}


$("form").on('submit', function(e){
  e.preventDefault();
  var keyword = $("input").val(); 
  getGifs(keyword);
  this.reset();
  counter = 0;
});


// Inifinite Scroll

$(window).on('scroll', function(){
  if($(window).scrollTop() + $(window).height() >= $(document).height()){
    appendGif();
  }
});

// Delegated Events

$("body").on('click', 'img', function(){
    $(this).toggleClass('big');
});