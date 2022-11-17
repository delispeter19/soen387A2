import React, { useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginAdmin } from "../../redux/actions/authActions";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
  } from "@mui/material";

function AdminLogin(props){

    const emptyForm = {
        email: "",
        password: "",
      };
    
      // Store form data in state
      const [state, setState] = useState(emptyForm);
      const [errors, setErrors] = useState({});
    
      // Change form data in state at each change
      const handleChange = (e) =>
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validLogin()) {
            props.loginAdmin(state.email, state.password);
        }
      };

      const validLogin = () => {
        let temp = {}

        const emailRegEx = (/$^|.+@.+..+/);

        temp.email = emailRegEx.test(state.email)? "" : "Invalid Email";
        
        setErrors({ ...temp });

        return Object.values(temp).every(helperText => helperText == "");
    };
    
      return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        value={state.email}
                        onChange={handleChange}
                        {...(errors.email && {error: true, helperText: errors.email} )}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Link href="/admin/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/user-type" variant="body2">
                                I am not an Admin
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
      );
    }
    
    AdminLogin.propTypes = {
        loginAdmin: PropTypes.func.isRequired,
    };
    
    export default connect(null, { loginAdmin })(AdminLogin);
    