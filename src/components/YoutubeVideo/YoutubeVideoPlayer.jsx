import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import AppUrl from "../../api/AppUrl";
import axios from "axios";

const YoutubeVideoPlayer = ({ url, user, lesson, course, updateLesson }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now());

  useEffect(() => {
    if (url) {
      setVideoKey(Date.now());
      setIsPlaying(false);
      checkLessonCompletion();
    }
  }, [url]);

  const checkLessonCompletion = () => {
    if (user.roles === "student") {
      console.log(user.id);

      // Code to check if the lesson is completed in the database or make an API call
      axios
        .post(AppUrl.getLessonOfStudent + user.id, {
          lesson_id: lesson,
          course_id: course,
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const updateLessonOfStudent = async (currentTime) => {
    console.log(user.id);

    if (user.roles === "student") {
      console.log(currentTime.toFixed());
      await axios
        .post(AppUrl.updateLessonOfStudent + user.id, {
          lesson_id: lesson,
          course_id: course,
          current_time: currentTime.toFixed(),
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      updateLesson(duration);
    }
  };
  const handleProgress = (progress) => {
    setDuration(progress.loadedSeconds);
    setCurrentTime(progress.playedSeconds);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = async () => {
    setIsPlaying(false);
    await updateLessonOfStudent(currentTime);
  };

  return (
    url && (
      <>
        <ReactPlayer
          key={videoKey}
          className="video-player"
          url={`https://www.youtube.com/watch?v=${url}`}
          controls
          style={{ width: "100%", height: "498px" }}
          onProgress={handleProgress}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoPause}
        />
        {/* <p>Video Duration: {duration.toFixed()}</p>
        <p>Current Time: {currentTime.toFixed()}</p> */}
        {/* {isPlaying && <p>Video is playing...</p>} */}
      </>
    )
  );
};

export default YoutubeVideoPlayer;
