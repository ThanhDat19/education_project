import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import emailjs from '@emailjs/browser';


const ContactSection = () => {
  const [address, setAddress] = useState("...");
  const [email, setEmail] = useState("...");
  const [phone, setPhone] = useState("...");

 
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_d47kkry', 'template_xq92wth', form.current, 'xyM5St_AEJCwQ948H')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
      }, (error) => {
          console.log(error.text);
      });
      // form.current.reset;
  };
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
            <h2 className="serviceName">Liên Hệ</h2>

            <Form ref={form} onSubmit={sendEmail}>
              <Form.Group>
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name='name' />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name='email' />
              </Form.Group>

              <Form.Group>
                <Form.Label>Nội dung</Form.Label>
                <Form.Control as="textarea" rows={3} name='message'/>
              </Form.Group>

              <Button className="mt-2" variant="primary" type="submit">
                Gửi
              </Button>
            </Form>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <h2 className="serviceName">Thảo luận ngay bây giờ</h2>
            <p className="serviceDescriotion">
              {address}
              <br></br>
              <FontAwesomeIcon icon={faEnvelope} /> Email: {email}
              <br></br>
              <FontAwesomeIcon icon={faPhone} /> SĐT: {phone} <br></br>
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ContactSection;
