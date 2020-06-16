import { Action } from 'redux';
import { DEPARTURE, ARRIVAL } from '../constants/flightDirection';
import { SET_DIRECTION } from '../constants/actionTypes';

type DirectionAction = Action<typeof SET_DIRECTION> & {
  direction: typeof DEPARTURE | typeof ARRIVAL;
};

export const setDirection = (direction: typeof DEPARTURE | typeof ARRIVAL): DirectionAction => ({
  type: SET_DIRECTION,
  direction,
});

const reduce = (
  directionState = DEPARTURE,
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
