import React, { useEffect, useState } from "react";
import { Form, Button, Card, Table } from "react-bootstrap";
import AppUrl from "../../api/AppUrl";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const Quiz = ({ tests, user, lesson }) => {
  const [answers, setAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);

  const fetchTestResult = (tests) => {
    setTestResult(null);

    if (tests) {
      axios
        .post(AppUrl.GetTestResult + user.id + "/" + tests.id)
        .then(function (response) {
          console.log(tests.id);

          if (response.data.result) {
            setTestResult(response.data.result);

            console.log(testResult);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    // console.log(AppUrl.GetTestResult + user.id + "/" + tests.id);
    fetchTestResult(tests);
  }, [tests]);

  const handleAnswerChange = (
    questionId,
    optionId,
    correct,
    score,
    multiAnswer,
    e
  ) => {
    // console.log(e.target.checked);
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.question_id === questionId
      );

      if (existingAnswerIndex !== -1) {
        const existingAnswer = prevAnswers[existingAnswerIndex];
        if (multiAnswer) {
          // Câu hỏi cho phép chọn nhiều đáp án
          const existingOption = existingAnswer.option_choose.find(
            (option) => option.option_id === optionId
          );

          if (existingOption) {
            // Nếu lựa chọn đã tồn tại, chỉ cần cập nhật giá trị correct
            existingOption.checked = e.target.checked;
          } else {
            // Nếu lựa chọn chưa tồn tại, thêm lựa chọn mới vào mảng
            existingAnswer.option_choose.push({
              option_id: optionId,
              correct: correct,
              checked: true,
            });
          }
        } else {
          // Câu hỏi chỉ cho phép chọn một đáp án
          existingAnswer.option_choose = [
            {
              option_id: optionId,
              correct: correct,
              checked: e.target.checked,
            },
          ];
        }

        // Tạo một bản sao của prevAnswers để cập nhật trạng thái checked
        const updatedAnswers = [...prevAnswers];

        // Lặp qua các câu trả lời
        updatedAnswers.forEach((answer) => {
          // Kiểm tra xem câu trả lời có trùng với câu hỏi hiện tại không
          if (answer.question_id === questionId) {
            // Lặp qua các lựa chọn của câu trả lời
            answer.option_choose.forEach((option) => {
              // Kiểm tra xem lựa chọn có trùng với lựa chọn được chọn không
              if (option.option_id === optionId) {
                option.checked = e.target.checked;
              }
            });
          }
        });

        return updatedAnswers;
      }

      const newAnswer = {
        question_id: questionId,
        multi_answer: multiAnswer ? 1 : 0,
        option_choose: [
          {
            option_id: optionId,
            correct: correct,
            checked: true,
          },
        ],
        score: score,
      };

      return [...prevAnswers, newAnswer];
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const test = {
      test_id: tests.id,
      answers: answers,
      user_id: user.id,
    };

    // console.log(test);
    axios
      .post(AppUrl.TestData + `${tests.id}/${user.id}`, test)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        fetchTestResult(tests);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const testResultView = testResult && (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Trạng thái kiểm tra</th>
            <th>Người thực hiện</th>
            <th>Tổng điểm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FontAwesomeIcon icon={faSquareCheck} color="blue" />
            </td>
            <td>{user.name}</td>
            <td>{testResult.test_result}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );

  console.log("test", tests);
  return (
    <div>
      <h1>{tests ? tests.title : ""}</h1>
      {testResult ? (
        testResultView
      ) : (
        <Form onSubmit={handleSubmit}>
          {tests ? (
            tests.questions.map((question) => (
              <Card key={question.id} className="mb-4">
                <Card.Body>
                  <Card.Title>{question.question}</Card.Title>
                  {question.question_image && question.question_image.substring(question.question_image.lastIndexOf("/") + 1) !== "default.png" ? (
                    <Card.Img
                      variant="top"
                      src={"http://127.0.0.1:8000" + question.question_image}
                      style={{ width: "60%" }}
                    />
                  ) : (
                    ""
                  )}

                  <Form.Group>
                    {question.options.map((option) => (
                      <Form.Check
                        key={option.id}
                        type={
                          question.multi_answer === 1 ? "checkbox" : "radio"
                        }
                        id={`question-${question.id}-option-${option.id}`}
                        name={`question-${question.id}`}
                        label={option.option_text}
                        checked={option.checked}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.id,
                            option.id,
                            option.correct,
                            question.score,
                            question.multi_answer,
                            e
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
      )}
    </div>
  );
};

export default Quiz;
