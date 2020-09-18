import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { replace } from "connected-react-router";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

const locationHelper = locationHelperBuilder({});

//These are our auth functions used when defining our routes, so that we can redirect as necessary should we be on a page we're not authenticated to be on, or we're on the login page when we're already authenticated.

export const isAuthenticated = connectedRouterRedirect({
  redirectPath: "/Login",
  authenticatedSelector: (state) => state.auth.authenticated,
  wrapperDisplayName: "IsAuthenticated",
  redirectAction: replace,
}); //Will redirect us to the Login page if we're not authenticated.

export const isNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/Home",
  allowRedirectBack: false,
  authenticatedSelector: (state) => !state.auth.authenticated,
  wrapperDisplayName: "IsNotAuthenticated",
  redirectAction: replace,
}); //Will redirect us to whatever is in the `redirect` parameter in the URL, or Home if it is not present.
