import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../configs/firebaseConfig"
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom'

import { editUserAction} from "../redux/actions/authActions"

//////////////////////////////////////////
// must modify all three input only can successfully change
/////////////////////////////////////////

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright ©OSMeS "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

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
  link: {
    display: "block",
    width: "auto",
    height: "110%",
  },
  logoNew: {
    display: "block",
    width: "50%",
    height: "50%",
    padding: "20px 50px 10px 50px",
  },
}));

export default function EditUserPage() {
    const auth = useSelector((state) => state.firebase.profile);
    
    console.log(auth);
    const [editUser, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        //gender: "",
    });

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUserAction(editUser, history));
    };

    const handleChange = (e) => {
        setUser({
        ...editUser,
        [e.target.id]: e.target.value,
        });
    };

    const handleLoad = (e) => {
        setUser({
        ...editUser,
        [e.target.id]: e.target.defaultValue,
        });
    };


    if (!firebase.auth.isEmpty && firebase.auth.isLoaded)
    return <Redirect to="/" />;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid align="center">
                    <Link position="static" className={classes.link} to="/"><img src={"images/logo.png"}className={classes.logoNew}/></Link>
                </Grid>
                <Typography component="h1" variant="h5" align="center">
                    <h4>Profile Management</h4>
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <label >
                                First Name
                                <input type="text" id="firstName" name="firstName" defaultValue={auth.firstName} onLoad={handleLoad} onChange={handleChange} />
                            </label>
                        </Grid>
                        <Grid item xs={12} >
                            <label width="200%">
                                Last Name
                                <input type="text" id="lastName" name="lastName" defaultValue={auth.lastName} onLoad={handleLoad} onChange={handleChange} />
                            </label>
                        </Grid>
                        <Grid item xs={12} >
                            <label>
                                Phone Number
                                <input type="text" id="phone" name="phone" defaultValue={auth.phone} onLoad={handleLoad} onChange={handleChange} />
                            </label>
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup 
                                name="gender"
                                value={auth.gender}
                                onChange={handleChange}>
                                <Grid>
                                <FormControlLabel
                                value="female"
                                control={<Radio id="gender" />}
                                label="Female"
                                />
                                <FormControlLabel
                                value="male"
                                control={<Radio id="gender" />}
                                label="Male"
                                />
                                </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
        
    );
}
