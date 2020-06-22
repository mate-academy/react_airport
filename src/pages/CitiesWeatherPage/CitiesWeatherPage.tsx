import React from 'react';
import { CityList } from './../../components/CityList';
import { Search } from './../../components/Search';


export const CitiesWeatherPage = () => {
  return(
    <>
      <Search />
      <h1 className="app__title">
        Weather
      </h1>
      <CityList />
    </>
  )
}
