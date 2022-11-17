package com.a2.Models;

import com.a2.Enums.CourseSQL;
import com.a2.Interfaces.RowGateway;
import org.json.JSONObject;

import javax.xml.bind.TypeConstraintException;
import java.sql.*;

public class Course implements RowGateway {
    public int courseCode;
    public String courseTitle;
    public String roomNumber;
    public String instructor;
    public String days;
    public String courseTime;
    public String semester;
    public String startDate;
    public String endDate;

    private Connection conn = null;

    public Course(){

    }

    public Course(Connection db){
        conn = db;
    }

    public JSONObject toJson(){
        JSONObject json = new JSONObject();
        json.put("course_code", courseCode);
        json.put("course_title", courseTitle);
        json.put("room_number", roomNumber);
        json.put("instructor", instructor);
        json.put("days", days);
        json.put("course_time", courseTime);
        json.put("semester", semester);
        json.put("start_date", startDate);
        json.put("end_date", endDate);

        return json;
    }

    public void load(ResultSet rs) throws SQLException {
        courseCode = rs.getInt("course_code");
        courseTitle = rs.getString("course_title");
        roomNumber = rs.getString("room_number");
        instructor = rs.getString("instructor");
        days = rs.getString("days");
        courseTime = rs.getString("course_time");
        semester = rs.getString("semester");
        startDate = rs.getString("start_date");
        endDate = rs.getString("end_date");
    }

    public boolean getRow() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.SELECT_ROW.getQuery())){
            stmt.setInt(1, courseCode);
            try(ResultSet rs = stmt.executeQuery()){

                if(rs.next()){
                    load(rs);

                    return true;
                }

                return false;
            }
        }
    }

    public boolean post() throws SQLException, TypeConstraintException {
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.INSERT.getQuery(), Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, courseCode);
            stmt.setString(2, courseTitle);
            stmt.setString(3, roomNumber);
            stmt.setString(4, instructor);
            stmt.setString(5, days);
            stmt.setString(6, courseTime);
            stmt.setString(7, semester);
            stmt.setString(8, startDate);
            stmt.setString(9, endDate);

            int numRows;

            try {
                numRows = stmt.executeUpdate();
            } catch(SQLException e){
                throw new TypeConstraintException("One or more values do not follow column type constraints!", e);
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                // Might be redundant
                if (numRows > 0 && generatedKeys.next()) {
                    courseCode = generatedKeys.getInt(1);
                    return true;
                }

                return false;
            }
        }
    }

    public boolean update() throws SQLException{
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.UPDATE.getQuery())) {
            stmt.setString(1, courseTitle);
            stmt.setString(2, roomNumber);
            stmt.setString(3, instructor);
            stmt.setString(4, days);
            stmt.setString(5, courseTime);
            stmt.setString(6, semester);
            stmt.setString(7, startDate);
            stmt.setString(8, endDate);
            stmt.setInt(9, courseCode);

            int numRows;

            try {
                numRows = stmt.executeUpdate();
            } catch(SQLException e){
                throw new TypeConstraintException("One or more values do not follow column type constraints!", e);
            }

            return numRows > 0;
        }
    }

    public boolean delete() throws SQLException{
        try(PreparedStatement stmt = conn.prepareStatement(CourseSQL.DELETE.getQuery())) {
            stmt.setInt(1, courseCode);

            int numRows = stmt.executeUpdate();

            return numRows > 0;
        }
    }
}
