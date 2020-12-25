import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { editUserAction} from "../redux/actions/authActions"

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
}));



export default function AddProductFrom() {
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



    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
            <h4>Profile Management</h4>
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            {"First Name: "}
                        </Typography>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            autoFocus
                            name="firstName"
                            autoComplete="fname"
                            value={auth.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            {"Last Name: "}
                        </Typography>
                        <TextField 
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            name="lastName"
                            autoComplete="lname"
                            value={auth.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            {"Phone Number: "}
                        </Typography>
                        <TextField 
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            name="lastName"
                            autoComplete="lname"
                            value={auth.phone}
                            onChange={handleChange}
                        />
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
