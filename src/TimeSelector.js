import React from 'react';
import './TimeSelector.scss';

export default ({ changeDate, dayOffset }) => {
  return (
    <div className="time-selectors">
      <a href="#" className={"time-selector__day" + (dayOffset === -1 ? " active" : "")} onClick={changeDate.bind(null, -1)}>Yesterday</a>
      <a href="#" className={"time-selector__day" + (dayOffset === 0 ? " active" : "")} onClick={changeDate.bind(null, 0)}>Today</a>
      <a href="#" className={"time-selector__day" + (dayOffset === 1 ? " active" : "")} onClick={changeDate.bind(null, 1)}>Tomorrow</a>
    </div>);
}
