import React from 'react';
import PropTypes from 'prop-types';

const ButoonContainer = ({ toggleTab, isDepartures }) => (
  <div className="button-container">
    <button
      type="button"
      name="departures"
      onClick={toggleTab}
      className={isDepartures ? 'button button--active' : 'button'}
    >
        departures
    </button>

    <button
      type="button"
      name="arrivals"
      onClick={toggleTab}
      className={isDepartures ? 'button' : 'button button--active'}
    >
        arrivals
    </button>
  </div>
);

ButoonContainer.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  isDepartures: PropTypes.bool.isRequired,
};

export default ButoonContainer;
