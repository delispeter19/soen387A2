package com.a2.Enums;

public enum TokenSQL {
    SELECT_ROW("select * from token where id = ? limit 1"),
    INSERT("insert into token " +
            "(id, user_id, user_type) " +
            "VALUES (?, ?, ?)"),
    DELETE("delete from token where id = ?")
    ;

    private final String query;

    TokenSQL(String s) {
        query = s;
    }

    public String getQuery(){
        return query;
    }
}
