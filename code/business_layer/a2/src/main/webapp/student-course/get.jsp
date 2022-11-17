<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="com.a2.GatewayUtils.GatewayFinder"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    GatewayFinder finder;
    JSONArray studentCourses;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        finder = new GatewayFinder(db);
        studentCourses = finder.findStudentCourses();

        if(studentCourses.isEmpty()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "No Student-Courses Found");
            payload.put("data", studentCourses);
        } else {
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", studentCourses);
        }

    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }
%>

<%= payload %>
