package com.a2.Models;

import com.a2.Enums.CourseSQL;
import com.a2.Enums.StudentCourseSQL;
import com.a2.Interfaces.RowGateway;
import org.json.JSONObject;

import javax.xml.bind.TypeConstraintException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class StudentCourse implements RowGateway {
    public int courseCode;
    public Long studentId;

    private Connection conn = null;

    public StudentCourse(){

    }

    public StudentCourse(Connection db){
        conn = db;
    }

    public JSONObject toJson(){
        JSONObject json = new JSONObject();
        json.put("student_id", studentId);
        json.put("course_code", courseCode);

        return json;
    }

    public void load(ResultSet rs) throws SQLException {
        studentId = rs.getLong("student_id");
        courseCode = rs.getInt("course_code");
    }

    public boolean getRow() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.SELECT_ROW.getQuery())){
            stmt.setLong(1, studentId);
            stmt.setInt(2, courseCode);
            try(ResultSet rs = stmt.executeQuery()){

                if(rs.next()){
                    load(rs);

                    return true;
                }

                return false;
            }
        }
    }

    public boolean post() throws SQLException, TypeConstraintException, ParseException {
        if (isLessThan5Courses() && isLessThan1WeekAfterStart()){
            return postVerified();
        } else {
            return false;
        }
    }

    public boolean update() throws SQLException {
        return false;
    }

    public boolean delete() throws SQLException, ParseException {
        if (isBeforeEndOfSemester()){
            return deleteVerified();
        } else {
            return false;
        }
    }

    public JSONObject getCourseAsJson() throws SQLException {
        Course course = new Course(conn);

        course.courseCode = courseCode;

        course.getRow();

        return course.toJson();
    }

    private boolean postVerified() throws SQLException, TypeConstraintException {
        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.INSERT.getQuery())) {
            stmt.setLong(1, studentId);
            stmt.setInt(2, courseCode);

            int numRows;

            try {
                numRows = stmt.executeUpdate();
            } catch(SQLException e){
                throw new TypeConstraintException("One or more values do not follow column type constraints!", e);
            }

            return numRows > 0;
        }
    }

    private boolean deleteVerified() throws SQLException{
        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.DELETE.getQuery())) {
            stmt.setLong(1, studentId);
            stmt.setInt(2, courseCode);

            int numRows = stmt.executeUpdate();

            return numRows > 0;
        }
    }

    private boolean isBeforeEndOfSemester() throws SQLException, ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = sdf.parse(getEndDate());
        Date now = new Date();
        TimeUnit timeUnit = TimeUnit.DAYS;

        return timeUnit.convert(now.getTime()-startDate.getTime(),TimeUnit.MILLISECONDS) < 0;
    }

    private boolean isLessThan1WeekAfterStart() throws SQLException, ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = sdf.parse(getStartDate());
        Date now = new Date();
        TimeUnit timeUnit = TimeUnit.DAYS;

        return timeUnit.convert(now.getTime()-startDate.getTime(),TimeUnit.MILLISECONDS) <= 7;
    }

    private boolean isLessThan5Courses() throws SQLException {
        String semester = getSemester();

        try(PreparedStatement stmt = conn.prepareStatement(StudentCourseSQL.SELECT_NUM_COURSES_BY_SEMESTER.getQuery())) {
            stmt.setString(1, semester);
            stmt.setLong(2, studentId);

            try(ResultSet rs = stmt.executeQuery()){
                rs.next();
                int numCourseForSemester = rs.getInt("numberOfCourses");

                return numCourseForSemester < 5;
            }
        }
    }

    private String getSemester() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.SELECT_SEMESTER.getQuery())){
            stmt.setInt(1, courseCode);
            try(ResultSet rs = stmt.executeQuery()){
                rs.next();
                return rs.getString("semester");
            }
        }
    }

    private String getStartDate() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.SELECT_START_DATE.getQuery())){
            stmt.setInt(1, courseCode);
            try(ResultSet rs = stmt.executeQuery()){
                rs.next();
                return rs.getString("start_date");
            }
        }
    }

    private String getEndDate() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.SELECT_END_DATE.getQuery())){
            stmt.setInt(1, courseCode);
            try(ResultSet rs = stmt.executeQuery()){
                rs.next();
                return rs.getString("end_date");
            }
        }
    }
}
