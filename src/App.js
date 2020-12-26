import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//import ButtonAppBar from "./components/ButtonAppBar";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty, useFirestoreConnect } from "react-redux-firebase";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import ProjectDetails from "./components/Product/ProductDetails";
import AddProductForm from "./components/Product/AddProductForm";
import ProductDetails from "./components/Product/ProductDetails"
import { logoutAction } from "./redux/actions/authActions";
import EditUserPage from "./pages/EditUserPage";

// splash screen
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  const loading = useSelector((state) => state.app.loading);
  if (!isLoaded(auth) || loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={90} />
      </div>
    );
  return children;
}

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


  useFirestoreConnect([
    {
      collection: "categories",
      orderBy: ["name"],
    },
  ]);

  console.log("rerendered");

  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route exact path="/" component={LandingPage} />
          <Route path="/product/:id" component={ProjectDetails} />
          <PrivateRoute path="/editProfile" component={EditUserPage} />
          <PrivateRoute path="/addproduct" component={AddProductForm} />
          <PrivateRoute path="/recommendation" component={Recommendation} />
          <PrivateRoute path="/product/:id" component={ProductDetails} />
        </Switch>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}

function Recommendation() {
  // const state = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(logoutAction())}>Logout</button>;
}

export default App;
