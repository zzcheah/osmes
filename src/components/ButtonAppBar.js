import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import SearchBar from "material-ui-search-bar";


import { themeColors } from "../styles/colors";

import {Link} from 'react-router-dom'
import SignInLink from "./layout/SignInLink";
import SignOutLink from "./layout/SignOutLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: `linear-gradient(${themeColors.blue2},transparent)`,
    backgroundColor: `${themeColors.blue3}` /*this your primary color*/,
    height: "130px",
    // display: "flex",
    justifyContent: "center",
    // alignItems: "left",
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
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState("");
  const trending = ["Face Mask 3ply", "Hand Sanitizer 50ml", "Paracetamol 50mg"];
  
  // handleChange = (e) =>{
  //   console.log(e)
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
        <Link position="static" className={classes.link} to="/"><img src={"images/logo.png"}className={classes.logoNew}/></Link>
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
          <Grid container spacing={1} style={{ margin: "0px 200px 0px 30px" }}>
            <Grid item xs={12}>
              {trending.map((str, i) => <div key={i} style={{display:"inline", marginRight:"30px"}}>{str}</div>)}
            </Grid>
            <Grid item xs={12}>
              <SearchBar
                value={inputVal}
                // onChange={(event) => setInputVal(event.target.value)}
                // onRequestSearch={() => doSomethingWith(inputVal)}
                // value={this.state.value}
                 //onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ margin: "0px 200px 0px 30px" }}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <SignInLink/>
            <SignOutLink/>
          </div>
          </Grid>
          {/* <Button color="inherit">Login</Button>
          <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
