import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const RefundDescription = () => {
  const [refundDesc, setRefundDesc] = useState("...");

  useEffect(() => {
    try {
      RestClient.GetRequest(AppUrl.Information).then((result) => {
        setRefundDesc(result[0]['refund']);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={12} md={12} sm={12}>
          {parse(refundDesc)}
        </Col>
      </Row>
    </Container>
  );
};

export default RefundDescription;
