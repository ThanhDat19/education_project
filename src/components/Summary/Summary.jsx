import React from "react";
import { Fragment } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faGlobe,
  faLaptop,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

const Summary = () => {
  return (
    <Fragment>
      <Container fluid={true} className="summaryBanner p-0">
        <div className="summaryBannerOverlay">
          <Container className="text-center">
            <Row>
              <Col lg={8} md={6} sm={12}>
                <Row className="countSection">
                  <Col className="text-center">
                    <FontAwesomeIcon className="iconProject" icon={faGlobe} />
                    <h1 className="countNumber">
                      <CountUp start={0} end={20} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </h1>
                    <h4 className="countTitle">Học viên</h4>
                  </Col>
                  <Col>
                    <FontAwesomeIcon className="iconProject" icon={faLaptop} />
                    <h1 className="countNumber">
                      <CountUp start={0} end={10} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </h1>
                    <h4 className="countTitle">Khóa học</h4>
                  </Col>
                  <Col>
                    <FontAwesomeIcon className="iconProject" icon={faStar} />
                    <h1 className="countNumber">
                      <CountUp start={0} end={7} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </h1>
                    <h4 className="countTitle">Lượt đánh giá</h4>
                  </Col>
                </Row>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <Card className="workCard">
                  <Card.Body>
                    <Card.Title className="cardTitle">
                      Bạn có thể đạt được những gì?
                    </Card.Title>
                    <Card.Text>
                      <div className="cardSubTitle">
                        <FontAwesomeIcon
                          className="iconBullent"
                          icon={faCheckSquare}
                        />{" "}
                        Kỹ năng phân tích yêu cầu
                      </div>
                      <div className="cardSubTitle">
                        <FontAwesomeIcon
                          className="iconBullent"
                          icon={faCheckSquare}
                        />{" "}
                        Kỹ năng phân tích hệ thống
                      </div>
                      <div className="cardSubTitle">
                        <FontAwesomeIcon
                          className="iconBullent"
                          icon={faCheckSquare}
                        />{" "}
                        Kỹ năng lập trình và kiểm thử
                      </div>
                      <div className="cardSubTitle">
                        <FontAwesomeIcon
                          className="iconBullent"
                          icon={faCheckSquare}
                        />{" "}
                        Hiện thực dự án
                      </div>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </Fragment>
  );
};

export default Summary;
