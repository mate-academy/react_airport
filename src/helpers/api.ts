const API_URL = 'https://api.iev.aero/api/flights/';

const getData = <T>(day: string): Promise<T[]> => {
  return fetch(`${API_URL}${day}`)
    .then(response => response.json());
};

const today = new Date()
  .toISOString().split('T')[0]
  .split('-').reverse().join('-');

export const getFlights = () => getData<IFlights>(today)
  .then(({ body }: any) => body);
