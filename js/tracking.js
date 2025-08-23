import { cartOBJ } from '../data/cart.js';
import { loadProducts } from '../data/products.js';

document.querySelector('.js-cart-quantity').innerHTML = cartOBJ.getCartQuantity();

const currentURLObj = new URL(window.location.href);
const trackingProduct = JSON.parse(currentURLObj.searchParams.get('product'));
const productArrivalDate = JSON.parse(currentURLObj.searchParams.get('arrivalDate'));

loadProducts().then(products => {
  for (let product of products) {
    if (product.id === trackingProduct.id) {
      document.querySelector('.js-delivery-date').innerHTML = ` Arriving on ${productArrivalDate.dayName}, ${productArrivalDate.month} ${productArrivalDate.dayNum}`;
      document.querySelector('.js-product-info-name').innerHTML = product.name;
      document.querySelector('.js-product-info-quantity').innerHTML = `Quantity: ${trackingProduct.quantity}`;
      document.querySelector('.js-product-image').src = product.image;

      const today = new Date();

      const deliverPercentage = (today.getDate() / productArrivalDate.dayNum) * 100;
      document.querySelector('.js-progress-bar').style.width = `${deliverPercentage}%`;

      const progressLabel = document.querySelectorAll('.js-progress-label');
      progressLabel.forEach(label => {
        label.classList.remove('current-status');
      });

      let index = (deliverPercentage === 100) ? 2 : (deliverPercentage >= 50 ? 1 : 0);
      progressLabel[index].classList.add('current-status');
      break;
    }
  }
})