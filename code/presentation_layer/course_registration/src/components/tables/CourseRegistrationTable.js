import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addStudentCourse, getCoursesByStudent } from "../../redux/actions/studentCourseActions";
import { getCourses } from "../../redux/actions/courseActions";
import { createMessage } from "../../redux/actions/messageActions";

// MUI
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@mui/material";

function CourseRegistrationTable(props) {
    const { onClose } = props;

    useEffect(() => {
        props.getCourses();
    }, []);

    const registerCourse = (code) => {
        props.addStudentCourse(props.auth.user.id, code);
        onClose();
    };

  return (
    <Fragment>
    {props.courses.length == 0 ? (
      <Typography variant="h3">
          No Courses Available!
      </Typography>
    ) : (
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
                  color="success"
                  onClick={() => registerCourse(item["course_code"])}
                  >
                  Register
                  </Button>
              </TableCell>
              </TableRow>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
    )}
    </Fragment>
  );
}

CourseRegistrationTable.propTypes = {
  auth: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  courses: state.courseReducer.courses,
});

export default connect(mapStateToProps, {
    getCourses,
    getCoursesByStudent,
    addStudentCourse,
    createMessage,
})(CourseRegistrationTable);
