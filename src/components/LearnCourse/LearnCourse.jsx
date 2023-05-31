import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Quiz from "../Quiz/Quiz";

const LearnCourse = (props) => {
  const [id] = useState(props.id);
  const [lessons, setLessons] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [tests, setTests] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    RestClient.GetRequest(AppUrl.CourseDetails + id + "/learn").then(
      (result) => {
        setLessons(result);
      }
    );
  }, [id]);

  useEffect(() => {
    if (selectedLesson) {
      RestClient.GetRequest(AppUrl.TestData + selectedLesson).then((result) => {
        setTests(result);
      });
    }
  }, [selectedLesson]);

  useEffect(() => {
    if (lessons.length > 0) {
      let firstLesson = lessons[0];
      handleVideoSelect(firstLesson.video_url, firstLesson.id);
    }
  }, [lessons]);

  const handleVideoSelect = (video, id) => {
    console.log("call handleVideoSelect", id);
    setSelectedVideo(video);
    setSelectedLesson(id);
  };

  const opts = {
    height: "498",
    width: "100%",
    // playerVars: {
    // // https://developers.google.com/youtube/player_parameters
    // autoplay: 1,
    // },
  };

  const YouTubeView = useMemo(() => {
    let yt = (
      <iframe
        width="100%"
        height="498"
        src={`https://www.youtube.com/embed/${selectedVideo}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    );
    return yt;
  }, [selectedVideo]);

  const myView =
    lessons != null
      ? lessons.map((lesson) => (
          <li
            key={lesson.id}
            onClick={() => handleVideoSelect(lesson.video_url, lesson.id)}
          >
            <Card>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {lesson.position}. {lesson.title}
                  </p>
                  <footer className="blockquote-footer">
                    <FontAwesomeIcon
                      icon={faPlay}
                      fontSize={15}
                      color="green"
                    />{" "}
                    5 phút
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </li>
        ))
      : "No data";
  // console.log(tests);
  return (
    <>
      <Container className="mt-5">
        <Row className="mt-5">
          <Col lg={8} md={8} sm={12} className="mt-2">
            {/* Xem Video */}
            {/* <YouTube videoId={selectedVideo} opts={opts} /> */}
            {YouTubeView}
          </Col>
          <Col lg={4} md={4} sm={12} className="mt-2">
            {/* Danh sách bài học */}
            <div className="widget_feature">
              <h4 className="widget-title text-center">Nội dung khóa học</h4>
              <hr />
              <ul>{myView}</ul>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col lg={8} md={6} sm={12}>
            {/* Phần bình luận */}
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="comment" title="Bình Luận"></Tab>
              <Tab eventKey="test" title="Kiểm tra">
                
                {tests && <Quiz tests={tests.data} />}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LearnCourse;
