import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import { fetchCityWeather, fetcWeatherDetails } from '../helpers/api'
import loadingReducer, { startLoading, finishLoading, setLoaded } from './loading';
import errorReducer, { setErrorMessage } from './error';
import citiesReducer from './cities';
import citiesWeatherReducer, { setCitiesWeather, addCityWeather, reloadCityWeather } from './cityWeather';
import weatherDetailsReducer, { setWeatherDetails } from './weatherDetails';

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading.isLoading;
export const isLoaded = (state: RootState) => state.loading.isLoaded;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getCitiesId = (state: RootState) => state.citiesId;
export const getCitiesWeather = (state: RootState) => state.citiesWeather;
export const getWeatherDetails = (state: RootState) => state.weatherDetails


export const loadData = (citiesId: number[]) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());
    dispatch(setErrorMessage(``));

    try {
      const requests = citiesId.map(cityId =>
        fetchCityWeather<CurrentWeather>(cityId)
      );
      const citiesWeather = await Promise.all(requests);
      dispatch(setCitiesWeather(citiesWeather));
      dispatch(setLoaded());
    } catch (e) {
      dispatch(setErrorMessage(`Sorry, something is wrong: ${e}`));
    }
    dispatch(finishLoading());
  }
}

export const loadCityWeatherData = (city: number | string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());


    try {
      const cityWeather = await fetchCityWeather<CurrentWeather>(city);
      typeof city === 'number'
      ? dispatch(reloadCityWeather(cityWeather))
      : dispatch(addCityWeather(cityWeather));
      dispatch(setLoaded());
    } catch (e) {
      dispatch(setErrorMessage(`City not found: ${e}`));
    }
    dispatch(finishLoading());
    dispatch(setErrorMessage(``));
  }
}

export const loadWeatherDetails = (cityId: number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());
    let weatherDetails=[];

    try {
      weatherDetails = await fetcWeatherDetails(cityId);
      dispatch(setWeatherDetails(weatherDetails));
    } catch (e) {
      dispatch(setErrorMessage(`Sorry, something is wrong: ${e}`));
    }
    dispatch(finishLoading());
    return weatherDetails;
  }
}


const rootReducer = combineReducers({
  loading: loadingReducer,
  errorMessage: errorReducer,
  citiesId: citiesReducer,
  citiesWeather: citiesWeatherReducer,
  weatherDetails: weatherDetailsReducer,
})


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));

export default store;
