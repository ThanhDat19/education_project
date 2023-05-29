import React, { useState } from "react";

const Quiz = ({ tests }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi câu trả lời đến server hoặc xử lý dữ liệu khác ở đây
  };

  return (
    <div>
      <h1>Bài kiểm tra</h1>
      <form onSubmit={handleSubmit}>
        {tests ? (
          tests.questions.map((question) => (
            <div className="question" key={question.id}>
              <p>{question.question}</p>
              <div className="options">
                {question.options.map((option) => (
                  <div className="option" key={option.id}>
                    <input
                      type="radio"
                      name={`q${tests.id}`}
                      value={option.id}
                      onChange={() => handleAnswerChange(tests.id, option.id)}
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
