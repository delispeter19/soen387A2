<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="com.a2.Models.Course"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Course course;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        course = new Course(db);

        course.courseCode = Integer.parseInt(request.getParameter("code"));

        if (course.delete()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", course.courseCode);
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Course delete failed. No rows affected.");
            payload.put("error", "Course code not found.");
        }

    } catch(NumberFormatException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", "Could not parse course code!");
    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }
%>

<%= payload %>
