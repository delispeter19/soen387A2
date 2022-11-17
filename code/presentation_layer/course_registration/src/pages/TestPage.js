import React, { useEffect } from "react";
import "../App.css";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginStudent, logout } from "../redux/actions/authActions";
import { getStudents, addStudent, deleteStudent } from '../redux/actions/studentActions';
import { getAdmins, addAdmin, deleteAdmin } from '../redux/actions/adminActions';
import { getCourses, addCourse, deleteCourse } from '../redux/actions/courseActions';
import { getCoursesByStudent, getStudentsByCourse } from "../redux/actions/studentCourseActions";

import {
    Button,
    Box,
    Typography
} from "@mui/material";

function TestPage(props){

    useEffect(() => {
        props.getStudents();
      }, []);
    
      const handleRegister = (e) => {
        e.preventDefault();
        props.addStudent({
          "email": "darthPlagius@gmail.com",
          "password": "darkSide",
          "first_name": "Plagius",
          "last_name": "Palpatine",
          "phone_number": "37473926969",
          "address": "Death Start Blvd.",
          "date_of_birth": "3000-01-01"
        });
      };
    
      const handleLogin = (e) => {
        e.preventDefault();
        props.loginStudent("darthPlagius@gmail.com","darkSide");
      };
    
      const handleLogout = (e) => {
        e.preventDefault();
        props.logout();
      };

      const handleGetCourses = (e) => {
        e.preventDefault();
        props.getCoursesByStudent(354589347545);
      };

      const handleGetStudents = (e) => {
        e.preventDefault();
        props.getStudentsByCourse(445);
      };


    return (
        <header className="App-header">
        <Typography>{(props.auth.user && props.auth.user.email)?props.auth.user.email:"no email" }</Typography>
        <Box component="form" onSubmit={handleGetStudents} sx={{ mt: 1 }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            >
            Get 445 Students
            </Button>
        </Box>
        <Box component="form" onSubmit={handleGetCourses} sx={{ mt: 1 }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            >
            Get Vader's Classes
            </Button>
        </Box>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            >
            Register
            </Button>
        </Box>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
        </Box>
        <Box component="form" onSubmit={handleLogout} sx={{ mt: 1 }}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            >
            Logout
            </Button>
        </Box>
        </header>
      );
}

TestPage.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    admins: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    students: state.studentReducer.students,
    admins: state.adminReducer.admins,
    courses: state.courseReducer.courses,
    studentCourses: state.studentCourseReducer
});

export default connect(mapStateToProps, { getCoursesByStudent, getStudentsByCourse, loginStudent, logout, getStudents, addStudent, deleteStudent, getAdmins, addAdmin, deleteAdmin, getCourses, addCourse, deleteCourse })(TestPage);