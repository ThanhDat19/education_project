import React, { useEffect, Fragment } from "react";
import AllProjects from "../components/AllProjects/AllProjects";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const PortfolioPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Our Portfolio" />
      <AllProjects />
      <Footer />
    </Fragment>
  );
};

export default PortfolioPage;
