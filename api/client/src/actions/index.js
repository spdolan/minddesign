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
    localStorage.setItem('id', response.data.id);
    callback();
  })
    .catch(function (error) {
      dispatch({ type: AUTH_ERROR, payload: 'Confirmation email sent, please check your inbox.' });
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
    localStorage.setItem('id', response.data.id);
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
  localStorage.removeItem('id');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const updateDesign = (fileName, svgString) => dispatch => {
  
  let userId = localStorage.getItem('id');
  if(!userId){userId = 'guest'};
  
  axios.post(`designs/${userId}/${fileName}`,{
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
  let userId = localStorage.getItem('id');
  if (userId === '') { userId = 'guest' };

  axios.get(`download/${userId}/${fileName}`)
    .then(function(response){
      
      dispatch({ type: GET_FILE, payload: response })
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getUserDesigns = (userId) => dispatch => {

  axios.get(`users/${userId}/designs`)
  .then(function (response) {
    // console.log(response);
    dispatch({ type: GET_DESIGNS, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const getDesign = (designId) => dispatch => {
  // console.log(svgString);

  axios.get(`designs/${designId}`)
    .then(function (response) {
      // console.log(response);
      dispatch({ type: GET_DESIGN, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const saveDesign = (userId, designName) => dispatch => {
  // console.log(svgString);

  axios.get(`designs/${userId}/${designName}/save`)
  .then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DESIGN, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};
