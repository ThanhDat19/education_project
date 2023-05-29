import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../components/Footer/Footer";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Register from "../components/Register/Register";

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <Register />
      <Footer />
    </Fragment>
  );
}

export default RegisterPage;
