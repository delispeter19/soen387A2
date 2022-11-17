import { React, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

function PrivateRoute(props) {

  const { redirect } = props;

  let navigate = useNavigate();

  useEffect(() => {
    if (props.auth.isAuthenticated !== null && !props.auth.isAuthenticated) {
      navigate(`${redirect}`);
    }
  });

  if (props.auth.isLoading) {
    return <Spinner />;
  } else if (!props.auth.isAuthenticated) {
    return null;
  } else {
    return <Outlet />;
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
