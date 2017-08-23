var buttonsFix = document.getElementById('toptbuttons');

    var buttonsSourceBottom = buttonsFix.getBoundingClientRect().bottom + window.pageYOffset;

    window.onscroll = function() {
      if (buttonsFix.classList.contains('fixed') && window.pageYOffset < buttonsSourceBottom) {
        buttonsFix.classList.remove('fixed');
      } else if (window.pageYOffset > buttonsSourceBottom) {
        buttonsFix.classList.add('fixed');
      }
    };