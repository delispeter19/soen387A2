import React from "react";

// MUI
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Typography
} from "@mui/material";
import CourseRegistrationTable from "../tables/CourseRegistrationTable";

function CourseRegistrationDialog(props) {
    const { open, onClose } = props;

  return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#212121", color: "#fff" }}>
          Please select a course for registration
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
            <Avatar sx={{ mt: 3, bgcolor: "success.main" }}>
                <LibraryAddIcon />
            </Avatar>
          
            <Typography component="div" align="center" variant="h5">
                Courses
            </Typography>

            <CourseRegistrationTable onClose={onClose} />

        </DialogContent>
    </Dialog>
  );
}

export default CourseRegistrationDialog;
