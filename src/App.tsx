import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCitiesId, getCitiesWeather } from './store';
import { loadData } from './store';
import { Switch, Route, useLocation } from 'react-router-dom';
import { CitiesWeatherPage, DetailsPage } from './pages';
import './App.scss';

const App = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const citiesWeather = useSelector(getCitiesWeather);
  const citiesId = useSelector(getCitiesId);

  useEffect(() => {
    const savedCitiesId = citiesWeather.map(cityWeather => cityWeather.id);
    const savedValue = savedCitiesId.length ? savedCitiesId : null;
    localStorage.setItem('citiesId', JSON.stringify(savedValue));

  }, [citiesId, citiesWeather])

  useEffect(() => {
    dispatch(loadData(citiesId));
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return(
    <div className="app">
      <main className="main">
        <Switch>
          <Route
            path='/:cityId'
            exact>
            <DetailsPage />
          </Route>
          <Route path='/' component={CitiesWeatherPage}/>
        </Switch>
      </main>
    </div>
  )
}

export default App;

