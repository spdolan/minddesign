import CacheManager from '../cache'
import { RENDER_DRAWING, SET_FILE } from "../actions";
const cache = new CacheManager();

export default function (state = 'sig.svg', action) {
  switch (action.type) {
    case SET_FILE:
      // let newState = {
      //   ...state,
      //   filters: [...state.filters, action.filter]
      // }
      // cache.writeData('state', newState)
      // console.log(action)
      let newMesh = action.payload;
      return newMesh
  default:
    return state;
  }
}