import {
  faCheckSquare,
  faClipboard,
  faClock,
  faClone,
  faTags,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useCallback } from "react";
import { Fragment } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { BigPlayButton, Player } from "video-react";
import YouTube from "react-youtube";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

var amount;
const CourseDetails = (props) => {
  const [course, setCourse] = useState([]);
  const [slug] = useState(props.slug);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  if (error) {
    // Display error message, modal or redirect user to error page
    console.log(error);
    alert(error);
  }

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    // if response is error
    // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page
    alert("Thank you for your purchase!");
  }

  useEffect(() => {
    RestClient.GetRequest(AppUrl.CourseDetails + slug).then((result) => {
      setCourse(result);
      amount = result.price;
    });
  }, [slug]);
  const opts = {
    width: "100%",
    height: "250px",
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  const handlePlayerReady = (event) => {
    event.target.playVideo();
  };
  return (
    <Fragment>
      <Container className="mt-5">
        <Row>
          <Col lg={8} md={6} sm={12}>
            <h1 className="courseDetailsText">{course.title}</h1>
            <img
              src={"http://127.0.0.1:8000" + course.course_image}
              className="courseDetailsImg"
            />
            <br />
            <br />
            <p className="courseDescription text-justify">
              {parse(`${course.description}`)}
            </p>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <YouTube
              videoId={course.video_course}
              opts={opts}
              onReady={handlePlayerReady}
            />
            <div className="widget_feature">
              <h4 className="widget-title text-center">Thông Tin Khóa Học</h4>
              <hr />
              <ul>
                <li>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Tổng học viên :</span> 1200 học viên
                </li>
                <li>
                  <FontAwesomeIcon icon={faClock} />
                  <span>Thời lượng bài giảng:</span> 2 giờ
                </li>
                <li>
                  <FontAwesomeIcon icon={faClipboard} />
                  <span>Bài giảng :</span> 8
                </li>
                <li>
                  <FontAwesomeIcon icon={faClone} />
                  <span>Loại khóa học:</span> Technology
                </li>
                <li>
                  <FontAwesomeIcon icon={faTags} />
                  <span>Tags:</span> Android, JavaScript
                </li>
                <li>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Giảng viên:</span> Ethan Dean
                </li>
              </ul>
              <div className="price-wrap text-center">
                <h5>
                  Giá Bán:<span> $ {course.price}</span>
                </h5>
                {/* Paypal */}
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Ad4gfNjFcS_JEQ4kkKptZ4_07cCUyS2aX1nT_Ea1o_6OwVRdRoC08gNRGmk1ayVDe6IQHKKKAh8g-opa",
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: "silver",
                      layout: "horizontal",
                      height: 48,
                      tagline: false,
                      shape: "pill",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: amount,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        try {
                          const name = details.payer.name.given_name;
                          const paymentID = details.id;
                          const payerID = details.payer.payer_id;
                          const payerEmail = details.payer.email_address;
                          const currency =
                            details.purchase_units[0].amount.currency_code;
                          const paymentStatus = details.status;

                          axios
                            .post(AppUrl.BaseUrl + "/create-payment", {
                              paymentID,
                              payerID,
                              payerEmail,
                              amount,
                              currency,
                              paymentStatus,
                            })
                            .then(function(response) {
                              console.log(response.data);
                            })
                            .catch(function(error) {
                              console.log(error);
                            });

                          alert(`Transaction completed by ${name}`);
                        } catch (error) {
                          // Xử lý lỗi
                          console.error("Error creating payment:", error);
                          return null;
                        }
                      });
                    }}
                    onError={(err) => {
                      setError(err);
                      console.error("PayPal Checkout onError", err);
                    }}
                    onCancel={() => {
                      // Display cancel message, modal or redirect user to cancel page or back to cart
                    }}
                    onClick={(data, actions) => {
                      // Validate on button click, client or server side
                      const hasAlreadyBoughtCourse = false;

                      if (hasAlreadyBoughtCourse) {
                        setError(
                          "You already bought this course. Go to your account to view your list of courses."
                        );

                        return actions.reject();
                      } else {
                        return actions.resolve();
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col lg={8} md={6} sm={12}>
            <div className="widget_feature">
              <h1 className="widget-title text-center">Skill You Need</h1>
              <hr />
              <ul>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
                <li>
                  <FontAwesomeIcon
                    className="iconBullent"
                    icon={faCheckSquare}
                  />{" "}
                  Metus interdum metus
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default CourseDetails;
