import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import AppUrl from "../../api/AppUrl";
import parse from "html-react-parser";
import axios from "axios";

const RefundDescription = () => {
  const [refundDescription, setRefundDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      axios.get(AppUrl.Information).then((response) => {
        console.log(response.data);
        setRefundDescription(response.data[0].refund);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Loading...</p>
            </div>
          ) : (
            parse(refundDescription)
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RefundDescription;
