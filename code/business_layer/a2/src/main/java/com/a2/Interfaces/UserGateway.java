package com.a2.Interfaces;

import java.sql.SQLException;

public interface UserGateway extends RowGateway {
    boolean login() throws SQLException;
    void setId(Long id);
}
