import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import ReactPaginate from "react-paginate";
import AppUrl from "../../../api/AppUrl";

const TeacherQuestion = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuestion, setSearchQuestion] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_type_id: "",
    question: "",
    score: 0,
    multi_answer: false,
    image: null,
    options: [{ content: "", isCorrect: false }],
  });
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      getQuestions(1);
    }, 500);
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchQuestion, selectedQuestionType]);

  const getQuestions = async (page) => {
    try {
      setCurrentPage(page);
      const response = await axios.get(AppUrl.getQuestions + user.id, {
        params: { page },
      });
      if (response.data.questions) {
        setQuestions(response.data.questions.data);
        setLoading(false);
        setTotalQuestions(response.data.total_questions);
        setTotalPages(response.data.total_pages);
        setQuestionTypes(response.data.questionTypes);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };
  const handleAddQuestion = async () => {
    try {
      // Kiểm tra xem các trường thông tin câu hỏi đã được điền đầy đủ
      if (
        newQuestion.question.trim() === "" ||
        newQuestion.question_type_id === "" ||
        newQuestion.score === ""
      ) {
        // Hiển thị thông báo lỗi nếu thiếu thông tin
        alert("Vui lòng điền đầy đủ thông tin câu hỏi.");
        return;
      }

      // Gửi yêu cầu thêm câu hỏi mới lên server
      // Gửi yêu cầu thêm câu hỏi mới lên server
      const formData = new FormData();
      formData.append("question", newQuestion.question);
      formData.append("question_type_id", newQuestion.question_type_id);
      formData.append("score", newQuestion.score);
      formData.append("multi_answer", newQuestion.multi_answer);
      formData.append("image", newQuestion.image);
      formData.append("options", JSON.stringify(newQuestion.options));
      const response = await axios.post(AppUrl.postQuestion, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data)
      if (response.data) {
        // Đặt lại giá trị của newQuestion về rỗng
        setNewQuestion({
          question_type_id: "",
          question: "",
          score: 0,
          multi_answer: false,
          image: null,
          options: [{ content: "", isCorrect: false }],
        });

        // Đóng form dialog thêm câu hỏi
        handleCloseAddQuestionModal();

        // Cập nhật danh sách câu hỏi bằng cách gọi lại API hoặc thực hiện các bước khác cần thiết để cập nhật danh sách câu hỏi

        // Hiển thị thông báo thành công
        alert("Thêm câu hỏi thành công!");
      } else {
        // Hiển thị thông báo lỗi nếu thêm câu hỏi không thành công
        alert("Thêm câu hỏi không thành công. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      // Hiển thị thông báo lỗi nếu xảy ra lỗi khi thêm câu hỏi
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const handleShowAddQuestionModal = () => {
    setShowAddQuestionModal(true);
  };

  const handleCloseAddQuestionModal = () => {
    setShowAddQuestionModal(false);
  };

  const filterQuestions = () => {
    const filtered = questions.filter((value) => {
      const isMatchedQuestion =
        searchQuestion === "" ||
        value.question.toLowerCase().includes(searchQuestion.toLowerCase());

      const isMatchedQuestionType =
        selectedQuestionType === "" ||
        value.question_type_id == selectedQuestionType;

      return isMatchedQuestion && isMatchedQuestionType;
    });

    setFilteredQuestions(filtered);
  };

  const handlePageClick = (event) => {
    getQuestions(event.selected + 1);
  };

  const handleQuestionTypeChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };

  const handleSearch = () => {
    getQuestions(1);
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewQuestion({ ...newQuestion, image: selectedImage });

    // Generate a preview URL for the selected image
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
  };

  useEffect(() => {
    // Clean up the preview URL when the component is unmounted or when a new image is selected
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  //Option

  const handleAddOption = () => {
    setNewQuestion((prevState) => ({
      ...prevState,
      options: [...prevState.options, { content: "", isCorrect: false }],
    }));
  };

  const handleOptionChange = (index, field, value) => {
    setNewQuestion((prevState) => {
      const options = [...prevState.options];
      options[index][field] = value;
      return { ...prevState, options };
    });
  };

  const handleCorrectAnswerChange = (index, isChecked) => {
    setNewQuestion((prevState) => {
      const options = [...prevState.options];
      options[index].isCorrect = isChecked;

      // Nếu multi_answer được chọn, hãy đảm bảo rằng các lựa chọn được chọn là đáp án đúng
      if (prevState.multi_answer) {
        const checkedOptions = options.filter((option) => option.isCorrect);
        if (checkedOptions.length === 0) {
          // Nếu không có lựa chọn nào được chọn là đáp án đúng, hãy chọn lựa chọn hiện tại
          options[index].isCorrect = true;
        }
      } else {
        // Nếu không phải multi_answer, hãy hủy chọn các lựa chọn khác (nếu có)
        options.forEach((option, i) => {
          if (i !== index) {
            option.isCorrect = false;
          }
        });
      }

      return { ...prevState, options };
    });
  };

  const multiAnswerChange = (checked) => {
    setNewQuestion({
      ...newQuestion,
      multi_answer: checked,
    });
    setNewQuestion((prevState) => {
      const options = [...prevState.options];

      options.forEach((option, i) => {
        option.isCorrect = false;
      });

      return { ...prevState, options };
    });
  };

  const handleRemoveOption = (index) => {
    setNewQuestion((prevState) => {
      const options = [...prevState.options];
      options.splice(index, 1);
      return { ...prevState, options };
    });
  };
  const renderQuestions = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (filteredQuestions.length === 0) {
      return <p>No matching questions found.</p>;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Question Type</th>
            <th>Score</th>
            <th>Multi Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((item) => (
            <tr key={item.id}>
              <td>{item.question}</td>
              <td>{item.question_type_id}</td>
              <td>{item.score}</td>
              <td>{item.multi_answer}</td>
              <td>
                <Link to={"/question-details/" + item.id}>View Details</Link>
                <Link to={"/question-edit/" + item.id}>Edit</Link>
                <Link to={"/question-delete/" + item.id}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">MY QUESTIONS</h1>
        <div className="bottom"></div>
        <Row>
          <Col md={3}>
            <div style={{ marginBottom: "30px" }}>
              <input
                style={{
                  width: "100%",
                  height: "30px",
                  marginBottom: filteredQuestions.length === 0 ? "0" : "10px",
                }}
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchQuestion(e.target.value)}
              />
              <select
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
                value={selectedQuestionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="">All Question Types</option>
                {questionTypes.map((type) => (
                  <option value={type.id} key={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <Modal
              show={showAddQuestionModal}
              onHide={handleCloseAddQuestionModal}
              size="lg"
              style={{ maxWidth: "2000px", width: "100%" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Thêm Câu Hỏi</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formQuestionTypes">
                  <Form.Label>Loại câu hỏi:</Form.Label>
                  <Form.Control
                    as="select"
                    value={newQuestion.question_type_id}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question_type_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn loại câu hỏi</option>
                    {questionTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formQuestion">
                  <Form.Label>Câu hỏi:</Form.Label>
                  <Form.Control
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formScore">
                  <Form.Label>Điểm:</Form.Label>
                  <Form.Control
                    type="number"
                    value={newQuestion.score}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, score: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control
                    type="file"
                    name="image_validate"
                    id="upload"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ marginTop: "10px", maxWidth: "400px" }}
                    />
                  )}
                </Form.Group>
                <Form.Group controlId="formMultiAnswer">
                  <Form.Check
                    type="checkbox"
                    label="Multi Answer"
                    checked={newQuestion.multi_answer}
                    onChange={(e) => multiAnswerChange(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Lựa chọn:</Form.Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        value={option.content}
                        onChange={(e) =>
                          handleOptionChange(index, "content", e.target.value)
                        }
                      />
                      <Form.Check
                        type={newQuestion.multi_answer ? "checkbox" : "radio"}
                        label="Đúng"
                        checked={option.isCorrect}
                        onChange={(e) =>
                          handleCorrectAnswerChange(index, e.target.checked)
                        }
                        disabled={!newQuestion.multi_answer && option.isCorrect}
                      />
                      <Button
                        variant="outline-danger"
                        className="mb-2"
                        onClick={() => handleRemoveOption(index)}
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}
                  <Button variant="primary" onClick={handleAddOption}>
                    <span>+</span> Thêm lựa chọn
                  </Button>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseAddQuestionModal}
                >
                  Đóng
                </Button>
                <Button variant="primary" onClick={handleAddQuestion}>
                  Xác nhận
                </Button>
              </Modal.Footer>
            </Modal>

            <Button onClick={handleShowAddQuestionModal}>
              Thêm câu hỏi mới
            </Button>
          </Col>
          <Col md={9}>
            <Row>{renderQuestions()}</Row>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName={"page-item"}
              breakLinkClassName="page-link"
              marginPagesDisplayed={2}
              containerClassName={"pagination"}
              activeClassName={"active"}
              initialPage={currentPage - 1}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TeacherQuestion;
