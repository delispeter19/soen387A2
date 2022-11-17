import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authActions";

// MUI
import {
  Grid,
  Toolbar,
  Tooltip,
  Button,
  Typography,
  AppBar,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

function Header(props) {
  const handleLogout = (e) => {
    props.logout();
  };

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar
      color="primary"
      position="sticky"
      elevation={6}
      sx={{ zIndex: 100 }}
    >
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <Typography
              color="inherit"
              variant="h5"
              align="left"
              component="h1"
            >
              Assignment 2
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Header);
