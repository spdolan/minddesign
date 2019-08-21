import axios from "axios";
export const SAVE_DRAWING = 'SAVE_DRAWING';
export const SET_FILE = 'SET_FILE';
export const RENDER_DRAWING = 'RENDER_DRAWING';
export const AUTH_USER = 'AUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'

const ROOT_URL = "http://localhost:8000/";

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    'auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    callback();
  })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'auth/signin',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    callback();
  })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    });
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const updateDrawing = (svgString) => dispatch => {
  // console.log(svgString);
  axios.post(`public/sig.svg`,{
    data: svgString
  }).then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DRAWING, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const setFile = (fileName) => dispatch => {
  let myFile = '';
  if(fileName !== 'tiger' && fileName !== 'sig'){
    myFile = 'tiger.svg'
  } else {
    myFile = fileName + '.svg'
  }

  dispatch({ type: SET_FILE, payload: myFile })
}

export const renderDrawing = (queryObject) => dispatch => {
  let queryUrl = `${ROOT_URL}?`;
  let queryString = ``;
  const { fileString, extrude } = queryObject;

  if (fileString) {
    queryString += `file=${fileString}&`
  }

  if (extrude) {
    queryString += `extrude=${extrude}&`
  }

  if (queryString.length > 0) { queryUrl += queryString };
  axios.get(queryUrl).then(function (response) {
    console.log(response);
    dispatch({ type: RENDER_DRAWING, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};