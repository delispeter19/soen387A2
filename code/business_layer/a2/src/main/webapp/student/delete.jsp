<%@ page import="com.a2.Database"%>
<%@ page import="com.a2.Models.Student"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Student student;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        student = new Student(db);

        student.id = Long.parseLong(request.getParameter("id"));

        if (student.delete()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", student.id);
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Student delete failed. No rows affected.");
            payload.put("error", "Student id not found.");
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
