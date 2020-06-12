import { Action } from 'redux';
import { INIT_FLIGHTS } from '../constants/actionTypes';

type FlightsAction = Action<typeof INIT_FLIGHTS> & {
  body: IFlightsFromServer;
};

export const initFlights = (body: IFlightsFromServer): FlightsAction => ({
  type: INIT_FLIGHTS,
  body,
});

export type FlightsState = {
  departure: IFlights[];
  arrival: IFlights[];
};

const initialState: FlightsState = {
  departure: [],
  arrival: [],
};

const reduce = (
  flightsState1 = initialState,
  { type, body }: FlightsAction,
): FlightsState => {
  switch (type) {
    case INIT_FLIGHTS:
      return {
        ...flightsState1,
        departure: body.departure,
        arrival: body.arrival,
      };
    default:
      return flightsState1;
  }
};

export default reduce;
