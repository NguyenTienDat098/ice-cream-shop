window.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.querySelector('.btn-login');
  const btnRegister = document.querySelector('.btn-register');
  const formLogin = document.querySelector('.form-login');
  const formRegister = document.querySelector('.form-register');
  const inputLogin = document.querySelectorAll('.input-lg');
  const inputRegister = document.querySelectorAll('.input-rg');

  var loginFail = false;
  if (btnLogin) {
    btnLogin.onclick = (evt) => {
      evt.preventDefault();
      inputLogin.forEach((e, i) => {
        if (e.value === '') {
          loginFail = true;
        }
      });
      if (!loginFail) {
        formLogin.submit();
      } else {
        alert('Please fill in all the inputs !!!');
        loginFail = false;
      }
    };
  }

  var registerFail = false;
  if (btnRegister) {
    var currentPass = '';
    var againPass = '';
    btnRegister.onclick = (evt) => {
      evt.preventDefault();
      inputRegister.forEach((e, i) => {
        if (e.value === '' || e.value.length < 8) {
          registerFail = true;
        }
        if (i === 2) {
          currentPass = e.value;
        }
        if (i === 3) {
          againPass = e.value;
        }
      });
      if (currentPass !== '' && againPass !== '' && currentPass !== againPass) {
        alert('Invalid password !!!');
        registerFail = true;
      }

      if (!registerFail) {
        formRegister.submit();
      } else {
        registerFail = false;
        alert('Please fill in all the inputs and more than 8 charecter !!!');
      }
    };
  }
});
