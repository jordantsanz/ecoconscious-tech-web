import { ActionTypes } from '../actions';

const initialState = {
  name: '',
};

const userReducer = (state = initialState, action) => {
  console.log('hello', action.payload);

  switch (action.type) {
    case ActionTypes.LOG_IN:
      console.log('ohoh');
      return {
        name: action.payload,
      };
    case ActionTypes.LOG_OUT:
      return {
        name: initialState.name,
      };
    default:
      return {
        name: initialState.name,
      };
  }
};

export default userReducer;
