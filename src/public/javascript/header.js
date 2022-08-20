window.addEventListener('DOMContentLoaded', function (e) {
  const btnLogout = document.querySelectorAll('.btn-logout');
  const formLogout = document.querySelector('.form-logout');
  const btnShowMenuMobile = document.querySelector('.show-menu-mobile');
  const menuMobile = document.querySelector('.menu-mobile');
  const btnCloseMenuMobile = document.querySelector('.close-menu-mobile');
  const userItem = document.querySelector('.dropdown');

  if (window.location.href.indexOf("home") > -1) {
    console.log(true);
    userItem.style.display = 'none';
  } else if (window.location.href.indexOf("flavors") > -1) {
    console.log(true);
    userItem.style.display = 'none';
  } else {
    console.log(false);
    userItem.style.display = 'flex';
  }


  if (btnLogout) {
    btnLogout.forEach((e, i) => {
      e.onclick = (evt) => {
        evt.preventDefault();
        formLogout.submit();
      };
    })
  }

  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => {
    location.href = '/';
  });

  btnCloseMenuMobile.onclick = () => {
    menuMobile.classList.remove('tranform-menu-mobile');
  };

  btnShowMenuMobile.onclick = () => {
    menuMobile.classList.add('tranform-menu-mobile');
  };


});
