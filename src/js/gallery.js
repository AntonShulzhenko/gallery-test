(function() {
  var gallery             = document.querySelector('.gallery'),
    galleryContainer      = gallery.querySelector('.gallery__container'),
    gallerLine            = gallery.querySelector('.gallery__line'),
    galleryItems          = gallery.querySelectorAll('.gallery__item'),
    galleryFilmStrip      = gallery.querySelector('.gallery__film-strip'),
    galleryFilmStripItems = galleryFilmStrip.children;

  Array.prototype.forEach.call(galleryItems, function(el, i) {
    var afterImg = el.querySelector('.gallery__after img'),
      cloneImg   = afterImg.cloneNode(true),
      mini       = document.createElement('div');

    mini.classList.add('gallery__film-strip-item');
    galleryFilmStrip.appendChild(mini);
    galleryFilmStripItems[i].appendChild(cloneImg);
  });

  function beforeAfter(el) {
    var after = el.querySelector('.gallery__after');
    after.style.width = '150px';
    gallerLine.style.transform = 'translateX(150px)';

    function move(e) {
      var offsetX = e.offsetX || e.offsetClient - after.offsetLeft;

      after.style.width = offsetX + 'px';
      gallerLine.style.transform = 'translateX(' + offsetX + 'px)';

      if (e.type !== 'click') {
        after.classList.remove('trans');
        gallerLine.classList.remove('trans');
      }

      el.removeEventListener('click', move);
      el.addEventListener('mousemove', move);
    }

    el.addEventListener('click', move);

    galleryContainer.addEventListener('mouseover', function() {
      el.addEventListener('click', move);
      after.classList.add('trans');
      gallerLine.classList.add('trans');
    });

    galleryContainer.addEventListener('mouseleave', function() {
      el.removeEventListener('mousemove', move);
    });
  }

  beforeAfter(galleryItems[0]);

  Array.prototype.forEach.call(galleryFilmStripItems, function(el, i) {
    el.addEventListener('click', function() {
      Array.prototype.forEach.call(galleryItems, function(el) {
        el.classList.remove('is-active');
      });

      galleryItems[i].classList.add('is-active');

      if (galleryItems[i].classList.contains('is-active')) {
        beforeAfter(galleryItems[i]);
      }
    });
  });
}());
