'use strict';

const LOAD = 'teamhub/auth/LOAD';
const LOAD_SUCCESS = 'teamhub/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'teamhub/auth/LOAD_FAIL';

const initialState = {
    loading: false,
    loaded: false,
  };

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case LOAD:
        return {
          ...state,
          loading: true, 
        };
    case LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
        };
    case LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
        };
    default:
        return state;
      }
 }

function requestUser() {
  return {
    type: LOAD
  };
}

function receiveUser(json) {
  return {
    type: LOAD_SUCCESS,
    data: json
  };
}

function receiveUserFail(error) {
  return {
    type: LOAD_FAIL,
    error: error
  };
}