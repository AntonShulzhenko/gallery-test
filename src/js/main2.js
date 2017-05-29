(function() {
  var gallery = document.querySelector('.gallery'),
    galleryItems = gallery.querySelectorAll('.gallery__item');

  function BA(el) {
    this.el = el;
    this.afterEl = this.el.querySelector('.gallery__after');

    // Bind to this
    this.move = this.move.bind(this);
    this.bindEvents();
  }

  BA.prototype.move = function(e) {
    var offsetX = e.offsetX || e.offsetClient - this.afterEl.offsetLeft;
    this.afterEl.style.width = offsetX + 'px';
  };

  BA.prototype.bindEvents = function() {
    this.el.addEventListener('click', this.move);
  };

  Array.prototype.forEach.call(galleryItems, function(el) {
    var item = new BA(el);
  });
}());
