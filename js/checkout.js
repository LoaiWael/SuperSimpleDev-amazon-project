document.querySelector('.js-return-to-home-link').innerHTML = (JSON.parse(localStorage.getItem('cartQuantity')) || 0) + ' items';

const cart = JSON.parse(localStorage.getItem('cart')) || undefined;

if (cart) {
  let product;
  let totalCost = 0;
  let totalItems = 0;
  let cartDisplay = '';

  document.querySelectorAll('.delivery-option-input').forEach(input => {
    if (input.checked) {
      choosenDate = input.value;
    }
  });

  cart.forEach(cartItem => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === cartItem.ID) {
        product = products[i];
        totalCost += (product.priceCents / 100) * cartItem.quantity;
        totalItems += cartItem.quantity;
        break;
      }
    }
    let choosenDate;
    let deliveryOption = '';
    for (let option in shipping) {
      const isChecked = shipping[option].price === 0;
      if (isChecked) {
        choosenDate = shipping[option].date;
      }
      deliveryOption += `
              <div class="delivery-option">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${product.id}" value="${JSON.stringify(shipping[option].date).replace(/"/g, '&quot;')}">
                <div>
                  <div class="delivery-option-date">
                    ${shipping[option].date.dayName}, ${shipping[option].date.monthName} ${shipping[option].date.monthNum}
                  </div>
                  <div class="delivery-option-price">
                    ${shipping[option].price === 0 ? 'FREE Shipping' : '$' + shipping[option].price + ' - Shipping'}
                  </div>
                </div>
              </div>
      `;
    }
    cartDisplay += `
        <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: ${choosenDate.dayName}, ${choosenDate.monthName} ${choosenDate.monthNum}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOption}
            </div>
          </div>
        </div>
    `;
  });
  document.querySelector('.js-order-summary').innerHTML = cartDisplay;

  document.querySelectorAll('.delivery-option-input').forEach(input => {
    input.addEventListener('click', () => {
      choosenDate = JSON.parse(input.value);
      document.querySelector(`.delivery-date:has(.delivery-option input[name="delivery-option-${product.id}"])`).innerHTML = `
      Delivery date: ${choosenDate.dayName}, ${choosenDate.monthName} ${choosenDate.monthNum}
      `;
    });
  });

  document.querySelector('.js-payment-summary').innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${totalItems}):</div>
          <div class="payment-summary-money">$${totalCost.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$4.99</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$47.74</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$52.51</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
  `;
}
else {
  document.querySelector('.js-page-title').innerHTML = 'Cart is empty!';
}
