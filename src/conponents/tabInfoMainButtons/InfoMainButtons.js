import React from 'react';
import { Link } from 'react-router-dom';

const InfoMainButton = (props) => {
  const { changeToDefaultDate, activeButton } = props;

  return (
    <div className="info-tab-button">
      <Link to="/departures">
        <button
          className={`${activeButton === 'departure' ? 'active-button' : ''} infotable-main-buttons`}
          onClick={() => changeToDefaultDate('departure')}
        >
          DEPARTURES
        </button>
      </Link>
      <Link to="/arrivals">
        <button
          className={`${activeButton === 'arrivals' ? 'active-button' : ''} infotable-main-buttons`}
          onClick={() => changeToDefaultDate('arrivals')}
        >
          ARRIVALS
        </button>
      </Link>
    </div>
  )
}

export default InfoMainButton;
