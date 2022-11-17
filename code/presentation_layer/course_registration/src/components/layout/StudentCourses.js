import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoursesByStudent } from "../../redux/actions/studentCourseActions";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
    Tooltip,
    IconButton,
    Typography,
} from "@mui/material";

import CourseRegistrationDialog from "../dialogs/CourseRegistrationDialog";
import StudentCoursesTable from "../tables/StudentCoursesTable";

function StudentCourses(props) {

    const { student_id } = props;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        props.getCoursesByStudent(student_id);
      }, []);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    if (props.courses.length == 0) {
        return (
            <Fragment>
                <CourseRegistrationDialog open={open} onClose={handleDialogClose} />
                <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                    No Courses!
                    <Tooltip title="Register Course">
                        <IconButton sx={{ ml: 1 }} size="large" color="success" onClick={handleDialogOpen} >
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <CourseRegistrationDialog open={open} onClose={handleDialogClose} />
                <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                    My Courses
                    <Tooltip title="Register Course">
                        <IconButton sx={{ ml: 1 }} size="large" color="success" onClick={handleDialogOpen} >
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>

                <StudentCoursesTable student_id={ student_id } />

            </Fragment>
        );
    }
}

StudentCourses.propTypes = {
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.studentCourseReducer.courses,
});

export default connect(mapStateToProps, { getCoursesByStudent })(StudentCourses);
