import React from 'react';
// eslint-disable-next-line
const DatePanel = ({ history, location }) => {
  const formatDay = (day) => {
    const today = new Date();
    const tomorrow = new Date(today);
    const yesterday = new Date(today);

    switch (day) {
      case 'yesterday':
        yesterday.setDate(today.getDate() - 1);

        // eslint-disable-next-line max-len
        return `${yesterday.getDate()}-${yesterday.getMonth() + 1}-${yesterday.getFullYear()}`;
      case 'tomorrow':
        tomorrow.setDate(today.getDate() + 1);

        // eslint-disable-next-line max-len
        return `${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()}`;
      default:
        // eslint-disable-next-line max-len
        return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    }
  };

  const search = new URLSearchParams(location.search);

  const setDate = (value) => {
    search.set('date', value);
    history.push({ search: search.toString() });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setDate(formatDay('yesterday'))}
      >
        Yesterday
      </button>
      <button
        type="button"
        onClick={() => setDate(formatDay('today'))}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => setDate(formatDay('tomorrow'))}
      >
        Tomorrow
      </button>
    </>
  );
};

export default DatePanel;
