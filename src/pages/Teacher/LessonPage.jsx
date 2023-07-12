import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import Lesson from "../../components/Teacher/Lesson/Lesson";
import { useParams } from "react-router-dom";

const LessonPage = ({ user }) => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <Lesson user={user} id={id}/>
      <Footer />
    </Fragment>
  );
};

export default LessonPage;
