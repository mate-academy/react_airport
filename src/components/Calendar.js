import React from 'react';

function Calendar(props) {
  return (
    <section className="calendar">
      <button
        type="submit"
        className={props.display === 'yesterday'? 'selected' : ''}
        onClick={() => props.getOnClick('yesterday', -1)}
      >
        <span className="showDate">{props.showYesterday}</span>
          yesterday
      </button>
      <button
        type="submit"
        className={props.display === 'today'? 'selected' : ''}
        onClick={() => props.getOnClick('today', 0)}
      >
        <span className="showDate">{props.showToday}</span>
          today
      </button>
      <button
        type="submit"
        className={props.display === 'tomorrow'? 'selected' : ''}
        onClick={()=>props.getOnClick('tomorrow', 1)}
      >
        <span className="showDate">{props.showTomorrow}</span>
          tomorrow
      </button>
    </section>
  );
}

export default Calendar;
