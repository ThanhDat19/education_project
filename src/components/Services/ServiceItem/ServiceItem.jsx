import React from "react";
import { Col } from "react-bootstrap";

const ServiceItem = (props) => {
  return (
    <Col lg={4} md={6} sm={12}>
      <div className="serviceCard text-center">
        <img className="fixIcon" src={props.icon} />
        <h2 className="serviceName">{props.name}</h2>
        <p className="serviceDescription">{props.description}</p>
      </div>
    </Col>
  );
};

export default ServiceItem;
