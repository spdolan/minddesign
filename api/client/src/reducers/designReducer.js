import { SAVE_DESIGN, GET_DESIGN, GET_DESIGNS } from '../actions';

export default function (state = [], action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case SAVE_DESIGN:
      return action.payload;
    case GET_DESIGN:
      return action.payload;
    case GET_DESIGNS:
      return action.payload
    default:
      return state;
  }
}