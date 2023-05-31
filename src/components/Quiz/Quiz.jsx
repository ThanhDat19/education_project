import React, { useState } from "react";
import AppUrl from "../../api/AppUrl";
import axios from "axios";

const Quiz = ({ tests , user}) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (questionId, value, correct, score) => {
    setAnswers((prevAnswers) => {
      // Tìm xem câu trả lời cho câu hỏi này đã tồn tại trong prevAnswers chưa
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === questionId
      );

      // Nếu đã tồn tại, thì cập nhật giá trị của option_id
      if (existingAnswerIndex !== -1) {
        prevAnswers[existingAnswerIndex].option_id = value;
        prevAnswers[existingAnswerIndex].correct = correct;
        prevAnswers[existingAnswerIndex].score = score;
        return [...prevAnswers];
      }

      // Nếu chưa tồn tại, thêm một câu trả lời mới vào prevAnswers
      return [
        ...prevAnswers,
        { question_id: questionId,option_id : value, correct: correct, score: score },
      ];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi câu trả lời đến server hoặc xử lý dữ liệu khác ở đây
    const test = {
      test_id: tests.id,
      answers: answers,
      user_id: user.id
    };

    console.log(test)
    axios
      .post(AppUrl.TestData + `${tests.id}/ ${user.id}`,test)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>{tests ? tests.title : ""}</h1>
      <form onSubmit={handleSubmit}>
        {tests ? (
          tests.questions.map((question) => (
            //Câu hỏi
            <div className="question" key={question.id}>
              <p>{question.question}</p>
              <div className="options">
                {question.options.map((option) => (
                  //Các lựa chọn
                  <div className="option" key={option.id}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      onChange={() =>
                        handleAnswerChange(
                          question.id,
                          option.id,
                          option.correct,
                          question.score,
                        )
                      }
                    />
                    <label htmlFor={option.id}>{option.option_text}</label>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Không có bài kiểm tra</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
