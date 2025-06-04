class Cart {
  #cartKey;
  cart;
  #cartQuantity;

  constructor(cartKey) {
    this.#cartKey = cartKey;
    this.cart = JSON.parse(localStorage.getItem(this.#cartKey)) || [];
    this.#cartQuantity = JSON.parse(localStorage.getItem(`${this.#cartKey}-cartQuantity`)) || 0;
  }

  getCartQuantity() {
    return this.#cartQuantity;
  }

  addCartItem(id, quantity) {
    if (this.cart.length == 0) {
      this.cart.push({
        id,
        quantity
      });
    }
    else {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === id) {
          this.cart[i].quantity += quantity;
          break;
        }
        else if (i === this.cart.length - 1 && this.cart[i].id !== id) {
          this.cart.push({
            id,
            quantity
          });
          break;
        }
      };
    }
    this.#cartQuantity += quantity;
    localStorage.setItem(this.#cartKey, JSON.stringify(this.cart));
    localStorage.setItem(`${this.#cartKey}-cartQuantity`, this.#cartQuantity);
  }

  removeCartItem(id, quantity) {
    for (let item in this.cart) {
      if (id === this.cart[item].id) {
        if (this.cart[item].quantity !== 1) {
          this.cart[item].quantity -= quantity;
          this.#cartQuantity -= quantity;
          localStorage.setItem(`${this.#cartKey}-cartQuantity`, this.#cartQuantity);
          localStorage.setItem(this.#cartKey, JSON.stringify(this.cart));
        }
        else if (this.cart.length !== 0 && this.cart[item].quantity === 1) {
          this.cart.splice(item, quantity);
          this.#cartQuantity -= quantity;
          localStorage.setItem(`${this.#cartKey}-cartQuantity`, this.#cartQuantity);
          localStorage.setItem(this.#cartKey, JSON.stringify(this.cart));
        }
        else if (this.cart.length === 0) {
          localStorage.removeItem(this.#cartKey);
          localStorage.removeItem(`${this.#cartKey}-cartQuantity`);
        }
        break;
      }
    }
  }

  deleteCart() {
    localStorage.removeItem(this.#cartKey);
    localStorage.removeItem(`${this.#cartKey}-cartQuantity`);
  }
}

export const cartOBJ = new Cart('cart');