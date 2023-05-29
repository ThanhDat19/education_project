import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const AppRouter = () => {
  return (
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
          path="/course-details/:slug"
          element={<CourseDetailsPage />}
          exact
        />
        <Route
          path="/course-details/:slug/learn"
          element={<LearnCoursePage />}
          exact
        />
        <Route
          path="/login"
          element={<LoginPage />}
          exact
        />
        <Route
          path="/register"
          element={<RegisterPage />}
          exact
        />
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
