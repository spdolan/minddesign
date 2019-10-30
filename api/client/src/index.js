import React from 'react';
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
  <Provider store={store}>
    < BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
        
        {/* <Redirect to='/' /> */}
      </Switch>
    </ BrowserRouter>
  </Provider>,
  document.getElementById("root")
);