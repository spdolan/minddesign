import { AUTH_USER, AUTH_ERROR } from '../actions';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  email: localStorage.getItem('email') || '',
  name: localStorage.getItem('name') || '',
  id: localStorage.getItem('id') || '',
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state, authenticated: action.payload.token,
        email: action.payload.email, name: action.payload.name, id: action.payload.id
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}