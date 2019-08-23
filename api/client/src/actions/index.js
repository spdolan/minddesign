import axios from "axios";
export const SAVE_DRAWING = 'SAVE_DRAWING';
export const GET_FILE = 'GET_FILE';
export const RENDER_DRAWING = 'RENDER_DRAWING';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SAVE_DESIGN = 'SAVE_DESIGN';
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

export const updateDrawing = (fileName, svgString) => dispatch => {
  // console.log(svgString);
  
  axios.post(`public/${fileName}`,{
    data: svgString,
  }).then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DRAWING, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const getFile = (fileName) => dispatch => {
  axios.get(`download/${fileName}`)
    .then(function(response){
      
      dispatch({ type: GET_FILE, payload: response })
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getUserDesigns = (userName) => dispatch => {
  // console.log(svgString);

  axios.get(`${userName}/designs`)
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

  axios.get(`${userName}/designs/${designName}`)
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

  axios.get(`user/${userName}/designs/${designName}/save`)
  .then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DESIGN, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

export const renderDrawing = (queryObject) => dispatch => {
  let queryUrl = `${ROOT_URL}?`;
  let queryString = ``;
  let userName = localStorage.getItem('email')
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