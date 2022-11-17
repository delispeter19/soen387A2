package com.a2.Enums;

public enum CourseSQL {
    SELECT("select * from course"),
    SELECT_ROW("select * from course where course_code = ? limit 1"),
    INSERT("insert into course " +
            "(course_code, course_title, room_number, instructor, days, course_time, semester, start_date, end_date) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"),
    UPDATE("update course " +
            "set " +
            "course_title = ?," +
            "room_number = ?," +
            "instructor = ?," +
            "days = ?," +
            "course_time = ?," +
            "semester = ?," +
            "start_date = ?," +
            "end_date = ? " +
            "where course_code = ?"),
    DELETE("delete from course where course_code = ?"),
    SELECT_SEMESTER("select semester from course where course_code = ?"),
    SELECT_START_DATE("select start_date from course where course_code = ?"),
    SELECT_END_DATE("select end_date from course where course_code = ?")
    ;

    private final String query;

    CourseSQL(String s) {
        query = s;
    }

    public String getQuery(){
        return query;
    }
}
