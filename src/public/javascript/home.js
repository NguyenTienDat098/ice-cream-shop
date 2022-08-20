window.addEventListener('DOMContentLoaded', function (e) {
  // change background - image  when scroll window
  const backGroundUnder = document.querySelector('.bg');
  window.addEventListener('scroll', function (e) {
    var scroll = window.scrollY;
    if (scroll >= 2253) {
      backGroundUnder.style.backgroundColor = '#ff7979';
      backGroundUnder.style.backgroundImage = `url('/public/imgs/baac51_809fe275413a451fbe5e2904700e26ea.png')`;
      backGroundUnder.style.backgroundRepeat = 'no-repeat';
      backGroundUnder.style.backgroundPosition = 'center';
    }
    if (scroll < 2253) {
      backGroundUnder.style.backgroundColor = '#badc58';
      backGroundUnder.style.backgroundImage = `url('/public/imgs/baac51_6728e43c48674e7d90ac20825b605525.png')`;
      backGroundUnder.style.backgroundRepeat = 'no-repeat';
      backGroundUnder.style.backgroundPosition = 'center';
    }
  });
  // chage slide image
  const viewSlide = document.querySelector('.view-slide');
  const buttonNextSlide = document.querySelector('.icon-next');
  const buttonPrevSlide = document.querySelector('.icon-back');
  viewSlide.style.transform = 'translate(0,0)';
  const viewSlideLength = viewSlide.childElementCount;

  // Get last 2 numbers from string: 'matrix(1, 0, 0, 1, 3, 5)'
  function getMatrixArgs(str) {
    return new Function('matrix', 'return ' + str)(function matrix() {
      return Array.prototype.slice.call(arguments, -2); // return [3, 5]
    });
  }

  // Previous slide
  buttonNextSlide.addEventListener('click', function (e) {
    var style = window.getComputedStyle(viewSlide);
    var transform = style.getPropertyValue('transform');
    var string = transform;
    var valueTranslateX = getMatrixArgs(string)[0];
    var limit = -1 * ((viewSlideLength - 4) * 300);
    if (valueTranslateX <= limit) {
      buttonNextSlide.classList.add('disable-btn');
    } else if (valueTranslateX !== limit) {
      if (valueTranslateX % 300 !== 0) {
        buttonNextSlide.classList.add('disable-btn');
        viewSlide.style.transform = `translate(${limit}px,0)`;
      } else {
        buttonNextSlide.classList.remove('disable-btn');
        buttonPrevSlide.classList.remove('disable-btn');
        viewSlide.style.transform = `translate(${valueTranslateX - 300}px,0)`;
      }
    }
  });

  // Next slide
  buttonPrevSlide.addEventListener('click', function (e) {
    var style = window.getComputedStyle(viewSlide);
    var transform = style.getPropertyValue('transform');
    var string = transform;
    var valueTranslateX = getMatrixArgs(string)[0];
    if (valueTranslateX >= 0) {
      buttonPrevSlide.classList.add('disable-btn');
    } else if (valueTranslateX !== 0) {
      if (valueTranslateX % 300 !== 0) {
        buttonPrevSlide.classList.add('disable-btn');
        viewSlide.style.transform = `translate(0,0)`;
      } else {
        buttonPrevSlide.classList.remove('disable-btn');
        buttonNextSlide.classList.remove('disable-btn');
        viewSlide.style.transform = `translate(${valueTranslateX + 300}px,0)`;
      }
    }
  });

  // insert link for buton
  const btn = document.querySelectorAll('.btn-menu');
  btn.forEach((e, i) => {
    e.onclick = () => {
      switch (i) {
        case 0: {
          location.href = '/flavors';
          break;
        }
        case 1: {
          location.href = '/flavors';
          break;
        }
        case 2: {
          location.href = '/flavors';
          break;
        }
        case 4: {
          location.href = '/order';
          break;
        }
        default: {
          break;
        }
      }
    };
  });
});
