import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { registerAdmin } from "../../redux/actions/authActions";
import { createMessage } from "../../redux/actions/messageActions";

// MUI
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

function AdminSignUp(props) {
  const { redirect } = props;

  let navigate = useNavigate();

  const emptyForm = {
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
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
    if (validRegistration()){
        const {
          email,
          password,
          confirm_password,
          address,
          first_name,
          last_name,
          phone_number,
          date_of_birth
        } = state;
    
        if (password !== confirm_password) {
          props.createMessage({ passwordsDoNotMatch: "Passwords do not match" });
        } else {
          const newAdmin = {
            email,
            password,
            address,
            first_name,
            last_name,
            phone_number,
            date_of_birth
          };
          props.registerAdmin(newAdmin);
          navigate(`${redirect}`);
        }
    }
  };

  const validRegistration = () => {
    let temp = {}

    const emailRegEx = (/$^|.+@.+..+/);
    const phoneRegEx = (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);

    temp.first_name = state.first_name? "" : "This field is required";
    temp.last_name = state.last_name? "" : "This field is required";
    temp.phone_number = phoneRegEx.test(state.phone_number)? "" : "Invalid Phone Number. Please use (XXX) XXX-XXXX";
    temp.email = emailRegEx.test(state.email)? "" : "Invalid Email";
    temp.password = state.password.length > 7 ? "" : "Minimum 8 characters required";
    
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Admin Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="first_name"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            autoFocus
                            value={state.first_name}
                            onChange={handleChange}
                            {...(errors.first_name && {error: true, helperText: errors.first_name} )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            autoComplete="family-name"
                            value={state.last_name}
                            onChange={handleChange}
                            {...(errors.last_name && {error: true, helperText: errors.last_name} )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="address"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            value={state.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="phone_number"
                            required
                            fullWidth
                            id="phone_number"
                            label="Phone Number"
                            value={state.phone_number}
                            onChange={handleChange}
                            {...(errors.phone_number && {error: true, helperText: errors.phone_number} )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="date_of_birth"
                            name="date_of_birth"
                            label="Date of birth"
                            type="date"
                            required
                            fullWidth
                            InputLabelProps={{
                            shrink: true,
                            }}
                            value={state.date_of_birth}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={state.email}
                            onChange={handleChange}
                            {...(errors.email && {error: true, helperText: errors.email} )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={state.password}
                            onChange={handleChange}
                            {...(errors.password && {error: true, helperText: errors.password} )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            value={state.confirm_password}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Link href="/admin/login" variant="body2">
                            Already have an account? Sign in
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

AdminSignUp.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
};

export default connect(null, { registerAdmin, createMessage })(AdminSignUp);
