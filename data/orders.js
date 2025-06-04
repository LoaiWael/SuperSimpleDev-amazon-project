import { cartOBJ } from './cart.js';
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export class Order {
  #id;
  #orderDate;
  #price;
  #products;
  #shippingDates;

  constructor(orderDate, price, products = [], shippingDates) {
    this.#id = crypto.getRandomValues(new Uint8Array(16)).reduce((id, byte) => id + byte.toString(16).padStart(2, '0'), '');
    this.#orderDate = orderDate;
    this.#price = price;
    this.#products = products;
    this.#shippingDates = shippingDates;

    orders.push(this.getOrderData());
    localStorage.setItem('orders', JSON.stringify(orders));
    cartOBJ.deleteCart();
  }

  getOrderData() {
    return {
      id: this.#id,
      orderDate: this.#orderDate,
      price: this.#price,
      products: this.#products,
      shippingDates: this.#shippingDates
    };
  }
}