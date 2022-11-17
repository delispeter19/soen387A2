<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.util.stream.Collectors"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="javax.xml.bind.TypeConstraintException"%>
<%@ page import="com.a2.Models.Course"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    Course course;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        course = new Course(db);

        JSONObject data = new JSONObject(request.getReader().lines()
            .collect(Collectors.joining(System.lineSeparator())));

        course.courseCode = data.getInt("course_code");
        course.courseTitle = data.getString("course_title");
        course.roomNumber = data.getString("room_number");
        course.instructor = data.getString("instructor");
        course.days = data.getString("days");
        course.courseTime = data.getString("course_time");
        course.semester = data.getString("semester");
        course.startDate = data.getString("start_date");
        course.endDate = data.getString("end_date");

        if (course.update()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", course.toJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
            payload.put("message", "Course update failed. No rows affected.");
            payload.put("error", "Course code not found.");
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
