import { Action } from 'redux';

const SET_CITIES_ID = 'SET_CITIES_ID';
const ADD_CITY_ID = 'ADD_CITY_ID';
const REMOVE_CITY_ID = 'REMOVE_CITY_ID';

type SetCitiesId = Action<typeof SET_CITIES_ID> & { citiesId: number[] };
type AddCityId = Action<typeof ADD_CITY_ID> & { cityId: number };
type RemoveCityId = Action<typeof REMOVE_CITY_ID> & { cityId: number };

export const setCitiesId = (citiesId: number[]): SetCitiesId => ({ type:  SET_CITIES_ID, citiesId });
export const addCityId = (cityId: number): AddCityId => ({ type: ADD_CITY_ID, cityId });
export const removeCityId = (cityId: number): RemoveCityId => ({ type: REMOVE_CITY_ID, cityId })

let initialState: number[] = JSON.parse(localStorage.getItem('citiesId')||'');

if (!initialState) {
  initialState =  [4140963, 5107152, 1850147, 4171563, 706483];
}

const citiesReducer = (state = initialState, action: SetCitiesId | AddCityId | RemoveCityId) => {
  switch (action.type) {
    case SET_CITIES_ID:
      return action.citiesId;

    case ADD_CITY_ID:
      return [
        ...state, action.cityId,
      ];

      case REMOVE_CITY_ID:
        return state.filter(city => city !== action.cityId)

    default:
      return state;
  }
}

export default citiesReducer;
