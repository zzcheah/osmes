import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import SearchBar from "material-ui-search-bar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";

import { themeColors } from "../styles/colors";

import { Link, NavLink } from "react-router-dom";
import SignInLink from "./layout/SignInLink";
import SignOutLink from "./layout/SignOutLink";
import ViewProduct from "../pages/ViewProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: `linear-gradient(${themeColors.blue2},transparent)`,
    backgroundColor: `${themeColors.blue3}` /*this your primary color*/,
    height: "130px",
  },
  logo: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // }
    display: "block",
    width: "auto",
    height: "80%",
    padding: "20px 50px",
  },
  logoNew: {
    display: "block",
    width: "auto",
    height: "80%",
    padding: "20px 50px 10px 50px",
  },
  link: {
    display: "block",
    width: "auto",
    height: "110%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkLayout: {
    width: "700px",
    textAlign: "center"
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const trending = [
    "Face Mask 3ply",
    "Hand Sanitizer 50ml",
    "Paracetamol 50mg",
  ];
  const auth = useSelector((state) => state.firebase.auth);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    //console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    console.log(search);
    //setQuery(search);
    return (
      <div>
        hello
        {/* <Route exact path='/signup' component={ViewProduct}/> */}
      </div>
    );
  };

  // handleChange = (e) =>{
  //   console.log(e)
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Link position="static" className={classes.link} to="/">
            <img
              src={"images/logo.png"}
              alt="osmes"
              className={classes.logoNew}
            />
          </Link>
          {/* //press ther image then will navigate to homepage */}
          {/* <img src={"images/logo.png"} alt="tms" className={classes.logo} /> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Grid container spacing={1} style={{ margin: "0px 0px 0px 30px" }}>
            <Grid item xs={12}>
              {trending.map((str, i) => (
                <div key={i} style={{ display: "inline", marginRight: "30px" }}>
                  {str}
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              {/* <SearchBar
                type = "text"
                value={search}
                onChange={updateSearch}
                //onRequestSearch={getSearch}
                // value={this.state.value}
                 //onChange={this.handleChange}
              /> */}
              <form onSubmit={getSearch} className="App">
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Product Name"
                  value={search}
                  onChange={updateSearch}
                ></input>
              </form>
            </Grid>
          </Grid>

          <div className={classes.linkLayout}>
            {isLoaded(auth) && !isEmpty(auth) ? (
              <SignInLink />
            ) : (
              <SignOutLink />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
