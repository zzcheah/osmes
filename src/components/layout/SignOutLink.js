import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SignOutLink = () => {
  return (
    <div>
      <NavLink style={{ color: "white" }} to="/login">
        <Button color="inherit">Log In</Button>
          </NavLink>
          <div style={{display: "inline", borderLeft: "1px solid blue", height: "100%"}}></div>
      <NavLink style={{ color: "white" }} to="/signup">
        <Button color="inherit">Sign Up</Button>
      </NavLink>
    </div>
  );
};

export default SignOutLink;
