import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import TeacherCourse from "../../components/Teacher/Course/TeaccherCourse";

const CourseManagementPage = ({user}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <TeacherCourse user={user}/>
      <Footer />
    </Fragment>
  );
}

export default CourseManagementPage;
