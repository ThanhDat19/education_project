import React, { useEffect, Fragment } from "react";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import TremsDescription from "../components/TremsDescription/TremsDescription";

const TremsPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Terms And Conditions" />
      <TremsDescription />
      <Footer />
    </Fragment>
  );
};

export default TremsPage;
