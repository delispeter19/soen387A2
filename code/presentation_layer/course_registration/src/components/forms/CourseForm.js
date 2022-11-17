// Proof of concept for sending emails to
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addCourse } from "../../redux/actions/courseActions";

// MUI
import {
  Typography,
  Button,
  Box,
  Container,
  TextField
} from "@mui/material";

function CourseForm(props) {
    const { onClose } = props;

    const emptyCourse = {
        course_code: "",
        course_title: "",
        room_number: "",
        instructor: "",
        days: "",
        course_time: "",
        semester: "",
        start_date: "",
        end_date: ""
    };
    
    const [courseData, setCourseData] = useState(emptyCourse);
    const [errors, setErrors] = useState({});

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const semesters = ["Fall", "Winter"];

    const onChange = (e) =>
        setCourseData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    const createCourse = (e) => {
        e.preventDefault();
        if (validCourse()){
            console.log("herr");
            props.addCourse(courseData);
            onClose();
        }
    };

    const validCourse = () => {
        let temp = {};

        const digitsRegEx = (/^\d+$/);
        const roomRegEx = (/^[HEF]-\d{3}$/);
        const courseTimeRegEx = (/\d{2}:\d{2}-\d{2}:\d{2}$/);
        const start_date = new Date(courseData.start_date);
        const end_date = new Date(courseData.end_date); 
    
        temp.course_code = (courseData.course_code.length == 3 && digitsRegEx.test(courseData.course_code))? "" : "Course Code must be 3 digits";
        temp.room_number = roomRegEx.test(courseData.room_number)? "" : "Invalid Room Number. Please use H|E|F-XXX";
        temp.days = days.includes(courseData.days)? "" : "Invalid Week Day. Please Capitalize first letter and no weekends!";
        temp.course_time = courseTimeRegEx.test(courseData.course_time)? "" : "Invalid Time. Please use XX:XX-XX:XX";
        temp.semester = semesters.includes(courseData.semester)? "" : "Invalid Semester. Please use Fall or Winter";
        temp.end_date = (end_date > start_date) ? "" : "End date must be after start date";
        
        setErrors({ ...temp });
    
        return Object.values(temp).every(helperText => helperText == "");
    };

  return (
    <Box component="form" onSubmit={createCourse}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            alignItems: "center",
          }}
        >
            <Typography  align="left" variant="subtitle1">
                Course Code
            </Typography>
            <TextField
                margin="dense"
                required
                placeholder="Course Code"
                name="course_code"
                autoFocus
                fullWidth
                onChange={onChange}
                value={courseData.course_code}
                {...(errors.course_code && {error: true, helperText: errors.course_code} )}
            />
            <Typography  align="left" variant="subtitle1">
                Course Title
            </Typography>
            <TextField 
                margin="dense"
                required
                placeholder="Course Title"
                name="course_title"
                autoFocus
                fullWidth
                onChange={onChange}
                value={courseData.course_title}
            />
            <Typography  align="left" variant="subtitle1">
                Room Number
            </Typography>
            <TextField 
                margin="dense"
                required
                placeholder="Room Number"
                name="room_number"
                autoFocus
                fullWidth
                onChange={onChange}
                value={courseData.room_number}
                {...(errors.room_number && {error: true, helperText: errors.room_number} )}
            />
            <Typography  align="left" variant="subtitle1">
                Instructor
            </Typography>
            <TextField
                margin="dense"
                required
                placeholder="Instructor"
                name="instructor"
                autoFocus
                fullWidth
                value={courseData.instructor}
                onChange={onChange}
            />
            <Typography  align="left" variant="subtitle1">
                Days
            </Typography>
            <TextField
                margin="dense"
                required
                placeholder="Days"
                name="days"
                autoFocus
                fullWidth
                value={courseData.days}
                onChange={onChange}
                {...(errors.days && {error: true, helperText: errors.days} )}
            />
            <Typography  align="left" variant="subtitle1">
                Time
            </Typography>
            <TextField
                margin="dense"
                required
                placeholder="Time"
                name="course_time"
                autoFocus
                fullWidth
                value={courseData.course_time}
                onChange={onChange}
                {...(errors.course_time && {error: true, helperText: errors.course_time} )}
            />
            <Typography  align="left" variant="subtitle1">
                Semester
            </Typography>
            <TextField
                margin="dense"
                required
                placeholder="Semester"
                name="semester"
                autoFocus
                fullWidth
                value={courseData.semester}
                onChange={onChange}
                {...(errors.semester && {error: true, helperText: errors.semester} )}
            />
            <Typography  align="left" variant="subtitle1">
                Start Date
            </Typography>
            <TextField
                margin="none"
                required
                placeholder="Start Date"
                name="start_date"
                type={"date"}
                autoFocus
                fullWidth
                value={courseData.start_date}
                onChange={onChange}
            />
            <Typography  align="left" variant="subtitle1">
                End Date
            </Typography>
            <TextField
                margin="none"
                required
                placeholder="End Date"
                name="end_date"
                type={"date"}
                autoFocus
                fullWidth
                value={courseData.end_date}
                onChange={onChange}
                {...(errors.end_date && {error: true, helperText: errors.end_date} )}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create
            </Button>
        </Box>
      </Container>
    </Box>
  );
}

CourseForm.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

export default connect(null, { addCourse })(CourseForm);
