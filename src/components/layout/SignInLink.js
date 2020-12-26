import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";

import { logoutAction } from "../../redux/actions/authActions";



const SignInLink = () => {
    
    const dispatch = useDispatch();

    return (
      <div>
        <Button color="inherit" onClick={() => dispatch(logoutAction())}>
          Sign Out
        </Button>
        <NavLink
          to="/editProfile"
          activeStyle={{ colour: "inherit" }}
          className="btn btn-floating pink lighten-1"
        >
          CC
        </NavLink>
      </div>
    );
}

export default SignInLink