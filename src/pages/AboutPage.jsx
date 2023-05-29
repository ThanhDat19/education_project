import React, { useEffect } from "react";
import { Fragment } from "react";
import AboutDescription from "../components/AboutDescription/AboutDescription";
import AboutMe from "../components/AboutMe/AboutMe";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="About Me" />
      <AboutMe />
      <AboutDescription />
      <Footer />
    </Fragment>
  );
}

export default AboutPage;
