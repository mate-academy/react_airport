import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { setError, finishLoading, startLoading } from './loading';
import flightsReducer, { initFlights } from './flights';
import { getFlights } from '../helpers/api';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  flights: flightsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getFlightsAll = (state: RootState) => state.flights;
// export const getFlightsArrival = (state: RootState) => state.flights.arrival;

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadFlights = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const flights = await getFlights();

      dispatch(initFlights(flights));
    } catch (error) {
      dispatch(setError(error.message));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
