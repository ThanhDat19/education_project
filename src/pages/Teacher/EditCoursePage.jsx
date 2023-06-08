import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import { useParams } from "react-router-dom";
import EditCourse from "../../components/Teacher/Course/EditCourse";

const EditCoursePage = ({ user }) => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <EditCourse  user={user}  id={id} />
      <Footer />
    </Fragment>
  );
};

export default EditCoursePage;
