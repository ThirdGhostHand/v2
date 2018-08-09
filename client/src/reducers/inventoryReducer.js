import { ADD_ITEM, ADD_ITEM_ERROR, FETCH_INVENTORY, FETCH_STORE } from '../actions/types';

const INITIAL_STATE = {
  errorMessage: ''
};

export default function(state = null, action) {
  switch (action.type) {
    case ADD_ITEM_ERROR:
      return { ...state, errorMessage: action.payload };
    case FETCH_INVENTORY:
      return action.payload;   
    case FETCH_STORE:
      return action.payload;    
    default:
      return state;
  }
}
