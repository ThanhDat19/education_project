import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../../api/AppUrl";
import ReactPaginate from "react-paginate";
import parse from "html-react-parser";
import SweetAlert from "react-bootstrap-sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherTest = ({ user }) => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestDescription, setNewTestDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editTestId, setEditTestId] = useState("");
  const [editTestTitle, setEditTestTitle] = useState("");
  const [editTestType, setEditTestType] = useState("");
  const [editTestDescription, setEditTestDescription] = useState("");
  const [showEditTestModal, setShowEditTestModal] = useState(false);

  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [totalQuestionPages, setTotalQuestionPages] = useState(0);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState([]);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(1);

  const [showAlert, setShowAlert] = useState(false);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchTests(1);
    fetchQuestion(1);
  }, []);

  useEffect(() => {
    filterTests();
  }, [tests, selectedCourse, selectedLesson]);

  const fetchQuestion = async (page) => {
    try {
      const response = await axios.get(AppUrl.getQuestions + user.id, {
        params: { page, questionTypes: selectedQuestionTypes }, // Pass selected question types
      });
      if (response.data.questions) {
        console.log(response.data.questions);
        setAllQuestions(response.data.questions.data);
        setQuestionTypes(response.data.questionTypes);
        setTotalQuestionPages(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Modify the handleQuestionTypeChange function to update the selected question types
  const handleQuestionTypeChange = (event) => {
    const coursesSelected = courses.filter(
      (courses) => courses.id == selectedCourse
    );

    const questionTypeId = coursesSelected[0].type;
    setSelectedQuestionTypes((prevSelectedQuestionTypes) =>
      event.target.checked
        ? [...prevSelectedQuestionTypes, questionTypeId]
        : prevSelectedQuestionTypes.filter((id) => id !== questionTypeId)
    );
  };

  const fetchTests = async (page) => {
    try {
      const response = await axios.get(AppUrl.teacherGetTests + user.id, {
        params: { page },
      });
      if (response.data.tests) {
        setTests(response.data.tests);
        setCourses(response.data.courses);
        setTotalPages(response.data.total_pages);
        setTypes(response.data.types);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const filterTests = () => {
    let filtered = tests;

    if (selectedCourse) {
      filtered = filtered.filter((test) => test.course.id == selectedCourse);
    }

    if (selectedLesson) {
      filtered = filtered.filter((test) => test.lesson.id == selectedLesson);
    }

    setFilteredTests(filtered);
  };

  const handleAddTestModal = () => {
    setShowAddTestModal(!showAddTestModal);
  };

  const handleNewTestTitleChange = (event) => {
    setNewTestTitle(event.target.value);
  };

  const handleNewTestDescriptionChange = (event) => {
    setNewTestDescription(event.target.value);
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedLesson("");
  };

  const handleQuestionChange = (questionId, checked) => {
    if (checked) {
      setSelectedQuestions((prevSelectedQuestions) => [
        ...prevSelectedQuestions,
        questionId,
      ]);
    } else {
      setSelectedQuestions((prevSelectedQuestions) =>
        prevSelectedQuestions.filter((id) => id !== questionId)
      );
    }
  };
  const renderQuestions = () => {
    if (allQuestions.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            Không có câu hỏi nào.
          </td>
        </tr>
      );
    }

    return allQuestions.map((question, index) => {
      if (editTestType) {
        const questionType = questionTypes.find(
          (type) => type.id === editTestType
        );
        if (!questionType) {
          return null;
        }

        return (
          <tr key={question.id}>
            <td>{index + 1}</td>
            <td>{question.question}</td>
            <td>{questionType?.name}</td>
            <td>{question.score}</td>
            <td>{question.multi_answer ? "Có" : "Không"}</td>
            <td>
              <Form.Check
                type="checkbox"
                id={`question-${question.id}`}
                checked={selectedQuestions.includes(question.id)}
                onChange={(e) =>
                  handleQuestionChange(question.id, e.target.checked)
                }
              />
            </td>
          </tr>
        );
      }
    });
  };
  const handleAddQuestions = () => {
    setSelectedQuestions([]);
  };

  const handleUpdateTest = async () => {
    console.log(selectedQuestions);
    try {
      const response = await axios.put(AppUrl.UpdateTest + editTestId, {
        title: editTestTitle,
        description: editTestDescription,
        selectedQuestions: selectedQuestions,
      });
      console.log(response.data);
      if (response.status === 200) {
        fetchTests(1);
        setShowEditTestModal(false);
        toast.success("Cập nhật bài kiểm tra thành công");
      }
    } catch (error) {
      console.error("Error updating test:", error);
      toast.error("Cập nhật bài kiểm tra thành công");
    }
  };

  const handleAddTest = async () => {
    try {
      const response = await axios.post(AppUrl.teacherPostTests, {
        course_id: selectedCourse,
        lesson_id: selectedLesson,
        title: newTestTitle,
        description: newTestDescription,
        type: selectedType,
      });
      if (response.status === 200) {
        fetchTests(1);
        setShowAddTestModal(false);
        toast.success("Thêm mới bài kiểm tra thành công");
      }
    } catch (error) {
      console.error("Error adding test:", error);
      toast.error("Có lỗi xảy ra vui lòng kiểm tra");
    }
  };

  const deleteTest = async (id) => {
    setShowAlert(true);
  };

  const handleConfirmDeleteChoice = async (id) => {
    try {
      await axios.delete(AppUrl.DeleteTest + id);
      fetchTests(1);
      toast.success("Xóa bài kiểm tra thành công");
      setShowAlert(false);
    } catch (error) {
      console.error("Error deleting test:", error);
      toast.error("Xóa bài kiểm tra thất bại");
    }
  };

  const handleCancelChoice = () => {
    setShowAlert(false);
  };
  const handlePageClick = (event) => {
    fetchTests(event.selected + 1);
  };
  const handleQuestionPageClick = (event) => {
    fetchQuestion(event.selected + 1);
  };
  const renderTests = () => {
    if (filteredTests.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center">
            Không có bài kiểm tra nào.
          </td>
        </tr>
      );
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Tháng trong đối tượng Date bắt đầu từ 0, nên cần +1
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    };

    const handleEditTestModal = (test) => {
      console.log(test);
      setEditTestId(test.id);
      setEditTestTitle(test.title);
      setEditTestType(test.type);
      setEditTestDescription(test.description);
      setShowEditTestModal(true);
    };

    return filteredTests.map((test) => (
      <tr key={test.id}>
        <td>{test.course.title}</td>
        <td>{test.lesson.title}</td>
        <td>{test.title}</td>
        <td>{test.published ? "Có" : "Không"}</td>
        <td>{formatDate(test.created_at)}</td>
        <td>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleEditTestModal(test)}
          >
            Sửa
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteTest(test.id)}
          >
            Xóa
          </Button>
          {showAlert && (
            <SweetAlert
              title="Xác nhận"
              showCancel
              cancelBtnText="Hủy"
              confirmBtnText="Xóa"
              confirmBtnBsStyle="danger"
              onConfirm={() => handleConfirmDeleteChoice(test.id)}
              onCancel={handleCancelChoice}
            >
              Bạn có chắc chắn muốn xóa bài kiểm tra không?
            </SweetAlert>
          )}
        </td>
      </tr>
    ));
  };

  const renderLessonOptions = () => {
    if (!selectedCourse) {
      return <option value="">Tất cả</option>;
    }

    const course = courses.find((course) => course.id == selectedCourse);

    if (!course) {
      return null;
    }

    return (
      <>
        <option value="">Tất cả</option>
        {course.lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </option>
        ))}
      </>
    );
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <h1 className="serviceMainTitle text-center">QUẢN LÝ BÀI KIỂM TRA</h1>
      <Row className="my-3">
        <Col>
          <Button variant="primary" onClick={handleAddTestModal}>
            Thêm mới bài kiểm tra
          </Button>
        </Col>
        <Col>
          <Form.Group controlId="formCourse">
            <Form.Label>Khóa học:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Tất cả</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLesson">
            <Form.Label>Bài học:</Form.Label>
            <Form.Control
              as="select"
              value={selectedLesson}
              onChange={(event) => setSelectedLesson(event.target.value)}
            >
              {renderLessonOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Khóa học</th>
            <th>Bài học</th>
            <th>Tiêu đề</th>
            <th>Đã được công bố</th>
            <th>Thời gian tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderTests()}</tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="sau"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="trước"
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
      <Modal
        show={showEditTestModal}
        onHide={() => setShowEditTestModal(false)}
        size="lg"
        style={{ maxWidth: "2000px", width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Bài Kiểm Tra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formTitle">
            <Form.Label>Tiêu đề:</Form.Label>
            <Form.Control
              type="text"
              value={editTestTitle}
              onChange={(e) => setEditTestTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Miểu tả:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editTestDescription}
              onChange={(e) => setEditTestDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formQuestionTypes">
            <Form.Label>Lĩnh vực:</Form.Label>
            {questionTypes.map((type) => {
              console.log(editTestType);
              const shouldRender = editTestType === type.id;
              if (shouldRender) {
                return (
                  <Form.Label
                    style={{ marginLeft: "8px" }}
                    key={type.id}
                    id={type.id}
                  >
                    {type.name}
                  </Form.Label>
                );
              }
              return null;
            })}
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Câu hỏi</th>
                <th>Loại câu hỏi</th>
                <th>Điểm số</th>
                <th>Nhiều đáp án</th>
                <th>Chọn</th>
              </tr>
            </thead>
            <tbody>{renderQuestions()}</tbody>
            <ReactPaginate
              breakLabel="..."
              nextLabel="sau"
              onPageChange={handleQuestionPageClick}
              pageRangeDisplayed={5}
              pageCount={totalQuestionPages}
              previousLabel="trước"
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
              initialPage={currentQuestionPage - 1}
            />
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditTestModal(false)}
          >
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateTest}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddTestModal}
        onHide={handleAddTestModal}
        size="lg"
        style={{ maxWidth: "2000px", width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bài Kiểm Tra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCourse">
            <Form.Label>Course:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Chọn khóa học</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formLesson">
            <Form.Label>Lesson:</Form.Label>
            <Form.Control
              as="select"
              value={selectedLesson}
              onChange={(event) => setSelectedLesson(event.target.value)}
            >
              {renderLessonOptions()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={newTestTitle}
              onChange={handleNewTestTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newTestDescription}
              onChange={handleNewTestDescriptionChange}
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Lĩnh vực:</Form.Label>
            <Form.Control
              as="select"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              <option value="">Tất cả</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddTestModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddTest}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

export default TeacherTest;
