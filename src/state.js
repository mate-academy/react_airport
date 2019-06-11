async function loadData() {
  const flightsPromise = fetch('https://api.iev.aero/api/flights/13-06-2019');

  const flights = await flightsPromise.json();
  console.log(flights);
  return flights;
}

window.addEventListener('load', loadData);
