import React from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import face from "../../asset/image/man-circle.png";
import Typewriter from "typewriter-effect";

const AboutMe = () => {
  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="reviewMainTitle">THÔNG TIN VỀ TÔI</h1>
        <div className="reviewbottom"></div>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className="aboutMeImage">
              <img className="aboutImg" src={face} alt="Profile" />
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="aboutMeBody">
              <h2 className="aboutMeDeTails">Xin chào, tôi là</h2>
              <h2 className="aboutMeTitle">Nguyễn Thành Đạt</h2>
              <h3 className="aboutMeDeTails">
                Là một{" "}
                <Typewriter
                  className="d-inline"
                  options={{
                    strings: ["Web Developer!", "Online Instructor!"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AboutMe;
