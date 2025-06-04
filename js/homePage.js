import '../data/products.js'
import { cartOBJ } from '../data/cart.js';

let productsGenerator = '';
products.forEach(product => {
  productsGenerator += `
        <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select data-product-id="${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div data-product-id="${product.id}" class="added-to-cart js-added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button data-product-id="${product.id}" class="add-to-cart-button button-primary js-add-to-cart-button">
          Add to Cart
        </button>
      </div>
`;
});
document.querySelector('.js-products-grid').innerHTML = productsGenerator;
document.querySelector('.js-cart-quantity').innerHTML = cartOBJ.getCartQuantity();

document.querySelectorAll('.js-add-to-cart-button').forEach(button => {
  let eventId;
  button.addEventListener('click', () => {
    clearTimeout(eventId);
    const numOfItems = Number(document.querySelector(`select[data-product-id="${button.dataset.productId}"]`).value);

    cartOBJ.addCartItem(button.dataset.productId, numOfItems);

    document.querySelector('.js-cart-quantity').innerHTML = cartOBJ.getCartQuantity();

    const addedMark = document.querySelector(`.js-added-to-cart[data-product-id="${button.dataset.productId}"]`);
    addedMark.style.opacity = 'unset'
    eventId = setTimeout(() => {
      addedMark.style.opacity = '0'
    }, 2000);
  });
});