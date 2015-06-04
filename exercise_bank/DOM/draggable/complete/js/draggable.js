var $body = $('body');
var height = $body.height();
var width = $body.width();

$('img.empty').each(function() {
  var $img = $(this);

  $img.css({
    left: (width - $img.width()) * Math.random(),
    top: (height - $img.height() - 200) * Math.random() + 200
  });
});

$('img.drag')
  .each(function(index) {
    $(this).css({
      left: width / 3 * index,
      top: 10
    });
  })
  .on('mousedown', function(evt) {
    evt.preventDefault();
    drag(this);
  });


function drag(el) {
  var $el = $(el);
  var $doc = $(document)
    .on('mousemove', function(evt) {
      $el.css({
        left: evt.pageX - $el.width()/2,
        top: evt.pageY - $el.height()/2
      });
    })
    .on('mouseup', function(evt) {
      $doc.off('mousemove mouseup');
      drop($el);
    });
}

function drop(el) {
  var $pos = $(el);
  var negative = $pos.attr('src').replace('-pos', '-neg');
  var $neg = $('img[src="'+ negative +'"]');

  var pos = $pos.offset();
  var neg = $neg.offset();

  if (distance(pos, neg) < 40) {
    $pos.animate(neg);
  }
}

function distance(pos, neg) {
  var a = neg.left - pos.left;
  var b = neg.top - pos.top;
  return Math.sqrt(a * a + b * b);
}