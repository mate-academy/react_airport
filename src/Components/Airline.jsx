import React from 'react';

export default function Airline(props) {
  return (
    <div className="airline">
      <img src={props.data.airline.en.logoSmallName} alt="small-logo" />
        {props.data.airline.en.name}
    </div>
  )
};