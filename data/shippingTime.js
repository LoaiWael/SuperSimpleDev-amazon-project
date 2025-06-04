class ShippingDate {
  #today = new Date();
  #dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  #monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  getToday() {
    return this.#today;
  }
  getDayNames() {
    return this.#dayNames;
  }
  getMonthNames() {
    return this.#monthNames;
  }

  #getFutureDateInfo(baseDate, offsetDays) {
    const futureDate = new Date(baseDate);
    futureDate.setDate(baseDate.getDate() + offsetDays);

    return {
      dayNum: futureDate.getDate(),
      dayName: this.#dayNames[futureDate.getDay()],
      monthName: this.#monthNames[futureDate.getMonth()],
      monthNum: futureDate.getMonth() + 1
    };
  }

  setShippingDate(preparingDays, price) {
    return {
      date: this.#getFutureDateInfo(this.#today, preparingDays),
      price: Number(price.toFixed(2)),
    }
  }
}

export const shippingDateOBJ = new ShippingDate();
const after7Day = shippingDateOBJ.setShippingDate(7, 9.99);
const after10Day = shippingDateOBJ.setShippingDate(10, 4.99);
const after14Day = shippingDateOBJ.setShippingDate(14, 0);

export const shippingOptions = {
  after7Day,
  after10Day,
  after14Day
};
