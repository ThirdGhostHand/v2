import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, REGISTER_USER, AUTH_USER, AUTH_ERROR, REGISTER_MERCHANT, AUTH_MERCHANT, ADD_ITEM, ADD_ITEM_ERROR, FETCH_INVENTORY, FETCH_STORE, GET_CART, ADD_TO_CART, UPDATE_CART, DELETE_CART_ITEM } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signup = (formProps, callback) => async dispatch => {
try {
    const res = await axios.post(
      '/auth/signup',
      formProps
    );
    dispatch({ type: REGISTER_USER, payload: res.data });
    callback();
} catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
}
};


export const signin = (formProps, callback) => async dispatch => {
try {
    const res = await axios.post(
      '/auth/local',
      formProps
    );
    dispatch({ type: AUTH_USER, payload: res.data });
    callback();
} catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
}
};

export const merchantSignup = (formProps, callback) => async dispatch => {
  try {
      const res = await axios.post(
        'auth/merchantSignup',
        formProps
      );
      dispatch({ type: REGISTER_MERCHANT, payload: res.data });
      callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
  };
  
  
  export const merchantSignin = (formProps, callback) => async dispatch => {
  try {
      const res = await axios.post(
        '/auth/merchant',
        formProps
      );
      dispatch({ type: AUTH_MERCHANT, payload: res.data });
      callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
  };

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const addItem = (formProps, callback) => async dispatch => {
  try {
      const res = await axios.post(
        'store/addItem',
        formProps
      );
      dispatch({ type: ADD_ITEM, payload: res.data });
      callback();
  } catch (e) {
    dispatch({ type: ADD_ITEM_ERROR, payload: 'Add item failed' });
    }
  };

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchInventory = () => async dispatch => {
  const res = await axios.get('/merchant/inventory');
  dispatch({ type: FETCH_INVENTORY, payload: res.data })
}

export const fetchStore = () => async dispatch => {
  const res = await axios.get('/client/store');
  dispatch({ type: FETCH_STORE, payload: res.data })
}
// GET CART
export const getCart = () => async dispatch => {
  const res = await axios.get('/api/cart');
  dispatch({type: GET_CART, payload: res.data});
}; 
// ADD TO CART
export const addToCart = (cart) => async dispatch => {
  const res = await axios.post("/api/cart", cart)
  dispatch({type: ADD_TO_CART, payload: res.data})  
}
// UPDATE CART
export const updateCart = (_id, unit, cart) => async dispatch => {
  // Create a copy of the current array of books
  const currentItemToUpdate = cart
  // Determine at which index in books array is the book to be deleted
  const indexToUpdate = currentItemToUpdate.findIndex(
    function(book){
      return book._id === _id;
    }
  )

  const newItemToUpdate = {
    ...currentItemToUpdate[indexToUpdate],
    quantity: currentItemToUpdate[indexToUpdate].quantity + unit
  }
  let cartUpdate = [...currentItemToUpdate.slice(0, indexToUpdate), newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate + 1)]
  const res = await   axios.post("/api/cart", cartUpdate);
        dispatch({type: UPDATE_CART, payload:res.data})
};
// DELETE FROM CART
export const deleteCartItem = (cart) => async dispatch => {
  const res = await axios.post("/api/cart", cart);
  dispatch({type: DELETE_CART_ITEM, payload:res.data})
};