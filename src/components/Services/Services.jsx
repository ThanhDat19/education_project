import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import ServiceItem from "./ServiceItem/ServiceItem";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";

const Services = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    try {
      RestClient.GetRequest(AppUrl.Services).then((result) => {
        setMyData(result);
      });
    } catch (error) {
      setMyData([]);
    }
  }, []);

  if (myData != null) {
    const myView = myData.map((item) => {
      return (
        <ServiceItem
          key={item.id}
          icon={item.service_logo}
          name={item.service_name}
          description={item.service_description}
        />
      );
    });

    return (
      <Container className="text-center">
        <h1 className="serviceMainTitle">MY SERVICES</h1>
        <div className="bottom"></div>
        <Row>{myView}</Row>
      </Container>
    );
  }

  return null;
};

export default Services;
