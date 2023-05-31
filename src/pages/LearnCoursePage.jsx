import React from "react";
import { Fragment } from "react";
import Footer from "../components/Footer/Footer";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import { useParams } from "react-router-dom";
import LearnCourse from "../components/LearnCourse/LearnCourse";

const CourseDetailsPage = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <TopNavigation />
      {/* <PageTop pageTitle="Course Details"/> */}
      <LearnCourse  id={id}  />
      <Footer />
    </Fragment>
  );
};

export default CourseDetailsPage;
