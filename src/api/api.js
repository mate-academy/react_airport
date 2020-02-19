const date = new Date();
const today = `${date.getDate()}-${(date.getMonth()
  + 1)}-${date.getFullYear()}`;

export const airlines = async() => {
  const getAirlines = await fetch(`https://api.iev.aero/api/flights/${today}`);

  return getAirlines.json();
};
