window.addEventListener('DOMContentLoaded', () => {
  const valueDeliveryProcess = document
    .querySelector('.title-delivery-process')
    .getAttribute('data-bs-whatever');
  const processItem = document.querySelectorAll('.icon-process');
  const totalPricesBill = document.querySelectorAll(
    '.total-prices-product-bill'
  );
  const positionActive = parseFloat(valueDeliveryProcess);
  const totalBill = document.querySelector('.total-bill');

  processItem.forEach((e, i) => {
    console.log(e);
    if (i === positionActive) {
      console.log(e);
      e.classList.add('processDone');
    } else {
      e.classList.remove('processDone');
    }
  });

  var total = 0;
  totalPricesBill.forEach((e, i) => {
    total += parseFloat(
      e.textContent.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)[1]
    );
    totalBill.textContent = `$${total}`;
  });
});
