import React, { useEffect } from "react";
import { Fragment } from "react";
import Footer from "../components/Footer/Footer";
import TopNavigation from "../components/TopNavigation/TopNavigation";
import UpdateInformation from "../components/UpdateInformation/UpdateInformation";

const UpdateInformationPage = ({user}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <TopNavigation />
      <UpdateInformation user={user} />
      <Footer />
    </Fragment>
  );
}

export default UpdateInformationPage;