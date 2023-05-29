import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
const Register = () => {
  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col lg={7} md={6} sm={12}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </Col>

        <Col lg={4} md={6} sm={12} className="mt-5">
          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Họ và Tên</Form.Label>
            <Form.Control
              className="p-3"
              type="text"
              placeholder="Hãy nhập họ và tên"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="p-3"
              type="email"
              placeholder="Hãy nhập email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              className="p-3"
              type="password"
              placeholder="Hãy nhập mật khẩu"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              className="p-3"
              type="password"
              placeholder="Hãy nhập lại mật khẩu"
            />
          </Form.Group>

          <div className="text-center text-md-start mt-4 pt-2">
            <Button className="mb-0 px-5" size="lg">
              Đăng Ký
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
