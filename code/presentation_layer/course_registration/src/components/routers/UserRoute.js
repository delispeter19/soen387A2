import { React, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function UserRoute(props) {

  const { redirect, type } = props;

  let navigate = useNavigate();

  useEffect(() => {
    if (props.auth.userType !== null && props.auth.userType !== type) {
      navigate(`${redirect}`);
    }
  });

  if (props.auth.userType !== type) {
    return null;
  } else {
    return <Outlet />;
  }
}

UserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(UserRoute);
