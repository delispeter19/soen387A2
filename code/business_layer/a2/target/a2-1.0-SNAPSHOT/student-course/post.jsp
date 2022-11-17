<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.util.stream.Collectors"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="javax.xml.bind.TypeConstraintException"%>
<%@ page import="com.a2.Models.StudentCourse"%>
<%@ page import="java.text.ParseException"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    StudentCourse studentCourse;
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        studentCourse = new StudentCourse(db);

        JSONObject data = new JSONObject(request.getReader().lines()
            .collect(Collectors.joining(System.lineSeparator())));

        studentCourse.studentId = data.getLong("student_id");
        studentCourse.courseCode = data.getInt("course_code");

        if (studentCourse.post()){
            response.setStatus(HttpURLConnection.HTTP_OK);
            payload.put("message", "Success");
            payload.put("data", studentCourse.getCourseAsJson());
        } else {
            response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
            payload.put("message", "Student-Course insert failed. No rows affected.");
        }

    } catch(ParseException e){
        response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
        payload.put("message", "Parse Exception Occurred!");
        payload.put("error", e);
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
