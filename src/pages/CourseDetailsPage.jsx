import React from "react";
import { Fragment } from "react";
import CourseDetails from "../components/CourseDetails/CourseDetails";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseDetailsPage = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Course Details"/>
      <CourseDetails  id={id}  />
      <Footer />
    </Fragment>
  );
};

export default CourseDetailsPage;