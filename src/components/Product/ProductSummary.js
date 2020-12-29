import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';



const useStyles = makeStyles((theme) => ({
    main: {
      paddingTop: "20px",
      flexDirection: "column",
      alignItems: "center",
    },
    media: {
        height: 50,
        paddingTop: '100%', 
      },
      root: {
        maxWidth: 400,
        maxHeight: 400,
        width: 250,
        height:400,
      },
  }));


const ProductSummary = ({products}) => {
    const classes = useStyles();
    //console.log(products);
    return (
        <React.Fragment>
            <Container component="main">
                <div className={classes.main}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={10} key={products.id}>
                            <Card  className={classes.root}>
                            <CardMedia
                            className={classes.media}
                            image= {products.images?products.images[0].url:null}
                            title= {products.name}
                            />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {products.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        >
                                        {products.desc}    
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        >
                                        <b>RM: {products.price} </b>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default ProductSummary
