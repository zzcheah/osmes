import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import ButtonAppBar from "../components/ButtonAppBar";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import ViewProduct from "./ViewProduct";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },

}));

export default function LandingPage() {
  useFirestoreConnect([{ collection: "highlights" }]);
  const classes = useStyles();

    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            <ViewProduct/>
          </div>
        </Container>
      </React.Fragment>
    );
  
}
