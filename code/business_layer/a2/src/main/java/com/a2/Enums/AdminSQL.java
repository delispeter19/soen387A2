package com.a2.Enums;

public enum AdminSQL {
    SELECT("select * from administrator"),
    SELECT_ROW("select * from administrator where employment_id = ? limit 1"),
    INSERT("insert into administrator " +
            "(employment_ID, email, password, first_name, last_name, phone_number, address, date_of_birth) " +
            "VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)"),
    UPDATE("update administrator " +
            "set " +
            "email = ?," +
            "password = ?," +
            "first_name = ?," +
            "last_name = ?," +
            "phone_number = ?," +
            "address = ?," +
            "date_of_birth = ? " +
            "where employment_id = ?"),
    DELETE("delete from administrator where employment_id = ?"),
    LOGIN("select * from administrator where email = ? limit 1")
    ;

    private final String query;

    AdminSQL(String s) {
        query = s;
    }

    public String getQuery(){
        return query;
    }
}
