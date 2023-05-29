import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const PrivacyDescription = () => {
  const [privacyDesc, setPrivacyDesc] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.Information).then((result) => {
      setPrivacyDesc(result[0]['privacy']);
    });
  }, []);

  return (
    <Fragment>
      <Container className="mt-5">
        <Row>
          <Col lg={12} md={12} sm={12}>
            {parse(privacyDesc)}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default PrivacyDescription;
