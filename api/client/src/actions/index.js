import axios from "axios";
export const SAVE_DRAWING = 'SAVE_DRAWING';
export const RENDER_DRAWING = 'RENDER_DRAWING';

const ROOT_URL = "http://localhost:8000/";

export const updateDrawing = (svgString) => dispatch => {
  // console.log(svgString);
  axios.post(`${ROOT_URL}sig.svg`,{
    data: svgString
  }).then(function (response) {
    // console.log(response);
    dispatch({ type: SAVE_DRAWING, payload: response.data });
  })
    .catch(function (error) {
      console.log(error);
    });
};

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