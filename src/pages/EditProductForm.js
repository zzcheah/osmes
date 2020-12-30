import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DropzoneArea } from "material-ui-dropzone";
import ReactAlbum from "../components/Utils/ReactAlbum";
import ButtonAppBar from "../components/ButtonAppBar";

import { useHistory, useParams } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";

import { addProduct } from "../redux/actions/productActions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    maxWidth: "450px",
    flexGrow: "1",
    width: "100%",
    padding: "0px 20px",
  },
  album: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
}));

export default function EditProductForm() {
  const [product, setProduct] = useState({
    name: "",
    stock: 0,
    price: 0.0,
    category: "",
    brand: "Shopee",
    shipFrom: "",
    desc: "",
  });
  const [images, setImages] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  useFirestoreConnect([
    {
      collection: "products",
      doc: id,
      storeAs: "ep",
    },
  ]);
  const oldProduct = useSelector((state) => state.firestore.data.ep);
  const categories = useSelector((state) => state.firestore.ordered.categories);

  const customCardActions = (index) => {
    const handleDelete = () => {};
    return (
      <CardActions>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: "auto", marginRight: "5px" }}
          startIcon={<DeleteIcon />}
          size="small"
          onClick={handleDelete(index)}
        >
          Remove
        </Button>
      </CardActions>
    );
  };

  useEffect(() => {
    if (oldProduct) {
      setProduct({
        name: oldProduct.name,
        stock: oldProduct.stock,
        price: oldProduct.price,
        category: oldProduct.category,
        brand: oldProduct.brand,
        shipFrom: oldProduct.shipFrom,
        desc: oldProduct.desc,
      });
    }
  }, [oldProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product, images, history));
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  const handleImages = (img) => {
    setImages(img);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ButtonAppBar />
      <Container component="main" maxWidth="md">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* <Container component="main" maxWidth="sm"> */}
          <div className={classes.container}>
            <div className={classes.album}>
              <Typography component="h1" variant="h5" gutterBottom>
                Previous Product Images
              </Typography>
              <Box height="15px" />
              <ReactAlbum
                images={
                  oldProduct ? oldProduct.images.map((image) => image.url) : []
                }
                cardActions={customCardActions}
              />
            </div>
          </div>

          {/* </Container> */}
          {/* <Container component="main" maxWidth="sm"> */}
          <div className={classes.container}>
            <div className={classes.root}>
              <Typography component="h1" variant="h5">
                Fill in Product Detail
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* name */}
                  <Grid item xs={12}>
                    <TextField
                      label="Product Name"
                      id="name"
                      required
                      fullWidth
                      value={product.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* stock */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="stock"
                      label="Stock"
                      type="number"
                      value={product.stock}
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                      }}
                      required
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* price */}
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} required>
                      <InputLabel>Price</InputLabel>
                      <Input
                        id="price"
                        value={product.price}
                        onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">RM </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  {/* categories */}
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        labelId="category"
                        id="category"
                        value={product.category}
                        onChange={(e) => {
                          setProduct({ ...product, category: e.target.value });
                        }}
                      >
                        {categories &&
                          categories.map((category, index) => (
                            <MenuItem key={index} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* brand */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Product Brand"
                      id="brand"
                      required
                      fullWidth
                      value={product.brand}
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* shipfrom */}
                  <Grid item xs={12}>
                    <TextField
                      label="Ship From"
                      id="shipFrom"
                      required
                      fullWidth
                      value={product.shipFrom}
                      onChange={handleChange}
                    />
                  </Grid>
                  {/* desc */}
                  <Grid item xs={12}>
                    <TextField
                      id="desc"
                      label="Product Description"
                      multiline
                      fullWidth
                      variant="outlined"
                      required
                      value={product.desc}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Box height="5px" />

                <DropzoneArea onChange={handleImages} />

                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>

          {/* </Container> */}
        </div>
      </Container>
    </React.Fragment>
  );
}
