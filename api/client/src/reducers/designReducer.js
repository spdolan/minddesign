import { GET_DESIGN, GET_DESIGNS, PUBLIC_DESIGNS } from '../actions';

export default function (state = [], action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case GET_DESIGNS:
      // console.log(action.payload)
      return action.payload
    case PUBLIC_DESIGNS:
      return action.payload
    case GET_DESIGN:
      return action.payload
    default:
      return state;
  }
}