window.addEventListener('DOMContentLoaded', function (e) {
  /**
   * VARIABLES
   * @type {[variable]}
   */
   const products = document.querySelectorAll('.child-item');
   const viewSelectProduct = document.querySelector('.view-select-product');
   const btnCloseViewSelect = document.querySelector('.close-select-view');
   const btnIncreaseAmounts = document.querySelector('.increase-number');
   const btnDecreaseAmounts = document.querySelector('.decrease-number');
   const amountsProduct = document.querySelector('.amounts-product');
   const customerRequest = document.querySelector('.customer-requests');
   const nameProductSelect = document.querySelector('.name-product-select');
   const desProductSelect = document.querySelector('.des-product-select');
   const amountsProductAdd = document.querySelector('.amounts-product-added');
   const buttonAddProductSelect = document.querySelector(
    '.btn-add-product-select'
    );
   const imgProductSelect = document.querySelector('.img-product-select');
   const customerCart = document.querySelector('.customer-cart');
   const customerViewCart = document.querySelector('.customer-cart-view');
   const buttonCloseViewCustomer = document.querySelector('.close-view-cart');
   const formAddProduct = document.querySelector('.form-add-product');
   const idProductOrder = document.querySelector('.id-product-order');
   const amountsProductOrder = document.querySelector('.amounts-product-order');
   const pricesProductOrder = document.querySelector('.prices-product-order');
   const nameProductOrder = document.querySelector('.name-product-order');
   const totalPrices = document.querySelector('.total-prices');
   const btnCheckout = document.querySelector('.btn-checkout');
   const listProductAdded = document.querySelector('.list-product-added');
   const productAdded = parseFloat(
    document.querySelector('.amounts-product-added').textContent
    );

  /**
   * Change Position when window scroll
   */

   const orderHeader = document.querySelector('.order-header');
   window.addEventListener('scroll', function (e) {
    if (window.scrollY >= 60) {
      orderHeader.classList.add('changePosition');
    } else {
      orderHeader.classList.remove('changePosition');
    }
  });

  /**
   *  Show list order of customer form localstorage
   */

   var order = [];
   var amountsAdded = 0;
   if (JSON.parse(localStorage.getItem('orders')).length !== 0) {
    showListOrder(JSON.parse(localStorage.getItem('orders')));
    order = JSON.parse(localStorage.getItem('orders'));

    amountsAdded = JSON.parse(localStorage.getItem('orders'))[JSON.parse(localStorage.getItem('orders')).length - 1].amountsProductAdded;

    if (amountsAdded > 0) {
      amountsProductAdd.textContent = amountsAdded;
      customerCart.classList.add('active');
    }
  }

  /**
   *  Get Infor Product for add to Customer cart
   */

   var idProduct = '';
   var nameProduct = '';
   var imgProduct = '';
   var pricesProduct = 0;

   products.forEach((e, i) => {
    e.addEventListener('click', function () {
      idProduct = e.getAttribute('data-bs-whatever');
      nameProduct =
      document.getElementsByClassName('name-child-item')[i].textContent;
      imgProduct = document
      .getElementsByClassName('img-item')
      [i].getAttribute('src');
      pricesProduct = parseFloat(
        document.getElementsByClassName('prices')[i].textContent.substr(1)
        );

      nameProductSelect.textContent =
      document.getElementsByClassName('name-child-item')[i].textContent;
      desProductSelect.textContent =
      document.getElementsByClassName('des')[i].textContent;
      imgProductSelect.setAttribute(
        'src',
        document.getElementsByClassName('img-item')[i].getAttribute('src')
        );
      viewSelectProduct.style.display = 'flex';
    });
  });

   btnCloseViewSelect.onclick = () => {
    viewSelectProduct.style.display = 'none';
  };

  var currentAmount = 0;
  btnIncreaseAmounts.addEventListener('click', function () {
    currentAmount++;
    amountsProduct.textContent = `${currentAmount}`;
    buttonAddProductSelect.textContent = `Add to my order ${
      currentAmount * pricesProduct
    }$`;
  });

  btnDecreaseAmounts.addEventListener('click', function () {
    currentAmount--;
    if (currentAmount <= 0) {
      currentAmount = 0;
    }
    amountsProduct.textContent = `${currentAmount}`;
    buttonAddProductSelect.textContent = `Add to my order ${
      currentAmount * pricesProduct
    }$`;
  });

  // fix here

  buttonAddProductSelect.onclick = () => {
    const idSelect = idProduct;
    var exists = false;

    if (pricesProduct > 0) {
      order.forEach((e, i) => {
        if (e.idProductOrder === idSelect) {
          exists = true;
          var item = {
            idProductOrder: idProduct,
            nameProductOrder: nameProduct,
            imgProductOrder: imgProduct,
            amounts: order[i].amounts + currentAmount,
            prices: (order[i].amounts + currentAmount) * pricesProduct,
            amountsProductAdded: amountsAdded
          };
          order[i] = item;
          localStorage.setItem('orders', JSON.stringify(order));
          if (amountsAdded > 0) {
            amountsProductAdd.textContent = amountsAdded;
            customerCart.classList.add('active');
          }
        }
      });

      if (!exists) {
        amountsAdded++ ;
        var item = {
          idProductOrder: idProduct,
          nameProductOrder: nameProduct,
          imgProductOrder: imgProduct,
          amounts: currentAmount,
          prices: currentAmount * pricesProduct,
          amountsProductAdded: amountsAdded
        };
        order.push(item);
        localStorage.setItem('orders', JSON.stringify(order));
        if (amountsAdded > 0) {
          amountsProductAdd.textContent = amountsAdded;
          customerCart.classList.add('active');
        }
      }

      const orders = JSON.parse(localStorage.getItem('orders'));
      showListOrder(orders);
      viewSelectProduct.style.display = 'none';
      currentAmount = 0;
      amountsProduct.textContent = currentAmount;
      buttonAddProductSelect.textContent = 'Add to my order';
      customerRequest.textContent = '';
    }
  };

  customerCart.onclick = () => {
    customerViewCart.style.display = 'flex';
  };

  buttonCloseViewCustomer.onclick = () => {
    customerViewCart.style.display = 'none';
  };

  btnCheckout.onclick = () => {
    location.href = '/order/checkout';
  };

  function updatePrices() {
    var price = 0;
    const prices = document.querySelectorAll('.prices-product-add');
    prices.forEach((e, i) => {
      price += parseFloat(e.textContent.substr(1));
    });
    totalPrices.textContent = `$${price}`;
  }

  function showListOrder(orders) {
    var listItemProductElement = '';
    orders.forEach((e, i) => {
      listItemProductElement += `<div
      class='list-product-added-item w-100 bg-white d-flex align-items-center p-2'
      >
      <img
      src='${e.imgProductOrder}'
      alt=''
      class=''
      style='object-fit: cover; width: 30%; border-radius: 50%'
      />
      <div
      class='infor-product-added ms-3 d-flex align-items-center justify-content-between w-100'
      >
      <div class='d-flex flex-column justify-content-center'>
      <p class='name-product-added fs-4 mb-0'>${e.nameProductOrder}</p>
      <div
      class='edit-product-added d-flex align-items-center justify-content-left'
      >
      <ion-icon
      class='edit me-2 text-white mb-0 p-2 rounded bg-dark'
      style='cursor: pointer; width: 20px; height: 20px'
      name='create-outline'
      ></ion-icon>
      <ion-icon
      class='remove ms-2 text-white mb-0 p-2 rounded bg-dark'
      style='cursor: pointer; width: 20px; height: 20px'
      name='trash-outline'
      data-bs-whatever=${e.idProductOrder}
      ></ion-icon>
      </div>
      </div>
      <div class='prices-product-add fs-5'>$${e.prices}</div>
      </div>
      </div>`;
    });
    listProductAdded.innerHTML = listItemProductElement;
    updatePrices();
    removeOrder();
  }

  function deleteOrder(idDelete){
    showListOrder(order);
    const result = order.filter((e, i) => {
      return e.idProductOrder !== idDelete;
    });
    order = result;
    if (order.length !== 0) {
      order[order.length - 1].amountsProductAdded -= 1;
      localStorage.setItem('orders', JSON.stringify(order));
      showListOrder(order);
      amountsAdded = order[order.length - 1].amountsProductAdded;
    }else{
      localStorage.setItem('orders', JSON.stringify(order));
      showListOrder(order);
      amountsAdded = 0;
    }
    if (amountsAdded > 0) {
      amountsProductAdd.textContent = amountsAdded;
      customerCart.classList.add('active');
    }
  }
  var idDelete = '';
  function removeOrder() {
    const btnRemoveOrder = document.querySelectorAll('.remove');
    btnRemoveOrder.forEach((e, i) => {
      e.addEventListener('click', () => {
       idDelete = e.getAttribute('data-bs-whatever');
       deleteOrder(idDelete);
     })
    })
  }
  removeOrder();
});
