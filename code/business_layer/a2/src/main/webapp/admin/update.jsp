<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.util.stream.Collectors"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="javax.xml.bind.TypeConstraintException"%>
<%@ page import="com.a2.Models.Administrator"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Administrator admin;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        admin = new Administrator(db);

        JSONObject data = new JSONObject(request.getReader().lines()
            .collect(Collectors.joining(System.lineSeparator())));

        admin.id = data.getLong("employment_id");
        admin.email = data.getString("email");
        admin.password = data.getString("password");
        admin.firstName = data.getString("first_name");
        admin.lastName = data.getString("last_name");
        admin.phoneNumber = data.getString("phone_number");
        admin.address = data.getString("address");
        admin.dateOfBirth = data.getString("date_of_birth");

        if (admin.update()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", admin.toJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Admin update failed. No rows affected.");
            payload.put("error", "Admin id not found.");
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
