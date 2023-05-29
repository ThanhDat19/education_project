import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const [address, setAddress] = useState("...");
  const [email, setEmail] = useState("...");
  const [phone, setPhone] = useState("...");
  const [facebook, setFacebook] = useState("...");
  const [youtube, setYoutube] = useState("...");
  const [twitter, setTwitter] = useState("...");
  // const [footerCredit, setFooterCredit] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.FooterData)
      .then((result) => {
        setAddress(result[0]["address"]);
        setEmail(result[0]["email"]);
        setPhone(result[0]["phone"]);
        setFacebook(result[0]["facebook"]);
        setYoutube(result[0]["youtube"]);
        setTwitter(result[0]["twitter"]);
        // setFooterCredit(result[0]["footer_credit"]);
      })
      .catch((error) => {
        setAddress("...");
        setEmail("...");
        setPhone("...");
        setFacebook("...");
        setYoutube("...");
        setTwitter("...");
        // setFooterCredit("...");
      });
  }, []);

  return (
    <Fragment>
      <Container fluid={true} className="footerSection">
        <Row>
          <Col lg={3} md={6} sm={12} className="p-5 text-center">
            <h2 className="footerName text-center">Follow Us</h2>
            <div className="social-container">
              <a className="youtube social" href={youtube}>
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a className="facebook social" href={facebook}>
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a className="twitter social" href={twitter}>
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </Col>

          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h2 className="footerName text-center">Address</h2>
            <p className="footerDescription">
              {address}
              <br></br>
              <FontAwesomeIcon icon={faEnvelope} /> Email: {email}
              <br></br>
              <FontAwesomeIcon icon={faPhone} /> Phone: {phone}{" "}
              <br></br>
            </p>
          </Col>

          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h2 className="footerName ">Information</h2>
            <Link className="footerLink" to="/about">
              About Me
            </Link>
            <br></br>
            <Link className="footerLink" to="/about">
              Company Profile
            </Link>
            <br></br>
            <Link className="footerLink" to="/contact">
              Contact Us
            </Link>
            <br></br>
          </Col>

          <Col lg={3} md={6} sm={12} className="p-5 text-justify">
            <h2 className="footerName ">Policy</h2>
            <Link className="footerLink" to="/refund">
              Refund Policy
            </Link>
            <br></br>
            <Link className="footerLink" to="/trems">
              Trems And Condition
            </Link>
            <br></br>
            <Link className="footerLink" to="/privacy">
              Privaci Policy
            </Link>
            <br></br>
          </Col>
        </Row>
      </Container>
      <Container fluid="true" className="text-center copyrightSection">
        <a className="copyrightLink" href="#">
          © Copyright 2023 by Thanh Dat
        </a>
      </Container>
    </Fragment>
  );
};

export default Footer;
