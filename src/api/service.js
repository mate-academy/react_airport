const date = '04-01-2020';

export const getFlights = async() => {
  const result = await fetch(`https://api.iev.aero/api/flights/${date}`);
  const data = await result.json();

  return data;
};
