export default (n = 0) => {
  const date = new Date();

  date.setDate(date.getDate() + n);

  let dd = date.getDate().toString();

  if (dd.length === 1) {
    dd = `0${dd}`;
  }

  let mm = (date.getMonth() + 1).toString();

  if (mm.length === 1) {
    mm = `0${mm}`;
  }

  return `${dd}-${mm}-${date.getFullYear()}`;
};
