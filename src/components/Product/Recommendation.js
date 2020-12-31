import { Divider } from "@material-ui/core";
//import React, {useEffect, useState} from 'react'
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductList from "./ProductList";
import RecommendProductSummary from "./RecommendProductSummary";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SearchBar from "../SearchBar";
//import firebase from "./configs/firebaseConfig";
import firebase from "../../configs/firebaseConfig";
import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    tabs: {
      padding: "30px 0px",
      flexGrow: 1,
      borderRight: `1px solid ${theme.palette.divider}`,
      maxWidth: "250px",
    },
    paper: {
        height: 140,
        width: 100,
      },
      control: {
        padding: theme.spacing(2),
      },
  }));
  
export default function Recommendation() {

    const x = "Thermometer"
    const y = "Medicine"
    const classes = useStyles();
    const auth = useSelector((state) => state.firebase.profile);
    const lastView = auth.lastView;
    console.log("lastView",lastView)

    useFirestoreConnect([
        {
          collection: "products",
          where: [["category", "==", lastView]],
          storeAs: "recommendProducts",
          limit: "3"
        },
        {
            collection: "products",
            where: [["category", "==", y]],
            storeAs: "recommendProducts2",
            limit: "3"
        },
    ]);

    const recommendProducts = useSelector((state) => state.firestore.ordered.recommendProducts);
    // const recommendProducts2 = useSelector((state) => state.firestore.ordered.recommendProducts2);

    return (
        <div>
            <div
                style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" align="center">
                        <h4>Recommendations</h4>
                </Typography>
            </div>
            {/* <Container component="main"> */}
            <Grid item xs={12}>                    
                    <Grid container justify="center" spacing={0}>
                        {recommendProducts &&
                            recommendProducts.map((products) => {
                                return (
                                    <Link key={products.id} to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                                    <RecommendProductSummary
                                        products={products}
                                        key={products.id}
                                    />
                                    </Link>
                                );
                            })
                        }
                        {/* {recommendProducts2 &&
                            recommendProducts2.map((products) => {
                                return (
                                    <Link key={products.id} to={"/product/" + products.id} style={{ textDecoration: 'none' }}>
                                    <RecommendProductSummary
                                        products={products}
                                        key={products.id}
                                    />
                                    </Link>
                                );
                            })
                        } */}
                    </Grid>
                </Grid>
            {/* </Container> */}
      </div>
    );
}