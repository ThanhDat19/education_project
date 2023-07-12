import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppUrl from "../../../api/AppUrl";
import DataTable from "react-data-table-component";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import RestClient from "../../../api/RestClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheck,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Lesson = ({ user, id }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [formValues, setFormValues] = useState({
    id: "",
    title: "",
    video_url: "",
    description: "",
    content: "",
    position: "",
  });

  const fetchLessonData = async () => {
    RestClient.GetRequest(AppUrl.CourseDetails + id + "/learn")
      .then(async (result) => {
        await setLessons(result);
      })
      .finally(() => {});
    setLoading(false);
  };

  useEffect(() => {
    fetchLessonData();
  }, []);

  const isFormValuesValid = () => {
    for (const key in formValues) {
      if (formValues.id === "") {
        continue;
      }
      if (formValues[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const handleSaveLesson = async () => {
    // Xử lý logic lưu bài giảng
    if (!selectedLesson) {
      //Thêm mới bài giảng
      console.log("Thêm");
      const check = await isFormValuesValid();
      console.log(formValues);
      try {
        if (check) {
          axios
            .post(AppUrl.teacherPostLesson + "/" + id, formValues)
            .then((response) => {
              fetchLessonData();
              toast.success("Thêm mới bài giảng thành công");
            });
        }
      } catch (error) {
        toast.error("Thêm mới bài giảng thất bại");
      }
    } else {
      try {
        console.log("Sửa");
        axios
          .post(AppUrl.UpdateLesson + formValues.id, formValues)
          .then((response) => {
            fetchLessonData();
            toast.success("Chỉnh sửa bài giảng thành công");
          });
      } catch (error) {
        toast.error("Chỉnh sửa bài giảng thất bại");
      }
    }
    setShowDialog(false); // Đóng dialog sau khi lưu

    // Reset các trường thông tin
    setFormValues({
      id: "",
      title: "",
      video_url: "",
      description: "",
      content: "",
      position: "",
    });
  };

  const handleAddLesson = () => {
    // Xử lý logic thêm bài giảng
    setFormValues({
      id: "",
      title: "",
      video_url: "",
      description: "",
      content: "",
      position: "",
    });
    setSelectedLesson(null);
    setShowDialog(true); // Hiển thị dialog thêm bài giảng
  };

  const handleEditLesson = (lesson) => {
    // Xử lý logic sửa bài giảng
    setSelectedLesson(lesson);
    setFormValues({
      id: lesson.id,
      title: lesson.title,
      video_url: lesson.video_url,
      description: lesson.short_text,
      content: lesson.full_text,
      position: lesson.position,
    });
    setShowDialog(true); // Hiển thị dialog sửa bài giảng
  };

  const handleDeleteLesson = async (lesson) => {
    try {
      await axios.delete(AppUrl.DeleteLesson + lesson.id);
      await fetchLessonData();
      toast.success("Xóa bài giảng thành công");
    } catch (error) {
      toast.error("Xóa bài giảng thất bại");
    }
  };

  const handleClose = () => {
    setShowDialog(false); // Đóng dialog khi nhấn nút đóng
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const LessonTable = () => {
    if (loading) {
      return <p>Đang tải...</p>;
    }
    const columns = [
      {
        name: "Tên bài học",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Miêu tả",
        selector: (row) => row.short_text,
        sortable: true,
      },
      {
        name: "Trạng thái",
        selector: (row) =>
          row.free_lesson + 0 === 1 ? (
            <FontAwesomeIcon
              className="iconBullent"
              style={{ color: "green" }}
              icon={faCheck}
            />
          ) : (
            <FontAwesomeIcon
              className="iconBullent"
              style={{ color: "red" }}
              icon={faCancel}
            />
          ),
        sortable: true,
      },
      {
        name: "Vị trí",
        selector: (row) => row.position,
        sortable: true,
      },
      {
        name: "Action",
        sortable: false,
        selector: "null",
        cell: (row) => [
          <FontAwesomeIcon
            key={row.title}
            onClick={() => handleEditLesson(row)}
            className="fa-2x mx-2"
            icon={faEdit}
          />,
          <FontAwesomeIcon
            onClick={() => handleDeleteLesson(row)}
            className="fa-2x "
            icon={faTrash}
          />,
        ],
      },
    ];

    const customStyles = {
      headRow: {
        style: {
          border: "none",
        },
      },
      headCells: {
        style: {
          color: "#202124",
          fontSize: "14px",
        },
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: "rgb(230, 244, 244)",
          borderBottomColor: "#FFFFFF",
          borderRadius: "25px",
          outline: "1px solid #FFFFFF",
        },
      },
      pagination: {
        style: {
          border: "none",
        },
      },
    };

    return (
      <DataTable
        title="Danh Sách Bài Giảng"
        columns={columns}
        data={lessons}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        pagination
      />
    );
  };

  return (
    <Fragment>
      <Modal
        show={showDialog}
        onHide={handleClose}
        size="lg"
        style={{ maxWidth: "2000px", width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedLesson ? "Sửa bài giảng" : "Thêm bài giảng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLessonTile">
              <Form.Label className="font-weight-bold">
                Tiêu đề bài học
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLessonVideoUrl">
              <Form.Label className="font-weight-bold">Video URL</Form.Label>
              <Form.Control
                type="text"
                name="video_url"
                value={formValues.video_url}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLessonDes">
              <Form.Label className="font-weight-bold">Miêu tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLessonContent">
              <Form.Label className="font-weight-bold">Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="content"
                value={formValues.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formLessonPosition ">
              <Form.Label className="font-weight-bold">Vị trí</Form.Label>
              <Form.Control
                type="number"
                name="position"
                value={formValues.position}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveLesson}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">QUẢN LÝ BÀI HỌC</h1>
        <div className="bottom"></div>
        <Row>
          <Col md={3}>
            <Button onClick={handleAddLesson}>Thêm bài giảng</Button>
          </Col>
          <Col md={9}>
            <Row>{LessonTable()}</Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Lesson;
