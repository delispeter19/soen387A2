import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudentsByCourse, deleteStudentCourse } from "../../redux/actions/studentCourseActions";

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

function CourseStudentsTable(props) {

    const { course_code } = props

    useEffect(() => {
        props.getStudentsByCourse(course_code);
    }, []);

    const dropStudent = (id) => {
        props.deleteStudentCourse(id, course_code);
    };
    
    return (
        <TableContainer
        component={Paper}
        sx={{ width: "100%", margin: "auto", my: 2 }}
        >
        <Table sx={{ minWidth: "sm" }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.students.map((item, i) => (
                <TableRow
                key={i + "0"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell key={i + "1"}>{item["id"]}</TableCell>
                <TableCell key={i + "2"}>{item["email"]}</TableCell>
                <TableCell key={i + "3"}>{item["password"]}</TableCell>
                <TableCell key={i + "4"}>{item["first_name"]}</TableCell>
                <TableCell key={i + "5"}>{item["last_name"]}</TableCell>
                <TableCell key={i + "6"}>{item["phone_number"]}</TableCell>
                <TableCell key={i + "7"}>{item["address"]}</TableCell>
                <TableCell key={i + "8"}>{item["date_of_birth"]}</TableCell>
                <TableCell>
                    <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => dropStudent(item["id"])}
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

CourseStudentsTable.propTypes = {
    students: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    students: state.studentCourseReducer.students,
});

export default connect(mapStateToProps, {
    getStudentsByCourse,
    deleteStudentCourse,
})(CourseStudentsTable);
