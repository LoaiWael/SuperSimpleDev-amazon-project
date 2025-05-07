export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

export function addCartItem(id, quantity) {
  if (cart.length == 0) {
    cart.push({
      id,
      quantity
    });
  }
  else {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity += quantity;
        break;
      }
      else if (i === cart.length - 1 && cart[i].id !== id) {
        cart.push({
          id,
          quantity
        });
        break;
      }
    };
  }
  cartQuantity += quantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQuantity', cartQuantity);
}

export function removeCartItem(id, quantity) {
  for (let item in cart) {
    if (id === cart[item].id) {
      if (cart[item].quantity !== 1) {
        cart[item].quantity -= quantity;
        cartQuantity -= quantity;
        localStorage.setItem('cartQuantity', cartQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      else if (cart.length !== 0 && cart[item].quantity === 1) {
        cart.splice(item, quantity);
        cartQuantity -= quantity;
        localStorage.setItem('cartQuantity', cartQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      else if (cart.length === 0) {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartQuantity');
      }
      break;
    }
  }
}