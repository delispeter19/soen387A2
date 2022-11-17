import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoursesByStudent, deleteStudentCourse } from "../../redux/actions/studentCourseActions";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

function StudentCoursesTable(props) {

    const { student_id } = props

    useEffect(() => {
        props.getCoursesByStudent(student_id);
    }, []);

    const dropCourse = (code) => {
        props.deleteStudentCourse(student_id, code);
    };
    
    return (
        <TableContainer
        component={Paper}
        sx={{ width: "100%", margin: "auto", my: 2 }}
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
                    <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => dropCourse(item["course_code"])}
                    >
                    Drop
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

StudentCoursesTable.propTypes = {
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.studentCourseReducer.courses,
});

export default connect(mapStateToProps, {
    getCoursesByStudent,
    deleteStudentCourse,
})(StudentCoursesTable);
