import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';
import axios from "axios";

const PrivacyDescription = () => {
  const [privacyDesc, setPrivacyDesc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(AppUrl.Information).then((response) => {
      setPrivacyDesc(response.data[0].privacy);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <Container className="mt-5">
        <Row>
          <Col lg={12} md={12} sm={12}>
            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
              </div>
            ) : (
              parse(privacyDesc)
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default PrivacyDescription;
