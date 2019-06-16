import React from 'react';

export default function DepArrButtons(props) {
  return (
    <section className="buttons">
      <button
        type="button"
        className="active departure"
        data-tab="departures"
        onClick={props.changeTab}
      >
        DEPARTURES
      </button>
      <button
        type="button"
        className="arrive"
        data-tab="arrivals"
        onClick={props.changeTab}
      >
        ARRIVALS
      </button>
    </section>
  );
}
