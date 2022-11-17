import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourses, deleteCourse } from "../../redux/actions/courseActions";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Paper,
    Typography,
    Button,
} from "@mui/material";

import CreateCourseDialog from "../dialogs/CreateCourseDialog";
import StudentsByCourseDialog from "../dialogs/StudentsByCourseDialog";

function AdminCourseTable(props) {
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [courseCode, setCourseCode] = useState(null);

    useEffect(() => {
      props.getCourses();
    }, []);

    const handleDialogOpen = (code) => {
        setCourseCode(code);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleFormDialogOpen = () => {
        setOpenForm(true);
    };

    const handleFormDialogClose = () => {
        setOpenForm(false);
    };

    const removeCourse = (code) => {
        props.deleteCourse(code);
    };

    if (props.courses.length == 0) {
        return (
            <Fragment>
                <StudentsByCourseDialog open={open} onClose={handleDialogClose} course_code={courseCode} />
                <CreateCourseDialog open={openForm} onClose={handleFormDialogClose} />
                <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                    No Courses!
                    <Tooltip title="Create Course">
                        <IconButton sx={{ ml: 1 }} size="large" color="success" onClick={handleFormDialogOpen} >
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                </Typography>
            </Fragment>
        );
    } else {
        return (
        <Fragment>
            <StudentsByCourseDialog open={open} onClose={handleDialogClose} course_code={courseCode} />
            <CreateCourseDialog open={openForm} onClose={handleFormDialogClose} />
            <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                School Courses
                <Tooltip title="Create Course">
                    <IconButton sx={{ ml: 1 }} size="large" color="success" onClick={handleFormDialogOpen} >
                        <AddCircleIcon />
                    </IconButton>
                </Tooltip>
            </Typography>
            <TableContainer
            component={Paper}
            sx={{ width: "100%", margin: "auto", my: 6 }}
            >
            <Table sx={{ minWidth: "sm" }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Room Number</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>See Students</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.courses.map((item, i) => (
                    <TableRow
                    key={i + "0"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                    <TableCell key={i + "1"}>{item["course_code"]}</TableCell>
                    <TableCell key={i + "2"}>{item["course_title"]}</TableCell>
                    <TableCell key={i + "3"}>{item["room_number"]}</TableCell>
                    <TableCell key={i + "4"}>{item["instructor"]}</TableCell>
                    <TableCell key={i + "5"}>{item["days"]}</TableCell>
                    <TableCell key={i + "6"}>{item["course_time"]}</TableCell>
                    <TableCell key={i + "7"}>{item["semester"]}</TableCell>
                    <TableCell key={i + "8"}>{item["start_date"]}</TableCell>
                    <TableCell key={i + "9"}>{item["end_date"]}</TableCell>
                    <TableCell>
                        <Tooltip title="See Students">
                            <IconButton 
                                sx={{ ml: 1 }} 
                                size="large" 
                                color="primary" 
                                onClick={() => handleDialogOpen(item["course_code"])}
                            >
                                <GroupsIcon />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    <TableCell>
                        <Tooltip title="Remove Course">
                            <IconButton 
                                sx={{ ml: 1 }} 
                                size="large" 
                                color="error" 
                                onClick={() => removeCourse(item["course_code"])}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Fragment>
        );
    }
}

AdminCourseTable.propTypes = {
  auth: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  courses: state.courseReducer.courses,
});

export default connect(mapStateToProps, {
    getCourses, 
    deleteCourse
})(AdminCourseTable);
