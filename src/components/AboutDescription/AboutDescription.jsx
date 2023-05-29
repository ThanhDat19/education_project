import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const AboutDescription = () => {
  const [aboutDesc, setAboutDesc] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.Information).then((result) => {
      try {
        setAboutDesc(result[0]["about"]);
      } catch (error) {}
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12}>
          {parse(aboutDesc)}
        </Col>
      </Row>
    </Container>
  );
};

export default AboutDescription;
