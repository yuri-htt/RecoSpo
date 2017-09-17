import pathConfig from '../../../lib/pathConfig';
import { UserSchema } from '../../models/user';

const Realm = require('realm');

const LOAD = 'teamhub/auth/LOAD';
const LOAD_SUCCESS = 'teamhub/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'teamhub/auth/LOAD_FAIL';
const SIGNUP_SUCCESS = 'teamhub/auth/SIGN_UP_SUCCESS';
const SET_USER = 'teamhub/auth/SET_USER';
const SIGNUP_FAIL = 'teamhub/auth/SIGNUP_FAIL';
const SET_ERROR_MESSAGE = 'teamhub/auth/SET_ERROR_MESSAGE';
const NEED_SIGNUP = 'teamhub/auth/NEED_SIGNUP';

const initialState = {
  loading: false,
  loaded: false,
  signupModalVisible: false,
  alertModalVisible: false,
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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userName: action.userName,
        signupModalVisible: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        alertModalVisible: true,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        modalContent: action.errorMessage,
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
      };
    default:
      return state;
  }
}

export function hasUserData() {
  // RealmのDBファイルを確認するために必要
  // const realm = new Realm({ schema: UserSchema });
  // console.log(realm.path)

  return (dispatch) => {
    Realm.open({
      schema: UserSchema,
    }).then((realm) => {
      const userName = realm.objects('User');
      if (userName.length === 0) {
        dispatch(needSignup(true));
      } else {
        const me = userName.slice(0, 1);
        dispatch(setUser(me));
        dispatch(needSignup(false));
      }
    }).catch(() => {
      dispatch(needSignup(true));
    });
  };
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
  return (dispatch) => {
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
          dispatch(signupSuccess(userName));
        } else {
          dispatch(signupFail());
          dispatch(setErrorMessage('ニックネームを入力してください。'));
          throw errors(response.status);
        }
      })
      .catch(() => {
        dispatch(signupFail());
        dispatch(setErrorMessage('通信状況をご確認の上、再度お試しください。'));
      })
      .done();
  };
}

export function signupSuccess(userName) {
  Realm.open({
    schema: UserSchema,
  }).then((realm) => {
    realm.write(() => {
      realm.create('User', {
        name: userName,
      });
    });
  });

  return {
    type: SIGNUP_SUCCESS,
    userName,
  };
}

function signupFail() {
  return {
    type: SIGNUP_FAIL,
  };
}

function setErrorMessage(errorMessage) {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage,
  };
}
