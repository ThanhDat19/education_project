import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";

const RecentProject = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    try {
      RestClient.GetRequest(AppUrl.ProjectHome).then((result) => {
        setMyData(result);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (myData) {
    var myView = myData.map((item) => (
      <Col lg={4} md={6} sm={12} key={item.id}>
        <Card className="projectCard">
          <Card.Img src={item.img_one} />
          <Card.Body>
            <Card.Title className="serviceName">{item.project_name}</Card.Title>
            <Card.Text className="serviceDescription">
              {item.project_description}
            </Card.Text>
            <Button variant="primary">
              <Link className="link-style" to="/project-details">
                View more
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  }

  return (
    <Container className="text-center">
      <h1 className="serviceMainTitle">RECENT PROJECT</h1>
      <div className="bottom"></div>
      <Row>{myView}</Row>
    </Container>
  );
};

export default RecentProject;
