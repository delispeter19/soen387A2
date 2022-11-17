import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents } from "../../redux/actions/studentActions"; 

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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

import CoursesByStudentDialog from "../dialogs/CoursesByStudentDialog";

function AdminStudentTable(props) {
    const [open, setOpen] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [studentName, setStudentName] = useState("");

    useEffect(() => {
      props.getStudents();
    }, []);

    const handleDialogOpen = (id, name) => {
        setStudentId(id);
        setStudentName(name);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    if (props.students.length == 0) {
        return (
            <Fragment>
                <CoursesByStudentDialog open={open} onClose={handleDialogClose} student_id={studentId} student_name={studentName} />
                <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                    No Students!
                </Typography>
            </Fragment>
        );
    } else {
        return (
        <Fragment>
            <CoursesByStudentDialog open={open} onClose={handleDialogClose} student_id={studentId} student_name={studentName} />
            <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
                Students
            </Typography>
            <TableContainer
            component={Paper}
            sx={{ width: "100%", margin: "auto", my: 6 }}
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
                    <TableCell>See Courses</TableCell>
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
                        <Tooltip title="See Courses">
                            <IconButton 
                                sx={{ ml: 1 }} 
                                size="large" 
                                color="primary" 
                                onClick={() => handleDialogOpen(item["id"], item["first_name"])}
                            >
                                <LibraryBooksIcon />
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

AdminStudentTable.propTypes = {
  auth: PropTypes.object.isRequired,
  students: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  students: state.studentReducer.students,
});

export default connect(mapStateToProps, {
    getStudents
})(AdminStudentTable);
