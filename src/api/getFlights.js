export const getFlights = async() => {
  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const res = await fetch(`https://api.iev.aero/api/flights/${d}-${m}-${y}`);

  return res.json();
};
