import { SAVE_DESIGN } from "../actions";

export default function (state = 'tiger.svg', action) {
  switch (action.type) {
    case SAVE_DESIGN:
      // let newState = {
      //   ...state,
      //   filters: [...state.filters, action.filter]
      // }
      // cache.writeData('state', newState)
      // console.log(action)
      
      return action.payload.fileName
  default:
    return state;
  }
}