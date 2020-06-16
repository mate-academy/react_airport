import { Action } from 'redux';
import { DEPARTURES, ARRIVALS } from '../constants/flightDirection';
import { SET_DIRECTION } from '../constants/actionTypes';

type DirectionAction = Action<typeof SET_DIRECTION> & {
  direction: typeof DEPARTURES | typeof ARRIVALS;
};

export const setDirection = (direction: typeof DEPARTURES | typeof ARRIVALS): DirectionAction => ({
  type: SET_DIRECTION,
  direction,
});

const reduce = (
  directionState = DEPARTURES,
  { type, direction }: DirectionAction,
): string => {
  switch (type) {
    case SET_DIRECTION:
      if (direction === directionState) {
        return directionState;
      }

      return direction;
    default:
      return directionState;
  }
};

export default reduce;
