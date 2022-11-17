package com.a2.GatewayUtils;

import com.a2.Interfaces.UserGateway;
import com.a2.Models.Administrator;
import com.a2.Models.Student;

import java.sql.Connection;

public class UserFactory {
    public static UserGateway newUser(String userType, Connection conn){
        switch (userType){
            case "student":
                return new Student(conn);
            case "administrator":
                return new Administrator(conn);
            default:
                return null;
        }
    }
}
