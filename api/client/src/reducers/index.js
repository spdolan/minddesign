import { combineReducers } from "redux";
import shapeReducer from "./shapeReducer";
import canvasReducer from './canvasReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  currentUser: authReducer,
  timeStamp: canvasReducer,
  currentModel: shapeReducer
});

export default rootReducer;