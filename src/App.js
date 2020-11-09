import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import ButtonAppBar from "./components/ButtonAppBar";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { logoutAction } from "./redux/actions/authActions";

// splash screen
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div style={{ position: "fixed", top: "50%", left: "50%" }}>
        <CircularProgress size='80'/>
      </div>
    );
  return children;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
function PrivateRoute({ component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          React.createElement(component)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Switch>
          <Route exact path="/" component={() => <div>Landing Page</div>} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <PrivateRoute
            path="/recommendation"
            component={Recommendation}
          />
        </Switch>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

function Recommendation() {
  // const state = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();
  return <button onClick={()=> dispatch(logoutAction())}>Logout</button>;
}

export default App;
