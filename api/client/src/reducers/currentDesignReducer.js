import { GET_DESIGN } from '../actions';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case GET_DESIGN:
      return action.payload;
    default:
      return state;
  }
}