import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import StudentCourse from "../../components/Student/Courses/StudentCourse";

const CoursePage = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <StudentCourse user={user} />
      <Footer />
    </Fragment>
  );
};

export default CoursePage;
