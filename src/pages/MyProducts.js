import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import ButtonAppBar from "../components/ButtonAppBar";

import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },

}));

export default function MyProducts() {
  useFirestoreConnect([{ collection: "highlights" }]);
  const classes = useStyles();

    return (
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            
          </div>
        </Container>
      </React.Fragment>
    );
  
}
