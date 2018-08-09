import { FETCH_USER, REGISTER_USER, AUTH_USER, AUTH_ERROR, REGISTER_MERCHANT, AUTH_MERCHANT } from '../actions/types';

const INITIAL_STATE = {
  errorMessage: ''
};

export default function(state = null, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; 
    case REGISTER_USER:
      return action.payload || false; 
    case AUTH_MERCHANT:
      return action.payload || false; 
    case REGISTER_MERCHANT:
      return action.payload || false; 
    case AUTH_USER:
      return action.payload || false;    
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
