import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppUrl from "../../api/AppUrl";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/actions/authActions";
import { getUser } from "../../redux/actions/authActions";
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(AppUrl.Login, { email, password });
      // localStorage.setItem("token", response.data.authorisation.token);
      const token = response.data.authorisation.token;
      dispatch(loginSuccess(token));
      const user = response.data.user;
      dispatch(getUser(user));
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col lg={7} md={6} sm={12}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </Col>

        <Col lg={4} md={6} sm={12} className="mt-5">
          {error && <div>{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="p-3"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="p-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-4">
              <Form.Check
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <Button type="submit" className="mb-0 px-5" size="lg">
                Login
              </Button>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <Link className="link-danger" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
