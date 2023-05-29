import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";

const ContactSection = () => {
  const [address, setAddress] = useState("...");
  const [email, setEmail] = useState("...");
  const [phone, setPhone] = useState("...");

  useEffect(() => {
    try {
      RestClient.GetRequest(AppUrl.FooterData).then((result) => {
        setAddress(result[0]["address"]);
        setEmail(result[0]["email"]);
        setPhone(result[0]["phone"]);
      });
    } catch (error) {}
  }, []);

  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <h2 className="serviceName">Quick Connect</h2>

            <Form>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>

              <Button className="mt-2" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <h2 className="serviceName">Discuss Now</h2>
            <p className="serviceDescriotion">
              {address}
              <br></br>
              <FontAwesomeIcon icon={faEnvelope} /> Email: {email}
              <br></br>
              <FontAwesomeIcon icon={faPhone} /> Phone: {phone} <br></br>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ContactSection;
