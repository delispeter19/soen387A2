package com.a2.GatewayUtils;

import com.a2.Enums.AdminSQL;
import com.a2.Enums.CourseSQL;
import com.a2.Enums.StudentCourseSQL;
import com.a2.Enums.StudentSQL;
import com.a2.Models.Administrator;
import com.a2.Models.Course;
import com.a2.Models.Student;
import com.a2.Models.StudentCourse;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class GatewayFinder {
    private final Connection conn;

    public GatewayFinder(Connection db){
        conn = db;
    }

    public JSONArray findStudents() throws SQLException {
        try(Statement stmt = conn.createStatement()){
            try(ResultSet rs = stmt.executeQuery(StudentSQL.SELECT.getQuery())){
                List<JSONObject> students = new ArrayList<>();
                Student student = new Student();
                while(rs.next()) {
                    student.load(rs);
                    students.add(student.toJson());
                }

                return new JSONArray(students);
            }
        }
    }

    public JSONArray findAdmins() throws SQLException {
        try(Statement stmt = conn.createStatement()){
            try(ResultSet rs = stmt.executeQuery(AdminSQL.SELECT.getQuery())){
                List<JSONObject> admins = new ArrayList<>();
                Administrator admin = new Administrator();
                while(rs.next()) {
                    admin.load(rs);
                    admins.add(admin.toJson());
                }

                return new JSONArray(admins);
            }
        }
    }

    public JSONArray findCourses() throws SQLException {
        try(Statement stmt = conn.createStatement()){
            try(ResultSet rs = stmt.executeQuery(CourseSQL.SELECT.getQuery())){
                List<JSONObject> courses = new ArrayList<>();
                Course course = new Course();
                while(rs.next()) {
                    course.load(rs);
                    courses.add(course.toJson());
                }

                return new JSONArray(courses);
            }
        }
    }

    public JSONArray findStudentCourses() throws SQLException {
        try(Statement stmt = conn.createStatement()){
            try(ResultSet rs = stmt.executeQuery(StudentCourseSQL.SELECT.getQuery())){
                List<JSONObject> studentCourses = new ArrayList<>();
                StudentCourse studentCourse = new StudentCourse();
                while(rs.next()) {
                    studentCourse.load(rs);
                    studentCourses.add(studentCourse.toJson());
                }

                return new JSONArray(studentCourses);
            }
        }
    }

    public JSONArray findStudentsByCourse(int courseCode) throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.SELECT_STUDENTS.getQuery())){
            stmt.setInt(1, courseCode);
            try(ResultSet rs = stmt.executeQuery()){
                List<JSONObject> students = new ArrayList<>();
                Student student = new Student();
                while(rs.next()) {
                    student.load(rs);
                    students.add(student.toJson());
                }

                return new JSONArray(students);
            }
        }
    }

    public JSONArray findCoursesByStudent(long studentId) throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.SELECT_COURSES.getQuery())){
            stmt.setLong(1, studentId);
            try(ResultSet rs = stmt.executeQuery()){
                List<JSONObject> courses = new ArrayList<>();
                Course course = new Course();
                while(rs.next()) {
                    course.load(rs);
                    courses.add(course.toJson());
                }

                return new JSONArray(courses);
            }
        }
    }
}
