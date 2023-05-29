import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const AllProjects = () => {
  return (
    <>
      <Container className="text-center">
        <h1 className="serviceMainTitle">RECENT PROJECT</h1>
        <div className="bottom"></div>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Card className="projectCard">
              <Card.Img src="https://img.freepik.com/free-vector/business-analysts-performing-idea-management-computer-screen-innovation-management-software-brainstorming-tools-inovation-it-control-concept_335657-1892.jpg?w=996&t=st=1676535659~exp=1676536259~hmac=e8984d8cff0ab7187beb79f5e45c2ea2d3329b3ec5306b4c8c72faa1c9cdc8d0" />
              <Card.Body>
                <Card.Title className="serviceName">Card Title</Card.Title>
                <Card.Text className="serviceDescription">
                  Some quick example text to build on the card title and make
                  up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="projectCard">
              <Card.Img src="https://img.freepik.com/free-vector/managers-workshop-training-manager-skills-brainstorming-board_335657-3305.jpg?w=996&t=st=1676535703~exp=1676536303~hmac=d2974860474db38cfe28caf6ed5f717608aa8fb5a5a0c0588aa820c426503cb1" />
              <Card.Body>
                <Card.Title className="serviceName">Card Title</Card.Title>
                <Card.Text className="serviceDescription">
                  Some quick example text to build on the card title and make
                  up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Card className="projectCard">
              <Card.Img src="https://img.freepik.com/premium-vector/rx-prescription-online-medical-app-online-prescription-vector-doctor-patient-painkiller-medication_53562-11927.jpg?w=996" />
              <Card.Body>
                <Card.Title className="serviceName">Card Title</Card.Title>
                <Card.Text className="serviceDescription">
                  Some quick example text to build on the card title and make
                  up the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AllProjects;
