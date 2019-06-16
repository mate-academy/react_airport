import React from 'react';

export default function Dates(props) {
  return (
    <div className="dates">
      <div className="day" onClick={(event) => {
        document.querySelector('.day.active').classList.remove('active');
        event.target.classList.add('active');
        props.dateForLink(-1)}
        }
      >
        <div className="date">
        {props.datesForTable(-1)}
        </div>
        YESTERDAY
      </div>
      <div className="day active" onClick={(event) => {
        document.querySelector('.day.active').classList.remove('active');
        event.target.classList.add('active');
        props.dateForLink()}
        }
      >
        <div className="date">
          {props.datesForTable()}
        </div>
        TODAY
      </div>
      <div className="day" onClick={(event) => {
        document.querySelector('.day.active').classList.remove('active');
        event.target.classList.add('active');
        props.dateForLink(1)}
        }
      >
        <div className="date">
          {props.datesForTable(1)}
        </div>
        TOMORROW
      </div>
    </div>
  );
}
