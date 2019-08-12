import { combineReducers } from "redux";
import shapeReducer from "./shapeReducer";
import canvasReducer from './canvasReducer';

const rootReducer = combineReducers({
  // products: ProductReducer,
  timeStamp: canvasReducer,
  currentMesh: shapeReducer
});

export default rootReducer;