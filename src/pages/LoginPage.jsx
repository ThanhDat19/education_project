import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../components/Footer/Footer";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Login from "../components/Login/Login";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <Login />
      <Footer />
    </Fragment>
  );
}

export default LoginPage;
