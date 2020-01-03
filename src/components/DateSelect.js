import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import composeDate from '../helpers/composeDate';

const DateSelect = () => {
  const today = composeDate();
  const yesterday = composeDate(-1);
  const tomorrow = composeDate(1);

  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const setDate = (date) => {
    searchParams.set('date', date);
    history.push({ search: searchParams.toString() });
  };

  return (
    <select
      value={searchParams.get('date')}
      onChange={event => setDate(event.target.value)}
    >
      <option value={yesterday}>
        Yesterday
        {' '}
        {yesterday}
      </option>
      <option value={today}>
        Today
        {' '}
        {today}
      </option>
      <option value={tomorrow}>
        Tomorrow
        {' '}
        {tomorrow}
      </option>
    </select>
  );
};

export default DateSelect;
