import React from 'react';
import PropTypes from 'prop-types';
import { FLIGHT_TYPES } from '../constants';
import './flightButtons.css'

export default function FlightsButtons(props) {
  const { DEPARTURE, ARRIVAL } = FLIGHT_TYPES;
  const { toggler, currRender } = props;

  return (
    <div className="flights-buttons">
      <button
        className={currRender === DEPARTURE 
          ? "flights-buttons__departure active" : "flights-buttons__departure"}
        onClick={(e) => {
          e.preventDefault();
          toggler(DEPARTURE);
        }}
        type='button'
      >
        departure
      </button>
      <button
        className={currRender === ARRIVAL
          ? "flights-buttons__arrival active" : "flights-buttons__arrival"}
        onClick={(e) => {
          e.preventDefault();
          toggler(ARRIVAL);
        }}
        type='button'
      >
        arrival
      </button>
    </div>
  );
};

FlightsButtons.propTypes = {
  toggler: PropTypes.func,
  currRender: PropTypes.string,
}