import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import inventoryReducer from './inventoryReducer';
import cartReducers from './cartReducers';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  inventory: inventoryReducer,
  cart: cartReducers
});
