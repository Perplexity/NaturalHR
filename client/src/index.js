import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";
import configureStore, { history } from "./store";
import { Route, Switch } from "react-router";
import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";
import Home from "./pages/Home/Home";
import AuthProvider from "./AuthProvider";
import { isAuthenticated, isNotAuthenticated } from "./auth";
import Register from "./pages/Register/Register";
const store = configureStore();

//This is our index page, which provides the store, auth, and routes.

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={isNotAuthenticated(Login)}></Route>
          <Route path="/Login" component={isNotAuthenticated(Login)}></Route>
          <Route path="/Register" component={isNotAuthenticated(Register)}></Route>
          <Route path="/Home" component={isAuthenticated(Home)} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </ConnectedRouter>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
