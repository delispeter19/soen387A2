<%@ page import="com.a2.Database"%>
<%@ page import="com.a2.Models.Student"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.util.stream.Collectors"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%><%@ page import="com.a2.Models.Token"%><%@ page import="com.a2.Enums.GatewayTypes"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Student student;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        student = new Student(db);

        JSONObject data = new JSONObject(request.getReader().lines()
            .collect(Collectors.joining(System.lineSeparator())));

        student.email = data.getString("email");
        student.password = data.getString("password");

        if (student.login()){
            Token token = new Token(db, student.id, GatewayTypes.STUDENT.getType());
            if(token.post()){
                response.setStatus(HttpURLConnection.HTTP_OK);
                payload.put("message", "Login Success");
                payload.put("user", student.toJson());
                payload.put("token", token.id);
                payload.put("type", "student");
            } else {
                response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
                payload.put("message", "Token creation failed. No rows affected.");
            }
        } else {
            response.setStatus(HttpURLConnection.HTTP_UNAUTHORIZED);
            payload.put("message", "Incorrect email/password!");
        }

    } catch(org.json.JSONException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", "Incorrect or Missing field name(s) in request body!");
        payload.put("error", e);
    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }
%>

<%= payload %>
