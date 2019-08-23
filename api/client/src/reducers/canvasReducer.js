import { SAVE_DESIGN, GET_FILE } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case SAVE_DESIGN:
      // let newState = {
      //   ...state,
      //   filters: [...state.filters, action.filter]
      // }
      // cache.writeData('state', newState)
      let newState = {timeStamp: new Date()}
      return newState
    case GET_FILE:
      let someState = { timeStamp: new Date() }
      return someState
  default:
    return state;
  }
}