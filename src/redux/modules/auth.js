import pathConfig from '../../../lib/pathConfig';

const Realm = require('realm');
const UserModel = require('../../models/user');

const LOAD = 'teamhub/auth/LOAD';
const LOAD_SUCCESS = 'teamhub/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'teamhub/auth/LOAD_FAIL';
const SIGN_UP_SUCCESS = 'teamhub/auth/SIGN_UP_SUCCESS';
const SET_USER = 'teamhub/auth/SET_USER';
const SIGN_UP_FAIL = 'teamhub/auth/SIGN_UP_FAIL';
const OUTPUT_ERROR = 'teamhub/auth/OUTPUT_ERROR';
const NEED_SIGNUP = 'teamhub/auth/NEED_SIGNUP';

const initialState = {
  loading: false,
  loaded: false,
  signupModalVisible: false,
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
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userName: action.userName,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        alertModalVisible: true,
      };
    case OUTPUT_ERROR:
      return {
        ...state,
        signupErrorMessage: action.errorMessage,
      };
    case SET_USER:
      return {
        ...state,
        userName: action.userName,
      };
    case NEED_SIGNUP: 
      return {
        ...state,
        signupModalVisible: action.need,
      }
    default:
      return state;
  }
}

function requestUser() {
  return {
    type: LOAD,
  };
}

function receiveUser(json) {
  return {
    type: LOAD_SUCCESS,
    data: json,
  };
}

function receiveUserFail(error) {
  return {
    type: LOAD_FAIL,
    error,
  };
}

export function hasUserData() {
  return (dispatch, getState) => {
    let realm = new Realm({
      schema: [UserModel.User]
    })
  
    return (
      Realm.open({
        schema: [UserModel.User]
      }).then(realm => {
        const userName = realm.objects(UserModel.User)[0].name;
        dispatch(setUser(userName));
        dispatch(needSignup(false));
      }).catch(error => {
        dispatch(needSignup(true));
      })
    );
  }
}

function needSignup(bool) {
  return {
    type: NEED_SIGNUP,
    need: bool,
  };
}

export function setUser(userName) {
  return {
    type: SET_USER,
    userName,
  };
}

export function signup(userName) {
  return (dispatch, getState) => {
    const path = `${pathConfig.userSignup}`;
    const userData = {
      user: {
        nickname: userName,
      },
    };

    return fetch(`${path}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then((response) => {
        if (response.ok || response.status === 200) {
          dispatch(signupSuccess());
        } else {
          dispatch(signupFail());
          dispatch(outPutError('ニックネームを入力してください。'));
          throw errors(response.status);
        }
      })
      .catch((error) => {
        dispatch(outPutError('通信状況をご確認の上、再度お試しください。'));
      })
      .done();
  };
}

export function signupSuccess(userName) {
  return {
    type: SIGN_UP_SUCCESS,
    userName,
  };
}

function signupFail() {
  return {
    type: SIGN_UP_FAIL,
  };
}

function outPutError(errorMessage) {
  return {
    type: OUTPUT_ERROR,
    errorMessage,
  };
}
