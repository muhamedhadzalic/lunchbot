const dani = {
  1: 'Ponedjeljak',
  2: 'Utorak',
  3: 'Srijeda',
  4: 'Četvrtak',
  5: 'Petak'
};

function getTargetDate() {
  const today = new Date();
  const day = today.getDay();
  const targetDate = new Date(today);

  if (day === 5) {
    targetDate.setDate(today.getDate() + 3);
  } else {
    targetDate.setDate(today.getDate() + 1);
  }

  return targetDate;
}

function getDayName(date) {
  return dani[date.getDay()];
}

module.exports = { getTargetDate, getDayName };