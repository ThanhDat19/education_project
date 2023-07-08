import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AppUrl from "../../api/AppUrl";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirm) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }

    try {
      // Gửi request đăng ký tới API
      const response = await axios.post(AppUrl.Register, {
        name,
        email,
        password,
      });

      // Kiểm tra response và điều hướng đến trang khác nếu thành công
      if (response.status === 201) {
        alert("Đăng ký thành công");
        navigate("/login"); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      }
    } catch (error) {
      console.log(error);
      alert("Đăng ký thất bại");
    }
  };

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
          <Form>
            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                className="p-3"
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Hãy nhập họ và tên"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="p-3"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Hãy nhập email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                className="p-3"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hãy nhập mật khẩu"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                className="p-3"
                type="password"
                placeholder="Hãy nhập lại mật khẩu"
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-center text-md-start mt-4 pt-2">
              <Button className="mb-0 px-5" size="lg" onClick={handleSubmit}>
                Đăng Ký
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
