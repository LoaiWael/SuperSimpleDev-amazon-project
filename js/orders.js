import './../data/products.js';
import { Order, orders } from '../data/orders.js';
import { cartOBJ } from '../data/cart.js';

document.querySelector('.js-cart-quantity').innerHTML = cartOBJ.getCartQuantity();

if (orders) {

  orders.forEach(order => {
    let orderdProducts = [];

    for (let i = 0; i < order.products.length; i++) {

      for (let j = 0; j < products.length; j++) {

        if (products[j].id === order.products[i].id) {

          orderdProducts.push({
            id: products[j].id,
            name: products[j].name,
            image: products[j].image,
            quantity: order.products[i].quantity,
            shippingDate: order.shippingDates[products[j].id]
          });
        }
      }
    }

    let productsHTML = '';
    orderdProducts.forEach(product => {
      productsHTML += `
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${product.shippingDate.month} ${product.shippingDate.dayNum}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${product.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message js-buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
              <button class="track-package-button button-secondary" data-product-obj="${JSON.stringify(product).replace(/"/g, '&quot;')}">
                Track package
              </button>
          </div>
      `;
    });

    document.querySelector('.js-orders-grid').insertAdjacentHTML('afterbegin', `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderDate.month} ${order.orderDate.dayNum}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.price}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
      `);
  });

  document.querySelectorAll('.js-buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      addCartItem(button.dataset.productId, 1);

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      const lastInner = button.innerHTML;
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16"><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/></svg> Added';
      setTimeout(() => {
        button.innerHTML = lastInner;
      }, 2300);
    });
  });

  document.querySelectorAll('.track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.setItem('tracking', button.dataset.productObj);
      window.location.href = './tracking.html';
    });
  });
}
else {
  document.querySelector('.js-page-title').innerHTML = 'No orders yet.'
}