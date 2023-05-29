import React, { useEffect } from "react";
import { Fragment } from "react";
import AllCourses from "../components/AllCourses/AllCourses";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const AllCoursePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      {/* <PageTop pageTitle="All Course" /> */}
      <AllCourses />
      <Footer />
    </Fragment>
  );
}

export default AllCoursePage;
