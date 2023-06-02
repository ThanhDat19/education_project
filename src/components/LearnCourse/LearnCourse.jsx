import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { Fragment } from "react";
import { Col, Container, Row, Card, ListGroup } from "react-bootstrap";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Quiz from "../Quiz/Quiz";
import Comment from "../Comment/Comment";

const LearnCourse = (props) => {
  const [id] = useState(props.id);
  const [lessons, setLessons] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [tests, setTests] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    RestClient.GetRequest(AppUrl.CourseDetails + id + "/learn")
      .then((result) => {
        setLessons(result);
        // let token = localStorage.getItem("token");
        // let user = localStorage.getItem("user");
        if (props.user) {
          setIsLoggedIn(true);

          setUser(props.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .finally(() => {
        setIsLoading(false); // Kết thúc tải dữ liệu
      });
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
    // console.log("call handleVideoSelect", id);
    setSelectedVideo(video);
    setSelectedLesson(id);
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
          <ListGroup.Item
            key={lesson.id}
            onClick={() => handleVideoSelect(lesson.video_url, lesson.id)}
            action
          >
            <Card>
              <Card.Body>
                <Card.Text>
                  {lesson.position}. {lesson.title}
                </Card.Text>
                <Card.Text>
                  <FontAwesomeIcon icon={faPlay} /> 5 phút
                </Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))
      : "No data";

  return (
    <>
      {isLoading ? ( // Kiểm tra trạng thái tải
        <p>Loading...</p>
      ) : (
        <Fragment>
          <Container className="mt-5">
            <Row className="mt-5">
              <Col lg={8} md={8} sm={12} className="mt-2">
                {/* Xem Video */}
                {YouTubeView}
              </Col>
              <Col lg={4} md={4} sm={12} className="mt-2">
                {/* Danh sách bài học */}
                <div className="widget_feature">
                  <h4 className="widget-title text-center">
                    Nội dung khóa học
                  </h4>
                  <hr />
                  <ListGroup>{myView}</ListGroup>
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col lg={8} md={6} sm={12}>
                <Tabs defaultActiveKey="comment" id="uncontrolled-tab-example">
                  <Tab eventKey="comment" title="Bình Luận">
                    {/* Phần bình luận */}
                    <Comment />
                  </Tab>
                  <Tab eventKey="test" title="Kiểm tra">
                    {tests && <Quiz tests={tests.data} user={user} />}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </>
  );
};

export default LearnCourse;
