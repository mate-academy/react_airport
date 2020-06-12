import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlightsAll, loadFlights } from './store';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { departure, arrival } = useSelector(getFlightsAll);

  useEffect(() => {
    dispatch(loadFlights());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(departure, arrival);
  }, [departure, arrival]);

  return (
    <div className="App">
      <h1>React airport</h1>
    </div>
  );
};

export default App;
