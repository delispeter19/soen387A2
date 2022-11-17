<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="com.a2.Models.StudentCourse"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    StudentCourse studentCourse;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        studentCourse = new StudentCourse(db);

        studentCourse.studentId = Long.parseLong(request.getParameter("id"));
        studentCourse.courseCode = Integer.parseInt(request.getParameter("code"));

        if(studentCourse.getRow()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", studentCourse.toJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Student-Course does not exist!");
        }

    } catch(NumberFormatException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", "Could not parse id!");
    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }
%>

<%= payload %>
