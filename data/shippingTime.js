export const today = new Date();
export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getFutureDateInfo(baseDate, offsetDays) {
  const futureDate = new Date(baseDate);
  futureDate.setDate(baseDate.getDate() + offsetDays);

  return {
    dayNum: futureDate.getDate(),
    dayName: dayNames[futureDate.getDay()],
    monthName: monthNames[futureDate.getMonth()],
    monthNum: futureDate.getMonth() + 1
  };
}

export const shipping = {
  after7Day: {
    date: getFutureDateInfo(today, 7),
    price: 9.99,
  },
  after10Day: {
    date: getFutureDateInfo(today, 10),
    price: 4.99
  },
  after14Day: {
    date: getFutureDateInfo(today, 14),
    price: 0
  }
};
