import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import TeacherTest from "../../components/Teacher/Tests/TeacherTest";

const TestManagementPage = ({user}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <TeacherTest user={user}/>
      <Footer />
    </Fragment>
  );
}

export default TestManagementPage;
