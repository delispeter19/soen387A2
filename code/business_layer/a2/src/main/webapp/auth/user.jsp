<%@ page import="com.a2.Database"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="java.util.regex.Pattern"%>
<%@ page import="java.util.regex.Matcher"%>
<%@ page import="com.a2.Models.Token"%>
<%@ page import="com.a2.Interfaces.UserGateway"%>
<%@ page import="com.a2.GatewayUtils.UserFactory"%>
<%@ page contentType="application/json" %>

<%
    Database database = new Database();
    JSONObject payload = new JSONObject();

    try (Connection db = database.connect()){

        if (request.getHeader("Authorization") != null){
            Pattern regex = Pattern.compile("Token (.*)");
            Matcher matcher = regex.matcher(request.getHeader("Authorization"));

            if (matcher.matches()){
                Token token = new Token(db, request.getHeader("Authorization").split(" ")[1]);
                if (token.getRow()){
                    UserGateway user = UserFactory.newUser(token.userType, db);

                    if (user != null){
                        user.setId(token.userId);

                        if(user.getRow()){
                            response.setStatus(HttpURLConnection.HTTP_OK);
                            payload.put("message", "Success");
                            payload.put("user", user.toJson());
                            payload.put("type", token.userType);
                        } else {
                            response.setStatus(HttpURLConnection.HTTP_NOT_FOUND);
                            payload.put("message", "User does not exist!");
                        }
                    } else {
                        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
                        payload.put("message", "Something went wrong with UserFactory!");
                        payload.put("error", "Invalid user type used in UserFactory");
                    }
                } else {
                    response.setStatus(HttpURLConnection.HTTP_UNAUTHORIZED);
                    payload.put("message", "User Failure");
                    payload.put("auth", "Invalid Token");
                }
            } else {
                response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
                payload.put("message", "Please use 'Token <token>' format!");
                payload.put("error", "Incorrect Authorization Format");
            }
        } else {
            response.setStatus(HttpURLConnection.HTTP_BAD_REQUEST);
            payload.put("error", "Authorization Header not found!");
        }
    } catch(SQLException e){
        response.setStatus(HttpURLConnection.HTTP_INTERNAL_ERROR);
        payload.put("message", "Something went wrong!");
        payload.put("error", e);
    }

%>

<%= payload %>
