import { Action } from 'redux';

const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

type SetErrorMessage = Action<typeof SET_ERROR_MESSAGE> & { errorMessage: string };

export  const setErrorMessage = (errorMessage: string): SetErrorMessage => ( {type:  SET_ERROR_MESSAGE, errorMessage} );

const initialState = {
  errorMessage: '',
}

const errorReducer = (state = initialState, action: SetErrorMessage) => {
    switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };

      default:
        return state;
    }
  }

  export default errorReducer;
