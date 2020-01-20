const localHistory = (location) => {
  const search = new URLSearchParams(location.search);
  let date = search.get('date');

  date = date === null
    ? new Date().getDate()
    : date.slice(0, date.indexOf('-'));

  return date;
};

export default localHistory;
