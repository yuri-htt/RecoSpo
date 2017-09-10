// Reducer: From the current state and action, we will create a new state.
import { combineReducers } from 'redux';
import { modeled } from 'react-redux-form';


// Call each reducer and retrieve the initial state
import auth from './auth';
import commonModal from './modal';

// Combine the initial state and create one initial state tree
export default combineReducers({
  auth: modeled(auth, 'auth'),
  commonModal: modeled(commonModal, 'modal'),
});
