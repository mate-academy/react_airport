export const dayNumber = new Date().getDate();
export const month = new Date().getMonth() + 1;
export const fullYear = new Date().getFullYear();

const BASE_PATH = 'https://api.iev.aero/api/flights/';

export const PATH_TODAY = `${dayNumber}-${month}-${fullYear}`;

export const getData = () => fetch(`${BASE_PATH}${PATH_TODAY}`)
  .then(response => response.json())
  .catch(error => error);
