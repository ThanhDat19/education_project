import React from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Welcome = () => {
  return (
    <Fragment>
      <div className="intro-area--top">
        <Container>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className="section-title text-center">
                <div className="intro-area-inner">
                  <h6 className="sub-title double-line">WELCOME</h6>
                  <h2 className="mainTitle">
                    An exemplary <br></br>
                    learning community
                  </h2>

                  <Container className="text-center">
                    <Row>
                      <Col lg={4} md={6} sm={12}>
                        <img
                          style={{
                            width: "100%",
                          }}
                          alt=""
                          src="https://img.freepik.com/free-vector/people-using-online-appointment-booking-app_74855-5556.jpg?t=st=1677483257~exp=1677483857~hmac=7fc70b80b7436d8bd7de8b655497497b967ad8fc9894ae67885aa4ae89e6f06b"
                        />
                        <h1 className="serviceName">Easy As it Gets</h1>
                        <p className="serviceDescription">Lorem ipsum dolor</p>
                      </Col>

                      <Col lg={4} md={6} sm={12}>
                        <img
                          style={{
                            width: "100%",
                          }}
                          alt=""
                          className="courseImg"
                          src="https://img.freepik.com/premium-vector/people-sit-gadgets-web-concept-flat-design-man-browsing-sites-using-smartphone-office-colleagu_9209-8966.jpg"
                        />
                        <h1 className="serviceName">Teach The way you want</h1>
                        <p className="serviceDescription">Lorem ipsum dolor</p>
                      </Col>

                      <Col lg={4} md={6} sm={12}>
                        <img
                          style={{
                            width: "100%",
                          }}
                          alt=""
                          className="courseImg"
                          src="https://img.freepik.com/free-vector/happy-diverse-students-celebrating-graduation-from-school_74855-5853.jpg"
                        />
                        <h1 className="serviceName">
                          The small matter of getting
                        </h1>
                        <p className="serviceDescription">Lorem ipsum dolor</p>
                      </Col>
                    </Row>
                  </Container>
                  <Row className="intro-footer bg-base">
                    <Col lg={4} md={6} sm={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            className="sideImg"
                            alt=""
                            src="https://solverwp.com/demo/html/edumint/assets/img/icon/19.png"
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <h5 className="homeIntro text-justify">
                            Development
                          </h5>
                          <p className="text-justify serviceDescription">
                            Lorem ipsum dolor
                          </p>
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            className="sideImg"
                            alt=""
                            src="https://solverwp.com/demo/html/edumint/assets/img/icon/20.png"
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <h5 className="homeIntro text-justify">Web Design</h5>
                          <p className="text-justify serviceDescription">
                            Lorem ipsum dolor
                          </p>
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={4} md={6} sm={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12}>
                          <img
                            className="sideImg"
                            alt=""
                            src="https://solverwp.com/demo/html/edumint/assets/img/icon/21.png"
                          />
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                          <h5 className="homeIntro text-justify">Ecommerce</h5>
                          <p className="text-justify serviceDescription">
                            Lorem ipsum dolor
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      v
    </Fragment>
  );
};

export default Welcome;
