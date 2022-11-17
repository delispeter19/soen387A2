import React from "react";
import { useNavigate } from "react-router-dom";

import {
    Button,
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
  } from "@mui/material";

function UserType(){
    const navigate = useNavigate();

    const handleStudent = (e) => {
        e.preventDefault();
        navigate("/student/login");
    };

    const handleAdmin = (e) => {
        e.preventDefault();
        navigate("/admin/login");
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box
                component="main"
                sx={{ flex: 1, py: 6, px: 4, bgcolor: "#d7ccc8" }}
                >
                <Card>
                    <CardContent>
                        <Typography variant="h4">
                            Sign in as
                        </Typography>
                        <Grid container>
                            <Grid item xs={6} md={6}>
                                <Box component="form" onSubmit={handleStudent} sx={{ mt: 1, mx: 2 }}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Student
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Box component="form" onSubmit={handleAdmin} sx={{ mt: 1, mx: 2 }}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Administrator
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Box>
            </Box>
        </Box>
    );
    
}

export default UserType;