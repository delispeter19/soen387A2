package com.a2.Models;

import com.a2.Enums.TokenSQL;
import com.a2.Interfaces.RowGateway;
import org.json.JSONObject;

import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Base64;

public class Token implements RowGateway {
    public String id;
    public Long userId;
    public String userType;

    private final Connection conn;

    public Token(Connection db, String tokenId){
        conn = db;
        id = tokenId;
    }

    public Token(Connection db, Long uId, String uType){
        conn = db;
        id = generateToken();
        userId = uId;
        userType = uType;
    }

    @Override
    public JSONObject toJson() {
        return null;
    }

    @Override
    public void load(ResultSet rs) throws SQLException {
        userId = rs.getLong("user_id");
        userType = rs.getString("user_type");
    }

    public boolean getRow() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(TokenSQL.SELECT_ROW.getQuery())){
            stmt.setString(1, id);
            try(ResultSet rs = stmt.executeQuery()){

                if(rs.next()){
                    load(rs);

                    return true;
                }

                return false;
            }
        }
    }

    public boolean post() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(TokenSQL.INSERT.getQuery())) {
            stmt.setString(1, id);
            stmt.setLong(2, userId);
            stmt.setString(3, userType);

            int numRows = stmt.executeUpdate();

            return numRows > 0;
        }
    }

    @Override
    public boolean update() throws SQLException {
        return false;
    }

    public boolean delete() throws SQLException {
        try(PreparedStatement stmt = conn.prepareStatement(TokenSQL.DELETE.getQuery())) {
            stmt.setString(1, id);

            int numRows = stmt.executeUpdate();

            return numRows > 0;
        }
    }

    private String generateToken(){
        SecureRandom secureRandom = new SecureRandom();
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();

        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);

        return base64Encoder.encodeToString(randomBytes);
    }
}
