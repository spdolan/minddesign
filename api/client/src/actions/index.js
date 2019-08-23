import axios from "axios";
export const SAVE_DESIGN = 'SAVE_DESIGN';
export const GET_FILE = 'GET_FILE';
export const RENDER_DESIGN = 'RENDER_DESIGN';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const GET_DESIGN = 'GET_DESIGN';
export const GET_DESIGNS = 'GET_DESIGNS';

const ROOT_URL = "http://localhost:8000/";

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    'auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('name', response.data.name);
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
    localStorage.setItem('name', response.data.name);
    callback();
  })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    });
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('name');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const updateDesign = (fileName, svgString) => dispatch => {
  // console.log(svgString);
  let userName = localStorage.getItem('name');
  if(userName === ''){userName = 'guest'};

  axios.post(`design/${userName}/${fileName}`,{
    data: svgString,
  }).then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DESIGN, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const downloadFile = (fileName) => dispatch => {
  let userName = localStorage.getItem('name');
  if (userName === '') { userName = 'guest' };

  axios.get(`download/${userName}/${fileName}`)
    .then(function(response){
      
      dispatch({ type: GET_FILE, payload: response })
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getUserDesigns = (userName) => dispatch => {
  // console.log(svgString);

  axios.get(`user/${userName}/designs`)
  .then(function (response) {
    // console.log(response);
    dispatch({ type: GET_DESIGNS, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const getUserDesign = (userName,designName) => dispatch => {
  // console.log(svgString);

  axios.get(`user/${userName}/designs/${designName}`)
    .then(function (response) {
      // console.log(response);
      dispatch({ type: GET_DESIGN, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const saveDesign = (userName, designName) => dispatch => {
  // console.log(svgString);

  axios.get(`design/${userName}/${designName}/save`)
  .then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DESIGN, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};
