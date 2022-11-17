package com.a2.Enums;

public enum StudentCourseSQL {
    SELECT("select * from student_course"),
    SELECT_ROW("select * from student_course where student_id = ? and course_code = ? limit 1"),
    INSERT("insert into student_course " +
            "(student_id, course_code) " +
            "VALUES (?, ?)"),
    DELETE("delete from student_course where student_id = ? and course_code = ?"),
    SELECT_STUDENTS("select * from student as s, student_course " +
            "as sc where s.ID = sc.student_id and sc.course_code = ?"),
    SELECT_COURSES("select * from course as c, student_course " +
            "as sc where c.course_code = sc.course_code and sc.student_id = ?"),
    SELECT_NUM_COURSES_BY_SEMESTER("select count(*) as numberOfCourses from course as c, student_course as sc " +
            "where c.semester = ? " +
            "and c.course_code = sc.course_code " +
            "and sc.student_id = ?")
    ;

    private final String query;

    StudentCourseSQL(String s) {
        query = s;
    }

    public String getQuery(){
        return query;
    }
}
