const conversions = {
  '1 Day Ago': 86400000,
  '2 Days Ago': 172800000,
  '3 Days Ago': 259200000,
  '4 Days Ago': 345600000,
  '5 Days Ago': 432000000,
  '6 Days Ago': 518400000,
  '1 Week Ago': 604800000,
  '2 Weeks Ago': 1209600000,
  '3 Weeks Ago': 1814400000,
  '4 Weeks Ago': 2419200000,
  '1 Month Ago': 2678400000,
  '2 Months Ago': 5356800000,
  '3 Months Ago': 8035200000,
  '4 Months Ago': 10713600000,
  '5 Months Ago': 13392000000,
  '6 Months Ago': 16070400000,
  '7 Months Ago': 18748800000,
  '8 Months Ago': 21427200000,
  '9 Months Ago': 24105600000,
  '10 Months Ago': 26784000000,
  '11 Months Ago': 29462400000,
  '1 Year Ago': 32140800000,
  '2 Years Ago': 32140800000,
};

export const getDateString = (date: string) => {
  const dateObj = new Date(date);

  const difference = dateObj.getTime() - Date.now();
  for (let [key, value] of Object.entries(conversions)) {
    if (difference <= value) {
      return key;
    }
  }

  return 'Long Ago';
};
