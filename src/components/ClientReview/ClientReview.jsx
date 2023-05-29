import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";

const ClientReview = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    try {
      RestClient.GetRequest(AppUrl.ClientReview).then((result) => {
        setMyData(result);
      });
    } catch (error) {}
  }, []);

  var settings = {
    autoPlaySpeed: 2000,
    autoPlay: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 2000,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Container fluid={true} className="siderBack text-center">
        <h1 className="reviewMainTitle">TESTIMOTIAL</h1>
        <div className="reviewbottom"></div>
        {myData != null ? (
          <Slider {...settings}>
            {myData.map((item) => (
              <div key={item.id}>
                <Row className="text-center justify-content-center">
                  <Col lg={6} md={6} sm={12}>
                    <img className="circleImg" src={item.client_img} alt="Client" />
                    <h2 className="reviewName">{item.client_title}</h2>
                    <p className="reviewDescription">{item.client_description}</p>
                  </Col>
                </Row>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </Fragment>
  );
};

export default ClientReview;
