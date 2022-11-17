package com.a2.Interfaces;

import org.json.JSONObject;

import javax.xml.bind.TypeConstraintException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;

public interface RowGateway {
    JSONObject toJson();
    void load(ResultSet rs) throws SQLException;
    boolean getRow() throws SQLException;
    boolean post() throws SQLException, TypeConstraintException, ParseException;
    boolean update() throws SQLException;
    boolean delete() throws SQLException, ParseException;
}
