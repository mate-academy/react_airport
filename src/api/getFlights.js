const URL = 'https://api.iev.aero/api/flights/';

export default date => fetch(URL + date)
  .then(response => response.json());
