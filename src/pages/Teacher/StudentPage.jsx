import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import TeacherMangeStudent from "../../components/Teacher/Students/TeacherMangeStudent";


const StudentManagement = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <TeacherMangeStudent user={user} />
      <Footer />
    </Fragment>
  );
};

export default StudentManagement;
