import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const Video = () => {
  const [show, setShow] = useState(false);
  const [videoDescription, setVideoDescription] = useState("...");
  const [videoUrl, setVideoUrl] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.HomeVideo)
      .then((result) => {
        setVideoDescription(result[0]["video_description"]);
        setVideoUrl(result[0]["video_url"]);
      })
      .catch((error) => {
        setVideoDescription("...");
        setVideoUrl("...");
      });
  }, []);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">OUR VIDEOS</h1>
        <div className="bottom"></div>
        <Row>
          <Col lg={6} md={6} sm={12} className="videoText text-justify">
            {parse(videoDescription)}
          </Col>

          <Col lg={6} md={6} sm={12} className="videoCard">
            <FontAwesomeIcon
              onClick={openModal}
              className="iconProject point"
              icon={faVideoSlash}
            />
          </Col>
        </Row>
      </Container>
      <Modal size="lg" show={show} onHide={closeModal}>
        <Modal.Body>
          <Player src={videoUrl}>
            <BigPlayButton position="center" />
          </Player>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Video;
