import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

import ButtonAppBar from "../components/ButtonAppBar";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import ViewProduct from "./ViewProduct";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import ProjectDetails from '../components/Product/ProductDetails';
import ProductList from "../components/Product/ProductList";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    flexDirection: "column",
    alignItems: "center",
  },
  highlight: {
    height: "100px",
    backgroundColor: "blue",
    verticalAlign: "middle",
    paddingBottom: "5px",
  },
}));

export default function LandingPage() {
  useFirestoreConnect([{ collection: "highlights" }]);
  const classes = useStyles();
  const highlights = useSelector((state) => state.firestore.ordered.highlights);
  const unlimited = useSelector((state) => state.firestore.ordered.unlimited);
  const searchResults = useSelector(state => state.searchState);

    return (
    <BrowserRouter>
      <React.Fragment>
        <CssBaseline />
        <ButtonAppBar />
        <Container component="main">
          <div className={classes.main}>
            <div className={classes.highlight}>
              {highlights &&
                highlights.map((promo) => (
                  <button key={promo.id}>{promo.title}</button>
                ))}
            </div>
            <hr />
            <Grid container spacing={2} justify="center">
              {unlimited &&
                unlimited.map((promo) => (
                  <Grid item xs={3} key={promo.id}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {promo.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {promo.desc}    
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </div>
        </Container>
        <Switch>
          <Route exact path='/' component={ViewProduct}/>
          <Route path='/product/:id' component={ProjectDetails}/>
        </Switch>
      </React.Fragment>
      </BrowserRouter>
    );
  
}
