<%@ page import="com.a2.Database"%>
<%@ page import="com.a2.Models.Student"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.util.stream.Collectors"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="javax.xml.bind.TypeConstraintException"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Student student;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        student = new Student(db);

        JSONObject data = new JSONObject(request.getReader().lines()
            .collect(Collectors.joining(System.lineSeparator())));

        student.id = data.getLong("id");
        student.email = data.getString("email");
        student.password = data.getString("password");
        student.firstName = data.getString("first_name");
        student.lastName = data.getString("last_name");
        student.phoneNumber = data.getString("phone_number");
        student.address = data.getString("address");
        student.dateOfBirth = data.getString("date_of_birth");

        if (student.update()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", student.toJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Student update failed. No rows affected.");
            payload.put("error", "Student id not found.");
        }

    } catch(org.json.JSONException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", "Incorrect or Missing field name(s) in request body!");
        payload.put("error", e);
    } catch(TypeConstraintException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", e.getMessage());
        payload.put("error", e.getLinkedException());
    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }
%>

<%= payload %>
