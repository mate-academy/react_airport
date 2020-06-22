import { AnyAction } from 'redux';

const SET_WEATHER_DETAILS = 'SET_WEATHER_DETAILS';

export const setWeatherDetails = (details: WeatherDetails[]) => ({ type: SET_WEATHER_DETAILS, details });

const weatherDetailsReducer = (details = null, action: AnyAction) => {
  switch (action.type) {
    case SET_WEATHER_DETAILS:
      return action.details;

    default:
      return details;
  }
};

export default weatherDetailsReducer;
