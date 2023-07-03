import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import AllCoursePage from "../pages/AllCoursePage";
import AllServicePage from "../pages/AllServicePage";
import ContactPage from "../pages/ContactPage";
import CourseDetailsPage from "../pages/CourseDetailsPage";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import PrivacyPage from "../pages/PrivacyPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import RefundPage from "../pages/RefundPage";
import TremsPage from "../pages/TremsPage";
import LearnCoursePage from "../pages/LearnCoursePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/authActions";
import CourseManagementPage from "../pages/Teacher/CoursePage";
import EditCoursePage from "../pages/Teacher/EditCoursePage";
import TestManagementPage from "../pages/Teacher/TestPage";
import QuestionManagementPage from "../pages/Teacher/Questions";
import CoursePage from "../pages/Student/CoursePage";
import StudentManagement from "../pages/Teacher/StudentPage";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        dispatch(getUser(JSON.parse(storedUser)));
      }
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <Fragment>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/service" element={<AllServicePage />} exact />
        <Route path="/course" element={<AllCoursePage />} exact />
        <Route path="/portfolio" element={<PortfolioPage />} exact />
        <Route path="/about" element={<AboutPage />} exact />
        <Route path="/contact" element={<ContactPage />} exact />
        <Route path="/refund" element={<RefundPage />} exact />
        <Route path="/trems" element={<TremsPage />} exact />
        <Route path="/privacy" element={<PrivacyPage />} exact />
        <Route path="/project-details" element={<ProjectDetailPage />} exact />
        <Route
          path="/course-details/:id"
          element={
            user ? <CourseDetailsPage user={user} /> : <CourseDetailsPage />
          }
          exact
        />
        <Route
          path="/course-details/:id/learn"
          element={
            user ? (
              <LearnCoursePage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />
        <Route
          path="/course-management"
          element={
            user && user.roles === "teacher" ? (
              <CourseManagementPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />

        <Route
          path="/edit-course/:id"
          element={
            user && user.roles === "teacher" ? (
              <EditCoursePage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />

        <Route
          path="/tests-management"
          element={
            user && user.roles === "teacher" ? (
              <TestManagementPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />

        <Route
          path="/question-management"
          element={
            user && user.roles === "teacher" ? (
              <QuestionManagementPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />

        <Route
          path="/user-management"
          element={
            user && user.roles === "teacher" ? (
              <StudentManagement user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />

        <Route
          path="/student-courses"
          element={
            user && user.roles === "student" ? (
              <CoursePage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          exact
        />
        <Route path="/login" element={<LoginPage />} exact />
        <Route path="/register" element={<RegisterPage />} exact />
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
