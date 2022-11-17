package com.a2.Models;

import com.a2.Enums.AdminSQL;
import com.a2.Interfaces.UserGateway;
import org.json.JSONObject;

import javax.xml.bind.TypeConstraintException;
import java.sql.*;

public class Administrator implements UserGateway {
    public Long id;
    public String email;
    public String password;
    public String firstName;
    public String lastName;
    public String phoneNumber;
    public String address;
    public String dateOfBirth;

    private Connection conn = null;

    public Administrator(){

    }

    public Administrator(Connection db){
        conn = db;
    }

    public JSONObject toJson(){
        JSONObject json = new JSONObject();
        json.put("employment_id", id);
        json.put("email", email);
        json.put("password", password);
        json.put("first_name", firstName);
        json.put("last_name", lastName);
        json.put("phone_number", phoneNumber);
        json.put("address", address);
        json.put("date_of_birth", dateOfBirth);

        return json;
    }

    public void load(ResultSet rs) throws SQLException {
        id = rs.getLong("employment_ID");
        email = rs.getString("email");
        password = rs.getString("password");
        firstName = rs.getString("first_name");
        lastName = rs.getString("last_name");
        phoneNumber = rs.getString("phone_number");
        address = rs.getString("address");
        dateOfBirth = rs.getString("date_of_birth");
    }

    public boolean login() throws SQLException {
        try (PreparedStatement stmt = conn.prepareStatement(AdminSQL.LOGIN.getQuery())){
            stmt.setString(1, email);

            ResultSet rs = stmt.executeQuery();

            // check if email exists
            if(rs.next()) {
                // check if password matches
                if (rs.getString("password").equals(password)) {
                    load(rs);
                    return true;
                }
            }
        }

        return false;
    }

    public boolean getRow() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(AdminSQL.SELECT_ROW.getQuery())){
            stmt.setLong(1, id);
            try(ResultSet rs = stmt.executeQuery()){

                if(rs.next()){
                    load(rs);

                    return true;
                }

                return false;
            }
        }
    }

    public boolean post() throws SQLException, TypeConstraintException {
        try(PreparedStatement stmt = conn.prepareStatement(AdminSQL.INSERT.getQuery(), Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            stmt.setString(3, firstName);
            stmt.setString(4, lastName);
            stmt.setString(5, phoneNumber);
            stmt.setString(6, address);
            stmt.setString(7, dateOfBirth);

            int numRows;

            try {
                numRows = stmt.executeUpdate();
            } catch(SQLException e){
                throw new TypeConstraintException("One or more values do not follow column type constraints!", e);
            }

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                // Might be redundant
                if (numRows > 0 && generatedKeys.next()) {
                    id = generatedKeys.getLong(1);
                    return true;
                }

                return false;
            }
        }
    }

    public boolean update() throws SQLException{
        try(PreparedStatement stmt = conn.prepareStatement(AdminSQL.UPDATE.getQuery())) {
            stmt.setString(1, email);
            stmt.setString(2, password);
            stmt.setString(3, firstName);
            stmt.setString(4, lastName);
            stmt.setString(5, phoneNumber);
            stmt.setString(6, address);
            stmt.setString(7, dateOfBirth);
            stmt.setLong(8, id);

            int numRows;

            try {
                numRows = stmt.executeUpdate();
            } catch(SQLException e){
                throw new TypeConstraintException("One or more values do not follow column type constraints!", e);
            }

            return numRows > 0;
        }
    }

    public boolean delete() throws SQLException{
        try(PreparedStatement stmt = conn.prepareStatement(AdminSQL.DELETE.getQuery())) {
            stmt.setLong(1, id);

            int numRows = stmt.executeUpdate();

            return numRows > 0;
        }
    }

    public void setId(Long id){
        this.id = id;
    }
}
