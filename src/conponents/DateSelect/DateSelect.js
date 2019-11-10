import React from 'react';

const DateSelect = (props) => {
  const { setCurrentDay, currentDay } = props;

  const activeButton = () => {
    switch(currentDay) {
      case new Date().getDate() - 1:
        return 'yesterday';
      case new Date().getDate() + 1:
        return 'tomorrow';
      default:
        return 'today';
    };
  }


  return (
    <div className="select-date">
      <button
        onClick={() => setCurrentDay(new Date().getDate() - 1)}
        className={activeButton() === 'yesterday' ? 'active-button' : ''}
      >
        Yesterday
      </button>
      <button
        onClick={() => setCurrentDay(new Date().getDate())}
        className={activeButton() === 'today' ? 'active-button' : ''}
      >
        Today
      </button>
      <button
        onClick={() => setCurrentDay(new Date().getDate() + 1)}
        className={activeButton() === 'tomorrow' ? 'active-button' : ''}
      >
        Tomorrow
      </button>
    </div>
  )
}

export default DateSelect;
