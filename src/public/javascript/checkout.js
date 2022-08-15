const input = document.querySelectorAll('input[type=checkbox]');
const btnSubmitOrder = document.querySelector('.submit-order');
const formSubmitOrder = document.querySelector('.form-submit-order');
input.forEach((e, i) => {
  var checked;
  e.onclick = () => {
    if (e.checked) {
      if (e.getAttribute('name') === 'payment method') {
        checked = e;
        removeChecked(input, checked);
      } else if (e.getAttribute('name') === 'delivery method') {
        checked = e;
        removeChecked(input, checked);
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

btnSubmitOrder.onclick = () => {
  formSubmitOrder.submit();
};
