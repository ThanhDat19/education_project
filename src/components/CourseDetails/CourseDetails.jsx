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
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { BigPlayButton, Player } from "video-react";
import YouTube from "react-youtube";
import AppUrl from "../../api/AppUrl";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

var amount;
var courseSate;
var discount;
const CourseDetails = (props) => {
  const [course, setCourse] = useState([]);
  const [id] = useState(props.id);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [paymentState, setPaymentState] = useState(false);
  const [loading, setLoading] = useState(true);
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("Thank you for your purchase!");
  }

  const updatePaymentState = (newState) => {
    setPaymentState(newState);
  };

  useEffect(() => {
    async function fetchData() {
      let response;
      if (user) {
        let user_id = user.id;
        response = await axios.post(AppUrl.CourseDetails + id, {
          user_id,
        });
      } else {
        response = await axios.post(AppUrl.CourseDetails + id);
      }

      console.log(response.data);
      setCourse(response.data.data);
      console.log(response.data.data);
      amount = response.data.data.price;
      if (response.data.data.discount) {
        if (response.data.data.discount.discount_types == 1) {
          amount =
            response.data.data.price *
            ((100 - response.data.data.discount.reduction_rate) * 0.01);
        } else {
          amount =
            response.data.data.price -
            response.data.data.discount.reduction_rate;
        }
      }
      console.log(amount);
      courseSate = response.data.status;
      if (courseSate) {
        updatePaymentState(true);
      }
    }
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [id]);

  const opts = {
    width: "100%",
    height: "250px",
  };

  const handlePlayerReady = (event) => {
    event.target.playVideo();
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours} giờ ${formattedMinutes} phút`;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentTimestamp = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTimestamp) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Vừa mới";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} ngày trước`;
    }
  };

  const PayPalView =
    user && user.roles === "student" ? (
      !paymentState ? (
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
              console.log(amount);
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
                  const name = user.name;
                  const paymentID = details.id;
                  const payerID = details.payer.payer_id;
                  const payerEmail = details.payer.email_address;
                  const currency =
                    details.purchase_units[0].amount.currency_code;
                  const paymentStatus = details.status;
                  const userID = user.id;
                  const courseID = id;
                  console.log(userID + "-----" + courseID);
                  axios
                    .post(AppUrl.BaseUrl + "/create-payment", {
                      paymentID,
                      payerID,
                      payerEmail,
                      amount,
                      currency,
                      paymentStatus,
                      userID,
                      courseID,
                    })
                    .then(function (response) {
                      // console.log(response.data);
                      updatePaymentState(true);
                      alert(`Transaction completed by ${name}`);
                    })
                    .catch(function (error) {
                      // console.log(error);
                    });
                } catch (error) {
                  // Xử lý lỗi
                  // console.error("Error creating payment:", error);
                  updatePaymentState(false);
                  return null;
                }
              });
            }}
            onError={(err) => {
              setError(err);
              // console.error("PayPal Checkout onError", err);
            }}
            onCancel={() => {
              // Display cancel message, modal or redirect user to cancel page or back to cart
            }}
          />
        </PayPalScriptProvider>
      ) : (
        <Link
          className="btn btn-primary p-4"
          to={`/course-details/${id}/learn`}
        >
          {" "}
          Đi tới khóa học của bạn
        </Link>
      )
    ) : (
      "Hãy đăng nhập (Tài khoản học viên)"
    );

  const reviewList =
    course && course.reviews
      ? course.reviews.map((review) => (
          <ListGroup.Item key={review.id}>
            <div className="d-flex align-items-start">
              <div>
                <div className="mb-2">
                  <strong>{review.user_name}</strong>{" "}
                  {formatTimestamp(review.created_at)}
                  <div style={styles.stars} className="mt-2">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={16}
                          color={
                            review.star_count > index
                              ? colors.orange
                              : colors.grey
                          }
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <>
              <div>{review.content}</div>
            </>
          </ListGroup.Item>
        ))
      : "";
  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
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
              videoId={"KcQoJS9R6Lk"}
              opts={opts}
              onReady={handlePlayerReady}
            />
            <div className="widget_feature">
              <h4 className="widget-title text-center">Thông Tin Khóa Học</h4>
              <hr />
              {course && (
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Tổng học viên :</span>{" "}
                    {course.studentCount ? course.studentCount : 0} học viên
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faClock} />
                    <span>Thời lượng bài giảng:</span>{" "}
                    {course.lessonTimeCount
                      ? formatTime(course.lessonTimeCount)
                      : "0 giờ"}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faClipboard} />
                    <span>Bài giảng :</span>{" "}
                    {course.lessonCount ? course.lessonCount : 0}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faClone} />
                    <span>Loại khóa học:</span> {course.category.name}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faTags} />
                    <span>Lĩnh vực:</span> {course.type ? course.type.name : ""}
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Giảng viên:</span> {course.instructor.name}
                  </li>
                </ul>
              )}

              <div className="price-wrap text-center">
                <h5>
                  {course.discount ? (
                    <div>
                      {" "}
                      Giá Bán:
                      <span className="text-decoration-line-through">
                        {" "}
                        ${course.price}
                      </span>
                      <h2 className="text-danger">${amount}</h2>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      Giá Bán:<span> ${course.price}</span>
                    </div>
                  )}
                </h5>
                {/* Paypal */}

                {user && user.id === course.instructor.id ? (
                  <Link
                    className="btn btn-primary p-4"
                    to={`/course-details/${id}/learn`}
                  >
                    {" "}
                    Đi tới khóa học của bạn
                  </Link>
                ) : (
                  PayPalView
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={8} md={6} sm={12}>
            <div className="">
              <h1 className="widget-title text-center">Đánh giá khóa học</h1>
              <hr />
              <ListGroup className="overflow-auto" style={{ height: "400px" }}>
                {reviewList}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default CourseDetails;
