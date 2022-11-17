import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/routers/PrivateRoute";
import PublicRoute from "./components/routers/PublicRoute";

import TestPage from "./pages/TestPage";
import UserType from "./pages/auth/UserType";
import StudentLogin from "./pages/auth/StudentLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentSignup from "./pages/auth/StudentSignup";
import AdminSignup from "./pages/auth/AdminSignup";
import Home from "./pages/home/Home";
import StudentCourseRegistration from "./pages/home/StudentCourseRegistration";
import UserRoute from "./components/routers/UserRoute";
import AdminCourseManager from "./pages/home/AdminCourseManager";
import NoMatch from "./pages/NoMatch";

function App() {
  const homePath = "/";
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={homePath} element={<PrivateRoute redirect={"/user-type"} />} >
            <Route path="" element={<Home />} >

              {/* STUDENT ROUTES */}
              <Route path="" element={<UserRoute redirect={homePath+'admin'} type={'student'} />} >
                <Route index element={<StudentCourseRegistration />} />
                <Route path="course-registration" element={<StudentCourseRegistration />} />
                <Route path="test-page" element={<TestPage />} />
              </Route>
              
              {/* ADMIN ROUTES */}
              <Route path="admin" element={<UserRoute redirect={homePath} type={'administrator'} />} >
                <Route index element={<AdminCourseManager />} />
                <Route path="course-manager" element={<AdminCourseManager />} />
                <Route path="test-page" element={<TestPage />} />
              </Route>

            </Route>
          </Route>

          {/* Login and Register Pages */}
          <Route path={homePath} element={<PublicRoute redirect={homePath} />} >
            <Route path="user-type" element={<UserType />} />
            <Route path="student/login" element={<StudentLogin />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="student/signup" element={<StudentSignup redirect={"/user-type"} />} />
            <Route path="admin/signup" element={<AdminSignup redirect={"/user-type"} />} />
          </Route>

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
