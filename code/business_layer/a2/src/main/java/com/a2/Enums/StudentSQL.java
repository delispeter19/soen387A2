package com.a2.Enums;

public enum StudentSQL {
    SELECT("select * from student"),
    SELECT_ROW("select * from student where id = ? limit 1"),
    INSERT("insert into student " +
            "(ID, email, password, first_name, last_name, phone_number, address, date_of_birth) " +
            "VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)"),
    UPDATE("update student " +
            "set " +
            "email = ?," +
            "password = ?," +
            "first_name = ?," +
            "last_name = ?," +
            "phone_number = ?," +
            "address = ?," +
            "date_of_birth = ? " +
            "where id = ?"),
    DELETE("delete from student where id = ?"),
    LOGIN("select * from student where email = ? limit 1")
    ;

    private final String query;

    StudentSQL(String s) {
        query = s;
    }

    public String getQuery(){
        return query;
    }
}
