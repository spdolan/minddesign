import CacheManager from '../cache'
import { RENDER_DRAWING } from "../actions";
const cache = new CacheManager();

export default function (state = {}, action) {
  switch (action.type) {
    case RENDER_DRAWING:
      // let newState = {
      //   ...state,
      //   filters: [...state.filters, action.filter]
      // }
      // cache.writeData('state', newState)
      let newMesh = action.payload.data;
      return newMesh
  default:
    return state;
  }
}