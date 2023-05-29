import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const TremsDescription = () => {
  const [tremsDesc, setTremsDesc] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.Information).then((result) => {
      setTremsDesc(result[0]["trems"]);
    });
  }, []);

  return (
    <Fragment>
      <Container className="mt-5">
        <Row>
          <Col lg={12} md={12} sm={12}>
            {parse(tremsDesc)}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default TremsDescription;
