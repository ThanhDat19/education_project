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
                  <h6 className="sub-title double-line">CHÀO MỪNG</h6>
                  <h2 className="mainTitle">
                    Tiêu Biểu <br></br>
                    Cộng Đồng Học Tập
                  </h2>

                  <Container className="text-center">
                    <Row>
                      <Col lg={4} md={6} sm={12}>
                        <img
                          style={{
                            width: "100%",
                          }}
                          className="courseImg"
                          alt=""
                          src="https://img.freepik.com/free-vector/directors-board-online-service-platform-business-planning-development-brainstorming-negotiating-process-online-video-conference-flat-vector-illustration_613284-58.jpg?w=996&t=st=1688357638~exp=1688358238~hmac=3ad3408708c75d449939993a3f6309f5b1509e2416806cfd8bff5c184fdb4a8e"
                        />
                        <h1 className="serviceName">Học tập mọi lúc</h1>
                        <p className="serviceDescription">
                          Bạn có thể dễ dàng học tập các khóa học mọi lúc
                        </p>
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
                        <h1 className="serviceName">Trao đổi với giảng viên</h1>
                        <p className="serviceDescription">
                          Dễ dàng trao đổi với giảng viên và các học viên khác
                        </p>
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
                        <h1 className="serviceName">Chứng nhận hoàn thành</h1>
                        <p className="serviceDescription">
                          Cung cấp chứng chỉ hoàn thành khóa học
                        </p>
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
                            Phát triển phần mềm
                          </h5>
                          <p className="text-justify serviceDescription">
                            Thiết kế, lập trình, kiểm thử, triển khai và duy trì
                            phần mềm.
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
                          <h5 className="homeIntro text-justify">
                            Thiết kế website
                          </h5>
                          <p className="text-justify serviceDescription">
                            Lên ý tưởng, thiết kế giao diện,... tạo ra các trang
                            web có thẩm mỹ và dễ sử dụng.
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
                          <h5 className="homeIntro text-justify">
                            Thương mại điện tử
                          </h5>
                          <p className="text-justify serviceDescription">
                            Thực hiện giao dịch thương mại, bao gồm mua,... chăm
                            sóc khách hàng trên nền tảng trực tuyến.
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
    </Fragment>
  );
};

export default Welcome;
