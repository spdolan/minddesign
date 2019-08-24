import { SAVE_DESIGN, GET_DESIGN, AUTH_USER } from "../actions";

export default function (state = 'MDlogo-v0.svg', action) {
  switch (action.type) {
    case SAVE_DESIGN:     
      return action.payload.fileName
    case GET_DESIGN:
      let designName = `${action.payload[0].designName}.svg`
      return designName
    case AUTH_USER:
      return 'MDlogo-v0.svg'
  default:
    return state;
  }
}