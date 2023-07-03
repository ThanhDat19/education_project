import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const Courses = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    RestClient.GetRequest(AppUrl.CourseHome).then((result) => {
      setMyData(result);
    });
  }, []);

  const myView = myData != null? myData.map((item) => (
    <Col lg={6} md={12} sm={12} key={item.id}>
      <Row className="courseWidth">
        <Col lg={6} md={6} sm={12} className="p-2">
          <img
            className="courseImg"
            src={"http://127.0.0.1:8000" + item.course_image}
            alt={item.title}
          />
        </Col>
        <Col lg={6} md={6} sm={12}>
          <h5 className="text-justify serviceName">{item.title}</h5>
          <p className="text-justify serviceDescription">
            {parse(item.description)}
          </p>
          <Link
            to={"/course-details/" + item.id}
            className="float-left courseViewMore"
          >
            Xem Chi Tiết
          </Link>
        </Col>
      </Row>
    </Col>
  )): "Loading....";

  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">KHÓA HỌC</h1>
        <div className="bottom"></div>
        <Row>{myView}</Row>
      </Container>
    </Fragment>
  );
}

export default Courses;
