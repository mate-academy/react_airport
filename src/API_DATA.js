const date = new Date();
// eslint-disable-next-line max-len
const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

const getFlights = async() => {
  const url = `https://api.iev.aero/api/flights/${currentDate}`;
  const response = await fetch(`${url}`);
  const flights = await response.json();

  return flights;
};

export default getFlights;
