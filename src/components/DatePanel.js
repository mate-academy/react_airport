/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DatePanel = ({ location, history }) => {
  const [isDayActiveButton, setActiveButton] = useState('today');
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();

  const search = new URLSearchParams(location.search);
  const setDate = (value) => {
    search.set('date', `${value}-${m}-${y}`);
    history.push({ search: search.toString() });
  };

  return (
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      <label
        className={
          isDayActiveButton === 'yesterday'
            ? 'btn btn-secondary active'
            : 'btn btn-secondary'
        }
      >
        <input
          type="radio"
          name="options"
          id="option1"
          checked
          onClick={() => {
            setDate(new Date().getDate() - 1);
            setActiveButton('yesterday');
          }}
        />
        Yesterday
      </label>
      <label
        className={
          isDayActiveButton === 'today'
            ? 'btn btn-secondary active'
            : 'btn btn-secondary'
        }
      >
        <input
          type="radio"
          name="options"
          id="option2"
          onClick={() => {
            setDate(new Date().getDate());
            setActiveButton('today');
          }}
        />
        Today
      </label>
      <label
        className={
          isDayActiveButton === 'tomorrow'
            ? 'btn btn-secondary active'
            : 'btn btn-secondary'
        }
      >
        <input
          type="radio"
          name="options"
          id="option3"
          onClick={() => {
            setDate(new Date().getDate() + 1);
            setActiveButton('tomorrow');
          }}
        />
        Tomorrow
      </label>
    </div>
  );
};

DatePanel.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default DatePanel;
