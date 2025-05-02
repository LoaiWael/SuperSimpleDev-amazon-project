const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = [
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

const shipping = {
  after3Day: {
    date: getFutureDateInfo(today, 3),
    price: 9.99,
  },
  after6Day: {
    date: getFutureDateInfo(today, 6),
    price: 4.99
  },
  after10Day: {
    date: getFutureDateInfo(today, 10),
    price: 0
  }
};
