package com.a2.Enums;

public enum GatewayTypes {
    STUDENT("student"),
    ADMINISTRATOR("administrator"),
    COURSE("course"),
    STUDENT_COURSE("student-course")
    ;

    private final String type;

    GatewayTypes(String s) {
        type = s;
    }

    public String getType(){
        return type;
    }
}
