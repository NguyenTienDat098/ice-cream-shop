window.addEventListener('DOMContentLoaded', () => {
  const inputCheckbox = document.querySelectorAll('input[type=checkbox]');
  const btnSubmitOrder = document.querySelector('.submit-order');
  const formSubmitOrder = document.querySelector('.form-submit-order');
  const totalPricesBill = document.querySelectorAll(
    '.total-prices-product-bill'
  );
  const totalBill = document.querySelector('.total-bill');
  const inputText = document.querySelectorAll('.form-control');
  inputCheckbox.forEach((e, i) => {
    var checked;
    e.onclick = () => {
      if (e.checked) {
        if (e.getAttribute('name') === 'paymentMethod') {
          checked = e;
          removeChecked(inputCheckbox, checked);
        } else if (e.getAttribute('name') === 'deliveryMethod') {
          checked = e;
          removeChecked(inputCheckbox, checked);
        }
      }
    };
  });

  function removeChecked(listChecked, remove) {
    listChecked.forEach((e, i) => {
      if (
        e.getAttribute('name') === remove.getAttribute('name') &&
        e.value !== remove.value
      ) {
        e.checked = false;
      }
    });
  }

  btnSubmitOrder.onclick = (evt) => {
    var checkCheckbox = 0;
    var checkText = 0;
    evt.preventDefault();
    inputCheckbox.forEach((e, i) => {
      if (e.checked) {
        checkCheckbox++;
      }
    });

    inputText.forEach((e, i) => {
      if (e.value !== '') {
        checkText++;
      }
    });

    if (checkCheckbox === 2 && checkText === 4) {
      localStorage.clear();
      formSubmitOrder.submit();
    }
  };

  var total = 0;
  totalPricesBill.forEach((e, i) => {
    total += parseFloat(
      e.textContent.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)[1]
    );
    totalBill.textContent = `$${total}`;
  });
});
