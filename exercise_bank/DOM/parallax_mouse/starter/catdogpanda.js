$(function(){

  var cat = $("<img class='cat' src='http://placekitten.com/200/200' />");
  $("body").append(cat);

  var panda = $("<img class='panda' src='http://news.worldwild.org/wp-content/uploads/2008/09/red_panda.jpg' />");
  $("body").append(panda);

  var dog = $("<img class='dog' src='http://placedog.com/200/200' />");
  $("body").append(dog);

  $( "body" ).mousemove(function( event ) {
    var msg = "Handler for .mousemove() called at ";
    msg += event.pageX + ", " + event.pageY;
    $("#coords").text(msg);
    $(".cat").css({"margin-left": event.pageX/4, "margin-top": event.pageY/4});
    $(".dog").css({"margin-left": event.pageX/10, "margin-top": event.pageY/10});
    $(".panda").css({"margin-left": event.pageX/20, "margin-top": event.pageY/20});
  });

  $('img').on('click', function(event){
    event.stopPropagation();
    $(this).toggleClass("border");
  });

  $("body").on("click", function(){
    $("body").off("mousemove");
  })

});