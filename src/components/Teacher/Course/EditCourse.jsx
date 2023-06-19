import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppUrl from "../../../api/AppUrl";
import { format, parse } from "date-fns";
import SweetAlert from "react-bootstrap-sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (props.id) {
        const response = await axios.post(AppUrl.CourseDetails + props.id);

        setCourse(response.data.data);
        setNewCourseTitle(response.data.data.title);
        setCourseCategoryId(response.data.data.course_category_id);
        setDescription(response.data.data.description);
        setPrice(response.data.data.price);
        setCategories(response.data.categories);
        const startDate = response.data.data.start_date;
        if (startDate) {
          const isoStartDate = format(
            parse(startDate, "yyyy-MM-dd HH:mm:ss", new Date()),
            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
          );
          setSelectedDate(new Date(isoStartDate));
        }

        // Set the image preview URL
        const imagePreviewURL =
          "http://127.0.0.1:8000" + response.data.data.course_image;
        setImagePreview(imagePreviewURL);
        setImage(response.data.data.course_image);
      }
    }
    fetchData();
  }, [props.id]);

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

  const handleUpdateCourse = async () => {
    setShowAlert(true);
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

  const handleConfirmChoice = async () => {
    setShowAlert(false);

    // Prepare the form data
    const formData = new FormData();
    formData.append("title", newCourseTitle);
    formData.append("course_category_id", courseCategoryId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("user_id", props.user.id);
    formData.append("start_date", selectedDate.toDateString());
    if (image) {
      formData.append("image", image);
    }
    // In dữ liệu trong formData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      // Send the POST request to update the course
      const response = await axios.post(
        AppUrl.UpdateCourse + props.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Khóa học đã được cập nhật thành công.");
      }else{
        toast.error("Khóa học đã được cập nhật thất bại.");
      }

      // Handle the response as needed
    } catch (error) {
      // Handle errors
      console.log(error);
      toast.error("Error: " + error);
    }
  };

  const handleCancelChoice = () => {
    setShowAlert(false);
  };

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
              className="mt-2"
              onClick={handleUpdateCourse}
            >
              Cập nhật khóa học
            </Button>
            {showAlert && (
              <SweetAlert
                title="Xác nhận"
                showCancel
                cancelBtnText="Hủy"
                onConfirm={handleConfirmChoice}
                onCancel={handleCancelChoice}
              >
                Bạn có chắc chắn muốn cập nhật khóa học không?
              </SweetAlert>
            )}
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default EditCourse;
