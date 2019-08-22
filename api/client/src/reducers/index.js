import { combineReducers } from "redux";
import shapeReducer from "./shapeReducer";
import canvasReducer from './canvasReducer';
import authReducer from './authReducer';
import designReducer from './designReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  timeStamp: canvasReducer,
  currentModel: shapeReducer,
  designs: designReducer
});

export default rootReducer;