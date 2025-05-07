export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function placeOrder(orderDate, price, products = [], shippingDates) {
  orders.push({
    id: crypto.getRandomValues(new Uint8Array(16)).reduce((id, byte) => id + byte.toString(16).padStart(2, '0'), ''),
    orderDate,
    price,
    products,
    shippingDates
  });

  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  localStorage.removeItem('cartQuantity');
}