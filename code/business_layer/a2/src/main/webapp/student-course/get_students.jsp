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
    JSONArray students;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        finder = new GatewayFinder(db);

        int courseCode = Integer.parseInt(request.getParameter("code"));

        students = finder.findStudentsByCourse(courseCode);

        if(students.isEmpty()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "No Students found for this Course!");
            payload.put("data", students);
        } else {
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", students);
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
