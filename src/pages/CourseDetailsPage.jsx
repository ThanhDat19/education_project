import React from "react";
import { Fragment } from "react";
import CourseDetails from "../components/CourseDetails/CourseDetails";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CourseDetailsPage = () => {
  const { slug } = useParams();
  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Course Details"/>
      <CourseDetails  slug={slug}  />
      <Footer />
    </Fragment>
  );
};

export default CourseDetailsPage;
