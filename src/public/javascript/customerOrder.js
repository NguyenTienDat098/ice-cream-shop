window.addEventListener('DOMContentLoaded', () => {
  const customerOrders = document.querySelectorAll('.order-code');
  const inputSearch = document.querySelector('input[type=search]');
  const viewTable = document.querySelector('.view-table');

  var prevHTML = viewTable.outerHTML;
  window.onkeyup = () => {
    if (inputSearch.value === '') {
      viewTable.innerHTML = prevHTML;
    }
    customerOrders.forEach((e, i) => {
      if (e.textContent === inputSearch.value) {
        viewTable.innerHTML = e.parentElement.outerHTML;
      }
    });
  };
  inputSearch.onpaste = (event) => {
    customerOrders.forEach((e, i) => {
      if (e.textContent === inputSearch.value) {
        viewTable.innerHTML = e.parentElement.outerHTML;
      }
    });
  };
});
