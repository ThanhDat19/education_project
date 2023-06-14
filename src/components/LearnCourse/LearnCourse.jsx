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
import YoutubeVideoPlayer from "../YoutubeVideo/YoutubeVideoPlayer";

const LearnCourse = (props) => {
  const [id] = useState(props.id);
  const [lessons, setLessons] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [tests, setTests] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLessonData = () => {
    RestClient.GetRequest(AppUrl.CourseDetails + id + "/learn")
      .then((result) => {
        console.log(result);
        setLessons(result);
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
  };
  useEffect(() => {
    fetchLessonData();
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
  }, []);

  const handleVideoSelect = async (video, id) => {
    // console.log("call handleVideoSelect", id);
    setSelectedVideo(video);
    setSelectedLesson(id);
  };

  const updateLesson = (idLesson, value) => {
    // Duyệt qua từng phần tử trong danh sách lessons
    const updatedLessons = lessons.map((lesson) => {
      // Kiểm tra nếu id của lesson trùng khớp với idLesson
      if (lesson.id === idLesson) {
        const data = lesson.students;
        data[0].watched_video = value;
        // Cập nhật giá trị của lesson
        return {
          ...lesson,
          students: data,
        };
      }
      // Trả về lesson không thay đổi
      return lesson;
    });

    // Cập nhật danh sách lessons trong state
    setLessons(updatedLessons);
  };

  const YouTubeView = useMemo(() => {
    let yt = (
      <YoutubeVideoPlayer
        url={selectedVideo}
        user={user}
        lesson={selectedLesson}
        course={id}
        updateLesson={updateLesson}
      />
    );
    return yt;
  }, [selectedVideo]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const caculatiorTimeFinish = (video_time, watched_time) => {
    return (watched_time / video_time) * 100;
  };

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
                  <FontAwesomeIcon icon={faPlay} />{" "}
                  {formatTime(lesson.video_time)}
                  {"  "}
                  {caculatiorTimeFinish(
                    lesson.video_time,
                    lesson.students[0].watched_video
                  ) >= 80
                    ? "Hoàn thành"
                    : "Chưa hoàn thành"}
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
