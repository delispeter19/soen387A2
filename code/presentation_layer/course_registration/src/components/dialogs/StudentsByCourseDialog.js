import React from "react";

// MUI
import GroupsIcon from '@mui/icons-material/Groups';
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Typography
} from "@mui/material";

import CourseStudentsTable from "../tables/CourseStudentsTable";

function StudentsByCourseDialog(props) {
  const { open, onClose, course_code } = props;
  return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#212121", color: "#fff" }}>
          Students Enrolled in {course_code}
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
              <GroupsIcon />
            </Avatar>
          
            <Typography component="div" align="center" variant="h5">
                Students
            </Typography>

            <CourseStudentsTable course_code={course_code} />

        </DialogContent>
    </Dialog>
  );
}

export default StudentsByCourseDialog;
