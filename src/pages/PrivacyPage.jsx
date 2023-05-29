import React, { useEffect, Fragment } from "react";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import PrivacyDescription from "../components/PrivacyDescription/PrivacyDescription";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const PrivacyPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Privacy Policy" />
      <PrivacyDescription />
      <Footer />
    </Fragment>
  );
};

export default PrivacyPage;
