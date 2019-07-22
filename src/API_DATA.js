const getFlights = async() => {
  const url = 'https://api.iev.aero/api/flights/13-06-2019';
  const response = await fetch(`${url}`);
  const flights = await response.json();

  return flights;
};

export default getFlights;
