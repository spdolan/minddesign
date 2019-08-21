import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  email: localStorage.getItem('email') || '',
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state, authenticated: action.payload.token,
        email: action.payload.email
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}