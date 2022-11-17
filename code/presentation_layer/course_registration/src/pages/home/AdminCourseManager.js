import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AdminCourseTable from "../../components/tables/AdminCourseTable";
import AdminStudentTable from "../../components/tables/AdminStudentTable";

import {
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
  } from "@mui/material";

function AdminCourseManager(props){

  return (
    <Card align="center">
        <CardContent>
            <Typography
            variant="h5"
            align="left"
            gutterBottom
            component="div"
            >
                Welcome Admin {props.auth.user.first_name}!
            </Typography>

            <Divider />

            <Grid 
              container
              spacing={1}
            >
                <Grid item xs={12} sx={{mx: 5}}>
                    <AdminCourseTable />
                </Grid>
                <Grid item xs={12} sx={{mx: 5}}>
                    <AdminStudentTable />
                </Grid>

            </Grid>
        </CardContent>
    </Card>
  )
}

AdminCourseManager.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(AdminCourseManager);