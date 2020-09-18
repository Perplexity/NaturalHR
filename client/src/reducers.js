import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "./authSlice";
import loginReducer from "./pages/Login/loginSlice";
import registerReducer from "./pages/Register/registerSlice";
import homeReducer from "./pages/Home/homeSlice";

//Combines all of our reducers so we can access their states throughout the app.

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
  });
export default createRootReducer;
