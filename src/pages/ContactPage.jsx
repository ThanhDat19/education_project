import React, { useEffect } from "react";
import { Fragment } from "react";
import ContactSection from "../components/ContactSection/ContactSection";
import Footer from "../components/Footer/Footer";
import PageTop from "../components/PageTop/PageTop";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const ContactPage = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <PageTop pageTitle="Liên Hệ" />
      <ContactSection />
      <Footer />
    </Fragment>
  );
}

export default ContactPage;