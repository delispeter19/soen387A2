import React from "react";

// MUI
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Typography
} from "@mui/material";

import StudentCoursesTable from "../tables/StudentCoursesTable";

function CoursesByStudentDialog(props) {
  const { open, onClose, student_id, student_name } = props;
  return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#212121", color: "#fff" }}>
          {student_name}'s Courses
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          align="center"
        >
            <Avatar sx={{ mt: 3, bgcolor: "primary.main" }}>
              <LibraryBooksIcon />
            </Avatar>
          
            <Typography component="div" align="center" variant="h5">
                Courses
            </Typography>

            <StudentCoursesTable student_id={student_id} />

        </DialogContent>
    </Dialog>
  );
}

export default CoursesByStudentDialog;
