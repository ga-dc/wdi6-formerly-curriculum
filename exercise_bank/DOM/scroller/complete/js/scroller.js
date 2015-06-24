function Scroller(el) {
  this.$el = $(el);
  this.$area = this.$el.find('.scroll-area');
  this.$content = this.$el.find('.scroll-content');
  this.$bar = this.$el.find('.scroll-bar');
  
  this.$bar.on('mousedown', _.bind(this.onTouchBar, this));
  this.render();
}

Scroller.prototype = {
  areaH: 0,
  contentH: 0,
  barH: 0,
  rangeH: 0,

  render: function() {
    // Get area height, content height, and bar height:
    this.areaH = this.$area.height();
    this.contentH = this.$content.outerHeight();
    this.barH = this.areaH * (this.areaH / this.contentH);

    this.$bar.height(this.barH);
    this.rangeH = this.areaH - this.barH;
  },

  update: function(ypos) {
    ypos = Math.max(0, Math.min(ypos, this.rangeH));
    var scrollY = (this.contentH - this.areaH) * (ypos / this.rangeH);
    this.$bar.css({top: ypos});
    this.$area.scrollTop(scrollY);
  },

  onTouchBar: function(evt) {
    var self = this;

    function handleScroll(evt) {
      self.update(evt.pageY - self.$el.offset().top);
    }

    var $doc = $(document)
      .on('mousemove.scroller', function(evt) {
        evt.preventDefault();
        handleScroll(evt);
      })
      .on('mouseup.scroller', function(evt) {
        evt.preventDefault();
        handleScroll(evt);
        $doc.off('mousemove.scroller mouseup.scroller');
      });

    handleScroll(evt);
  }
};



$('[data-ui="scroller"]').each(function() {
  new Scroller(this);
});