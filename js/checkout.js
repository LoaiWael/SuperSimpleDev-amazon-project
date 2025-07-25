import { shippingDateOBJ, shippingOptions } from "../data/shippingTime.js";
import { products, loadProducts } from "../data/products.js";
import { cartOBJ } from '../data/cart.js';
import { Order } from "../data/orders.js";

document.querySelector('.js-return-to-home-link').innerHTML = cartOBJ.getCartQuantity() + ' items';

loadProducts(() => {
  if (cartOBJ.cart && cartOBJ.cart.length !== 0) {
    let product;
    let totalCost = 0;
    let totalItems = 0;
    let cartDisplay = '';
    const productsShippingDate = {};

    document.querySelectorAll('.delivery-option-input').forEach(input => {
      if (input.checked) {
        choosenDate = input.value;
      }
    });

    cartOBJ.cart.forEach(cartItem => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === cartItem.id) {
          product = products[i];
          totalCost += (product.priceCents / 100) * cartItem.quantity;
          totalItems += cartItem.quantity;
          break;
        }
      }
      let choosenDate;
      let deliveryOption = '';

      for (let option in shippingOptions) {
        const isChecked = shippingOptions[option].price === 0;
        if (isChecked) {
          choosenDate = shippingOptions[option].date;
          productsShippingDate[product.id] = {
            month: shippingOptions[option].date.monthName,
            dayNum: shippingOptions[option].date.dayNum,
            dayName: shippingOptions[option].date.dayName,
          };
        }
        deliveryOption += `
              <div class="delivery-option">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${product.id}" value="${JSON.stringify(shippingOptions[option]).replace(/"/g, '&quot;')}" data-product-id="${product.id}">
                <div>
                  <div class="delivery-option-date">
                    ${shippingOptions[option].date.dayName}, ${shippingOptions[option].date.monthName} ${shippingOptions[option].date.dayNum}
                  </div>
                  <div class="delivery-option-price">
                    ${shippingOptions[option].price === 0 ? 'FREE Shipping' : '$' + shippingOptions[option].price + ' - Shipping'}
                  </div>
                </div>
              </div>
      `;
      }

      cartDisplay += `
        <div class="cart-item-container">
          <div class="delivery-date js-delivery-date" data-product-id="${product.id}">
            Delivery date: ${choosenDate.dayName}, ${choosenDate.monthName} ${choosenDate.dayNum}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-price js-product-price" data-product-id="${product.id}">
                $${(product.priceCents / 100).toFixed(2)}
              </div>
              <div class="product-quantity js-product-quantity" data-product-id="${product.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label" data-product-id="${product.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${product.id}" data-product-price="${product.priceCents / 100}">
                  Update
                </span>
                <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${product.id}" data-product-price="${product.priceCents / 100}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options js-delivery-options" data-product-id="${product.id}">
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

    document.querySelector('.js-payment-summary').innerHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div class="js-items-count">Items (0):</div>
          <div class="payment-summary-money js-total-items-cost">$0</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-shipping-money">$0</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money js-total-before-tax">$0</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money js-estimated-tax">$4.77</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-total-money">$52.51</div>
        </div>

        <button class="place-order-button js-place-order-button button-primary">
          Place your order
        </button>
  `;

    document.querySelectorAll('.js-update-quantity-link').forEach(link => {
      link.addEventListener('click', () => {
        for (let cartItem of cartOBJ.cart) {
          if (link.dataset.productId === cartItem.id) {
            totalItems++;
            totalCost += Number(link.dataset.productPrice);
            cartOBJ.addCartItem(link.dataset.productId, 1);
            document.querySelector(`.js-quantity-label[data-product-id="${link.dataset.productId}"]`).innerHTML = cartItem.quantity;
            document.querySelector('.js-return-to-home-link').innerHTML = cartOBJ.getCartQuantity() + ' items';
            generatePayment();
            break;
          }
        }
      });
    });

    document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
      link.addEventListener('click', () => {
        for (let item in cartOBJ.cart) {
          if (link.dataset.productId === cartOBJ.cart[item].id) {
            if (cartOBJ.cart[item].quantity !== 1) {
              cartOBJ.removeCartItem(link.dataset.productId, 1)
              totalItems--;
              totalCost -= Math.abs(Number(link.dataset.productPrice));
              document.querySelector(`.js-quantity-label[data-product-id="${link.dataset.productId}"]`).innerHTML = cartOBJ.cart[item].quantity;
              document.querySelector('.js-return-to-home-link').innerHTML = cartOBJ.getCartQuantity() + ' items';
            }
            else if (cartOBJ.cart.length !== 0 && cartOBJ.cart[item].quantity === 1) {
              if (cartOBJ.cart.length === 1) {
                document.querySelector('.js-place-order-button').style.pointerEvents = 'none';
                document.querySelector('.js-place-order-button').style.opacity = '0.45';
              }
              cartOBJ.removeCartItem(link.dataset.productId, 1);
              totalItems--;
              totalCost -= Math.abs(Number(link.dataset.productPrice));
              document.querySelector('.js-return-to-home-link').innerHTML = cartOBJ.getCartQuantity() + ' items';
              delete productsShippingDate[link.dataset.productId];
              document.querySelector(`.js-product-price[data-product-id="${link.dataset.productId}"]`).innerHTML = 'Removed';
              document.querySelector(`.js-product-quantity[data-product-id="${link.dataset.productId}"]`).remove();
              document.querySelector(`.js-delivery-options[data-product-id="${link.dataset.productId}"]`).remove();
            }
            else if (cart.length === 0) {
              cartOBJ.removeCartItem(link.dataset.productId, 1);
            }
            break;
          }
        }
        generatePayment();
      });
    });

    let tax = totalCost * 10 / 100;
    function generatePayment() {
      tax = Math.abs(totalCost * 10 / 100);
      document.querySelector('.js-items-count').innerHTML = `Items (${totalItems}):`;
      document.querySelector('.js-total-items-cost').innerHTML = `$${Math.abs(totalCost).toFixed(2)}`;
      document.querySelector('.js-shipping-money').innerHTML = `$${totalShipping}`;
      document.querySelector('.js-total-before-tax').innerHTML = `$${(Math.abs(totalShipping + totalCost)).toFixed(2)}`;
      document.querySelector('.js-estimated-tax').innerHTML = `$${tax.toFixed(2)}`;
      document.querySelector('.js-total-money').innerHTML = `$${Math.abs((totalShipping + totalCost + tax)).toFixed(2)}`;
    }

    document.querySelector('.js-total-before-tax').innerHTML = `$${totalCost.toFixed(2)}`;
    document.querySelector('.js-total-money').innerHTML = `$${(totalCost + tax).toFixed(2)}`;

    const shippingPrices = {};
    let totalShipping = 0;

    generatePayment();
    document.querySelectorAll('.delivery-option-input').forEach(input => {

      input.addEventListener('click', () => {
        let inputOBJ = JSON.parse(input.value);

        const productDeliveryHeader = document.querySelectorAll('.js-delivery-date');

        for (let header of productDeliveryHeader) {
          if (header.dataset.productId === input.dataset.productId) {
            header.innerHTML = `Delivery date: ${inputOBJ.date.dayName}, ${inputOBJ.date.monthName} ${inputOBJ.date.dayNum}`;
            break;
          }
        }

        shippingPrices[input.dataset.productId] = inputOBJ.price;
        productsShippingDate[input.dataset.productId] = {
          month: inputOBJ.date.monthName,
          dayNum: inputOBJ.date.dayNum,
          dayName: inputOBJ.date.dayName,
        };
        totalShipping = Object.values(shippingPrices).reduce((sum, value) => sum + value, 0);
        generatePayment();
      });
    });

    document.querySelector('.js-place-order-button').addEventListener('click', () => {

      const order = new Order({
        dayNum: shippingDateOBJ.getToday().getDate(),
        month: shippingDateOBJ.getMonthNames()[shippingDateOBJ.getToday().getMonth()]
      }, (totalShipping + totalCost + tax).toFixed(2), [...cartOBJ.cart], productsShippingDate);

      document.querySelector('.js-payment-summary').insertAdjacentHTML('beforeend', '<p>Order placed <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg></p>');

      document.querySelector('.js-place-order-button').style.pointerEvents = 'none';
      document.querySelector('.js-place-order-button').style.opacity = '0.45';

      setTimeout(() => {
        window.location.href = './orders.html'
      }, 1500);
    });
  }
  else {
    document.querySelector('.js-page-title').innerHTML = 'Cart is empty!';
  }
});