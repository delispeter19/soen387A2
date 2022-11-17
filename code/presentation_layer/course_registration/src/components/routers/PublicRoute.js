import { React, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function PublicRoute(props) {

  const { redirect } = props;

  let navigate = useNavigate();

  useEffect(() => {
    if (props.auth.isAuthenticated !== null && props.auth.isAuthenticated) {
      navigate(`${redirect}`);
    }
  });

  if (props.auth.isAuthenticated) {
    return null;
  } else {
    return <Outlet />;
  }
}

PublicRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PublicRoute);
