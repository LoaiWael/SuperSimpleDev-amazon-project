const orders = JSON.parse(localStorage.getItem('orders'));
const cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

if (orders) {

  orders.forEach(order => {
    let orderdProducts = [];

    for (let i = 0; i < order.products.length; i++) {

      for (let j = 0; j < products.length; j++) {

        if (products[j].id === order.products[i].ID) {

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
              Arriving on: ${product.shippingDate.month} ${product.shippingDate.day}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `;
    });

    document.querySelector('.js-orders-grid').insertAdjacentHTML('afterbegin', `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.date.month} ${order.date.day}</div>
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
}