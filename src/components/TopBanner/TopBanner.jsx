import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";

const TopBanner = () => {
  const [title, setTitle] = useState("...");
  const [subtitle, setSubtitle] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.HomeTopTitle)
      .then((result) => {
        setTitle(result[0]["home_title"]);
        setSubtitle(result[0]["home_subtitle"]);
      })
      .catch((error) => {
        setTitle("Education Learning");
        setSubtitle("Let's to learning every thing");
      });
  }, []);

  return (
    <Fragment>
      <Container fluid={true} className="topFixedBanner p-0">
        <div className="topBannerOverlay">
          <Container className="topContent">
            <Row>
              <Col className="text-center">
                <h1 className="topTitle">{title}</h1>
                <h4 className="topSubTitle">{subtitle}</h4>
                <Button variant="primary">Learn More</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </Fragment>
  );
}

export default TopBanner;
