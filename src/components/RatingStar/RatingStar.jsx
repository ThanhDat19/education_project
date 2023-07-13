import axios from "axios";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import AppUrl from "../../api/AppUrl";
import BadWordsFilter from "bad-words";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function RatingStar({ user, course, handleCloseReViewCourse }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [content, setContent] = useState("");
  const stars = Array(5).fill(0);
  const filter = new BadWordsFilter();

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleReViewCourse = () => {
    console.log(currentValue + "-----" + content);
    console.log(user.id + "-----" + course);
    try {
      if (filter.isProfane(content)) {
        axios
          .post(AppUrl.ReView, {
            star_count: currentValue,
            user_id: user.id,
            course_id: course,
            content: content,
            impolite: 1,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post(AppUrl.ReView, {
            star_count: currentValue,
            user_id: user.id,
            course_id: course,
            content: content,
            impolite: 0,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {}

    handleCloseReViewCourse();
  };
  return (
    <div style={styles.container}>
      <h2> Đánh giá khóa học </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        name="content"
        placeholder="Trãi nghiệm của bạn thế nào?"
        style={styles.textarea}
        onChange={(e) => setContent(e.target.value)}
      />

      <button style={styles.button} onClick={handleReViewCourse}>
        Xác nhận
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default RatingStar;
