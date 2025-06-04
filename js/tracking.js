import { cartOBJ } from '../data/cart.js';

document.querySelector('.js-cart-quantity').innerHTML = cartOBJ.getCartQuantity();

const trackingProduct = JSON.parse(localStorage.getItem('tracking'));

document.querySelector('.js-delivery-date').innerHTML = ` Arriving on ${trackingProduct.shippingDate.dayName}, ${trackingProduct.shippingDate.month} ${trackingProduct.shippingDate.dayNum}`;
document.querySelector('.js-product-info-name').innerHTML = trackingProduct.name;
document.querySelector('.js-product-info-quantity').innerHTML = `Quantity: ${trackingProduct.quantity}`;
document.querySelector('.js-product-image').src = trackingProduct.image;

const today = new Date();

const deliverPercentage = (today.getDate() / trackingProduct.shippingDate.dayNum) * 100;
document.querySelector('.js-progress-bar').style.width = `${deliverPercentage}%`;

const progressLabel = document.querySelectorAll('.js-progress-label');
progressLabel.forEach(label => {
  label.classList.remove('current-status');
});

let index = (deliverPercentage === 100) ? 2 : (deliverPercentage >= 50 ? 1 : 0);
progressLabel[index].classList.add('current-status');