import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AppUrl from "../../api/AppUrl";
import axios from "axios";

const Quiz = ({ tests, user }) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (questionId, value, correct, score) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === questionId
      );

      if (existingAnswerIndex !== -1) {
        prevAnswers[existingAnswerIndex].option_id = value;
        prevAnswers[existingAnswerIndex].correct = correct;
        prevAnswers[existingAnswerIndex].score = score;
        return [...prevAnswers];
      }

      return [
        ...prevAnswers,
        {
          question_id: questionId,
          option_id: value,
          correct: correct,
          score: score,
        },
      ];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const test = {
      test_id: tests.id,
      answers: answers,
      user_id: user.id,
    };

    axios
      .post(AppUrl.TestData + `${tests.id}/${user.id}`, test)
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
      <Form onSubmit={handleSubmit}>
        {tests ? (
          tests.questions.map((question) => (
            <Card key={question.id} className="mb-4">
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Form.Group>
                  {question.options.map((option) => (
                    <Form.Check
                      key={option.id}
                      type="radio"
                      id={`question-${question.id}-option-${option.id}`}
                      name={`question-${question.id}`}
                      label={option.option_text}
                      onChange={() =>
                        handleAnswerChange(
                          question.id,
                          option.id,
                          option.correct,
                          question.score
                        )
                      }
                    />
                  ))}
                </Form.Group>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Không có bài kiểm tra</p>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Quiz;
