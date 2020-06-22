import { Action } from 'redux';

const SET_CITIES_WEATHER = 'SET_CITIES_WEATHER';
const ADD_CITY_WEATHER = 'ADD_CITY_WEATHER';
const REMOVE_CITY_WEATHER = "REMOVE_CITY_WEATHER";

type SetCitiesWeather = Action<typeof SET_CITIES_WEATHER> & { citiesWeather: CurrentWeather[] };
type AddCityWeather = Action<typeof ADD_CITY_WEATHER> & { cityWeather: CurrentWeather };
type RemoveCityWeather = Action<typeof REMOVE_CITY_WEATHER> & { cityWeather: CurrentWeather };

export const setCitiesWeather = (citiesWeather: CurrentWeather[]): SetCitiesWeather => ({ type: SET_CITIES_WEATHER, citiesWeather });
export const addCityWeather = (cityWeather: CurrentWeather): AddCityWeather => ({ type: ADD_CITY_WEATHER, cityWeather });
export const removeCityWeather = (cityWeather: CurrentWeather): RemoveCityWeather => ({ type: REMOVE_CITY_WEATHER, cityWeather });

const initialState: CurrentWeather[] = []

const citiesWeatherReducer = (state = initialState, action: SetCitiesWeather | AddCityWeather | RemoveCityWeather) => {
  switch (action.type) {
    case SET_CITIES_WEATHER:
      return action.citiesWeather;

    case ADD_CITY_WEATHER:
      return [
        ...state, {...action.cityWeather}
      ]

    case REMOVE_CITY_WEATHER:
      return [...state].filter(cityWeather => cityWeather.id !== action.cityWeather.id);

    default:
      return state;
  }
};

export default citiesWeatherReducer;
