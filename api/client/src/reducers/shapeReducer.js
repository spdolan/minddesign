import { SAVE_DRAWING } from "../actions";

export default function (state = 'tiger.svg', action) {
  switch (action.type) {
    case SAVE_DRAWING:
      // let newState = {
      //   ...state,
      //   filters: [...state.filters, action.filter]
      // }
      // cache.writeData('state', newState)
      // console.log(action)
      
      return action.payload.file
  default:
    return state;
  }
}