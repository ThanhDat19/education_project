import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppUrl from "../../../api/AppUrl";
import { format, parse } from "date-fns";


const EditCourse = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (props.id) {
        const response = await axios.post(AppUrl.CourseDetails + props.id);

        setCourse(response.data.data);
        if (course) {
          setNewCourseTitle(course.title);
          setCourseCategoryId(course.course_category_id);
          setDescription(course.description);
          setPrice(course.price);
          // Chuyển đổi định dạng start_date sang ISO 8601
          const isoStartDate = format(
            parse(course.start_date, "yyyy-MM-dd HH:mm:ss", new Date()),
            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
          );
          setSelectedDate(new Date(isoStartDate));
        }
      }
    }
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNewCourseTitleChange = (event) => {
    setNewCourseTitle(event.target.value);
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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
  console.log(course);

  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">MY COURSES</h1>
        <div className="bottom"></div>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề khóa học"
                value={newCourseTitle}
                onChange={handleNewCourseTitleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Loại khóa học</Form.Label>
              <Form.Control
                as="select"
                name="course_category_id"
                value={courseCategoryId}
                onChange={(e) => setCourseCategoryId(e.target.value)}
              >
                <option value="">Chọn loại khóa học</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Miêu tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                id="content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Đơn giá</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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

            <Form.Group>
              <Form.Label>Ngày vào học</Form.Label>
              <ReactDatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              //   onClick={handleAddCourse}
            >
              Tạo khóa học
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditCourse;
