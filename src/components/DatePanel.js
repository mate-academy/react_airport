import React from 'react';
import PropTypes from 'prop-types';

const DatePanel = ({ location, history }) => {
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const search = new URLSearchParams(location.search);
  const setDate = (value) => {
    search.set('date', `${value}-${m}-${y}`);
    history.push({ search: search.toString() });
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setDate(new Date().getDate() - 1)}
      >
        Yesterday
      </button>

      <button
        type="button"
        onClick={() => setDate(new Date().getDate())}
      >
        Today
      </button>

      <button
        type="button"
        onClick={() => setDate(new Date().getDate() + 1)}
      >
        Tomorrow
      </button>
    </div>
  );
};

DatePanel.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default DatePanel;
