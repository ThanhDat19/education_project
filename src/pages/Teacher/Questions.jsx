import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import TeacherQuestion from "../../components/Teacher/Questions/TeacherQuestion";


const QuestionManagementPage = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <TeacherQuestion user={user} />
      <Footer />
    </Fragment>
  );
};

export default QuestionManagementPage;
