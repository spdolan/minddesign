import { USER_SIGNIN, USER_SIGNOUT } from "../actions";

export default function (state = null, action) {
  switch (action.type) {
    case USER_SIGNIN:
      return action.payload;
  default:
    return state;
  }
}