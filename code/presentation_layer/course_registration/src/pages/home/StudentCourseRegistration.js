import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import StudentCourses from "../../components/layout/StudentCourses";

import {
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
  } from "@mui/material";

function StudentCourseRegistration(props){

  return (
    <Card align="center">
        <CardContent>
            <Typography
            variant="h5"
            align="left"
            gutterBottom
            component="div"
            >
                Welcome {props.auth.user.first_name}!
            </Typography>

            <Divider />

            <Grid 
              container
              sx={{pt: 3}}
            >

              <Grid item xs>
                <StudentCourses student_id={props.auth.user.id} />
              </Grid>

            </Grid>
        </CardContent>
    </Card>
  )
}

StudentCourseRegistration.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(StudentCourseRegistration);