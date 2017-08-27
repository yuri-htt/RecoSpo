'use strict';
// Reducer: From the current state and action, we will create a new state.
import { combineReducers } from 'redux';
import { modelReducer, modeled } from 'react-redux-form';


// Call each reducer and retrieve the initial state
import auth from './auth';

// Combine the initial state and create one initial state tree
export default combineReducers({
    auth: modeled(auth, 'auth')
});