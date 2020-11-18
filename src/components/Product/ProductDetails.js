import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      //height: 240,
      height: 50,
      paddingTop: '100%', 
    },
    main: {
        paddingTop: "20px",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "35%",
        paddingBottom: "20px",
      },
  });

const  ProductDetails = (props) => {
    const classes = useStyles();
    const { product } = props;
    if (product) {
        return(
            <div className={classes.main}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image= {product.urls}
                            title= {product.name}
                            />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Brand: {product.brand}
                            </Typography>
                            <Typography variant="body3" color="textSecondary" component="p">
                                {product.desc}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                RM {product.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Stock: {product.stock}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Seller: {product.sellerName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Ship from: {product.shipFrom}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Add to Cart
                        </Button>
                        <Button size="small" color="primary">
                            Buy Now
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) =>{
    //console.log(state);
    const id = ownProps.match.params.id;
    const products = state.firestore.data.products;
    const product = products ? products[id] : null
    return {
        product: product
    }
}


export default compose (
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'products'}
    ])
)(ProductDetails)
