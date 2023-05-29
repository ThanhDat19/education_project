import React, { useEffect, Fragment } from "react";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import RefundDescription from "../components/RefundDescription/RefundDescription";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const RefundPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment> 
      <TopNavigation />
      <PageTop pageTitle="Refund Policy" />
      <RefundDescription />
      <Footer />
    </Fragment>
  );
}

export default RefundPage;