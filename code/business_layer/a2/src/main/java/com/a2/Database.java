package com.a2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    private final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    private final String DB_URL = "jdbc:mysql://localhost:3306/";
    private final String DB_NAME = "localschool_db";
    private final String DB_USER = "admin387";
    private final String DB_PASSWORD = "test";
    private Connection conn = null;

    public Connection connect() {
        try {
            // Register JDBC driver
            Class.forName(JDBC_DRIVER);

            //Open a connection
            System.out.println("Connecting to database...");

            conn = DriverManager.getConnection(DB_URL+DB_NAME,DB_USER,DB_PASSWORD);

            System.out.println("Success!");

            return conn;
        } catch(ClassNotFoundException e){
            throw new RuntimeException("JDBC DRIVER NOT FOUND: " + e);
        } catch(SQLException e){
            throw new RuntimeException("Failed to connect to MYSQL: " + e);
        }


    }

}
