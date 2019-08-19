import { combineReducers } from "redux";
import shapeReducer from "./shapeReducer";
import canvasReducer from './canvasReducer';

const rootReducer = combineReducers({
  // products: ProductReducer,
  timeStamp: canvasReducer,
  currentModel: shapeReducer
});

export default rootReducer;