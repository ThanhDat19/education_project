import React, { useEffect } from "react";
import { Fragment } from "react";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import Services from "../components/Services/Services";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const AllServicePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Our Services" />
      <Services />
      <ContactSection />
      <Footer />
    </Fragment>
  );
};

export default AllServicePage;
