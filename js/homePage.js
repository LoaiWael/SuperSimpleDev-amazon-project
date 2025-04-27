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
let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.js-add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    const numOfItems = Number(document.querySelector(`select[data-product-id="${button.dataset.productId}"]`).value);

    if (cart.length == 0) {
      cart.push({
        ID: button.dataset.productId,
        quantity: numOfItems
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].ID === button.dataset.productId) {
          cart[i].quantity += numOfItems;
          localStorage.setItem('cart', JSON.stringify(cart));
          break;
        }
        else if (i === cart.length - 1 && cart[i].ID !== button.dataset.productId) {
          cart.push({
            ID: button.dataset.productId,
            quantity: numOfItems
          });
          localStorage.setItem('cart', JSON.stringify(cart));
          break;
        }
      };
    }
    cartQuantity += numOfItems;
    localStorage.setItem('cartQuantity', cartQuantity);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;



    const addedMark = document.querySelector(`.js-added-to-cart[data-product-id="${button.dataset.productId}"]`);
    addedMark.style.opacity = 'unset'
    setTimeout(() => {
      addedMark.style.opacity = '0'
    }, 2000);
  });
});