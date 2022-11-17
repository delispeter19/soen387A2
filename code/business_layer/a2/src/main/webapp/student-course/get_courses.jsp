<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.json.JSONArray"%>
<%@ page import="com.a2.GatewayUtils.GatewayFinder"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    GatewayFinder finder;
    JSONArray courses;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        finder = new GatewayFinder(db);

        long studentId = Long.parseLong(request.getParameter("id"));

        courses = finder.findCoursesByStudent(studentId);

        if(courses.isEmpty()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "No Courses found for this Student!");
            payload.put("data", courses);
        } else {
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", courses);
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
