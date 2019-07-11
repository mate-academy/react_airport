const getData = async() => {
  const currentDate = new Date()
    .toLocaleDateString('ru-RU')
    .replace(/\./g, '-');
  const url = `https://api.iev.aero/api/flights/${currentDate}`;
  const dataPromise = await fetch(url);
  const fetchedData = await dataPromise.json();

  return fetchedData.body;
};

export default getData;
