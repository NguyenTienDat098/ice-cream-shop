window.addEventListener('DOMContentLoaded', function (e) {
  const btnLogout = document.querySelector('.btn-logout');
  const formLogout = document.querySelector('.form-logout');
  if (btnLogout) {
    btnLogout.onclick = (e) => {
      console.log(btnLogout);
      e.preventDefault();
      formLogout.submit();
    };
  }
});
