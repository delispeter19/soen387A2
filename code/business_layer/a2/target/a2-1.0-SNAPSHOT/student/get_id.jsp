<%@ page import="com.a2.Database"%>
<%@ page import="com.a2.Models.Student"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="org.json.JSONObject"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Student student;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        student = new Student(db);

        student.id = Long.parseLong(request.getParameter("id"));

        if(student.getRow()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", student.toJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Student does not exist!");
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
