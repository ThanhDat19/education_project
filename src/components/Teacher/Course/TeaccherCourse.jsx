import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import ReactPaginate from "react-paginate";
import AppUrl from "../../../api/AppUrl";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherCourse = ({ user }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: "",
    max: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [courseType, setCourseType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertDelete, setShowAlertDelete] = useState(false);

  useEffect(() => {
    if (user) {
      getCourses(1, user.id);
    }
  }, []);

  useEffect(() => {
    filterCourses();
  }, [allCourses, searchTitle, selectedCategory, selectedPriceRange]);

  const getCourses = async (page, user_id) => {
    // console.log(user_id);
    try {
      const response = await axios.get(AppUrl.teacherGetCourse, {
        params: { page, user_id },
      });
      setCurrentPage(page);
      // console.log(JSON.parse(response.data));
      if (response.data.courses.data) {
        setAllCourses(response.data.courses.data);
        setTotalCourse(response.data.courses.total);
        setTotalPages(response.data.total_pages);
        setCategories(response.data.categories);
        setTypes(response.data.types);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  const filterCourses = () => {
    const filtered = allCourses.filter((value) => {
      const isMatchedTitle =
        searchTitle === "" ||
        value.title.toLowerCase().includes(searchTitle.toLowerCase());

      const isMatchedCategory =
        selectedCategory === "" || value.course_category_id == selectedCategory;

      const isMatchedPriceRange =
        selectedPriceRange.min === "" ||
        selectedPriceRange.max === "" ||
        (value.price >= selectedPriceRange.min &&
          value.price <= selectedPriceRange.max);

      return isMatchedTitle && isMatchedCategory && isMatchedPriceRange;
    });

    setFilteredCourses(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePageClick = (event) => {
    getCourses(event.selected + 1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange({
      ...selectedPriceRange,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    getCourses(1);
  };

  const deleteCourse = async () => {
    setShowAlertDelete(true);
  };

  const handleAddCourseModal = () => {
    setShowAddCourseModal(!showAddCourseModal);
  };

  const handleNewCourseTitleChange = (event) => {
    setNewCourseTitle(event.target.value);
  };

  const handleCancelChoice = () => {
    setShowAlert(false);
    setShowAlertDelete(false);
  };
  const handleConfirmDeleteChoice = async (id) => {
    // console.log(id);
    try {
      await axios.delete(AppUrl.DeleteCourse + "/" + id);
      // Xóa khóa học thành công, cập nhật danh sách khóa học
      setAllCourses(allCourses.filter((course) => course.id !== id));
      toast.success("Xóa khóa học thành công.");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Xóa khóa học thất bại.");
    }
    setShowAlertDelete(false);
  };
  const handleConfirmChoice = async () => {
    setShowAlert(false);

    const formData = new FormData();
    formData.append("newCourseTitle", newCourseTitle);
    formData.append("courseCategoryId", courseCategoryId);
    formData.append("type", courseType);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("user_id", user.id);
    formData.append("start_date", selectedDate.toDateString());

    console.log(formData);
    // In dữ liệu trong formData
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    const response = await axios.post(AppUrl.teacherPostCourse, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);

    if (response.data.success) {
      // Xử lý thành công, thực hiện các hành động sau khi khóa học được tạo
      // console.log(response.data.message);
      // Reset form fields
      setNewCourseTitle("");
      setCourseCategoryId("");
      setDescription("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      // Đóng modal
      handleAddCourseModal();
      getCourses(1, user.id);
      toast.success("Khóa học đã được tạo thành công.");
    } else {
      // Xử lý không thành công, hiển thị thông báo lỗi
      // console.log("Error:", response.data.message);
      toast.error("Đã xảy ra lỗi khi tạo khóa học.");
    }
  };

  const handleAddCourse = async () => {
    setShowAlert(true);
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

  const renderCourses = () => {
    if (loading) {
      return <p>Đang tải...</p>;
    }

    if (filteredCourses.length === 0) {
      return <p>Không tìm thấy khóa học.</p>;
    }

    return filteredCourses.map((item) => (
      <Col md={4} key={item.id}>
        <Card border="light" style={{ margin: "4px" }}>
          <Card.Img
            variant="top"
            src={"http://127.0.0.1:8000" + item.course_image}
            alt={item.title}
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            {/* <Card.Text>{parse(item.description)}</Card.Text> */}
            <Card.Text className="courseViewMore">${item.price}</Card.Text>
            <Link
              to={"/course-details/" + item.id}
              className="float-left courseViewMore"
            >
              Xem chi tiết
            </Link>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={deleteCourse}
                  style={{
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                  className="w-50"
                >
                  Xóa
                </Button>
                {showAlertDelete && (
                  <SweetAlert
                    title="Xác nhận"
                    showCancel
                    cancelBtnText="Hủy"
                    confirmBtnText="Xóa"
                    confirmBtnBsStyle="danger"
                    onConfirm={() => handleConfirmDeleteChoice(item.id)}
                    onCancel={handleCancelChoice}
                  >
                    Bạn có chắc chắn muốn xóa khóa học không?
                  </SweetAlert>
                )}

                <Button
                  variant="outline-primary"
                  size="sm"
                  as={Link}
                  to={"/edit-course/" + item.id}
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                  className="w-50"
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  as={Link}
                  to={"/manage-lesson-of-course/" + item.id}
                  style={{ borderRadius: "10px", fontSize: "16px" }}
                  className="w-100 mt-1"
                >
                  Quản lý bài học
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">QUẢN LÝ KHÓA HỌC</h1>
        <div className="bottom"></div>
        <Row>
          <Col md={3}>
            <div style={{ marginBottom: "30px" }}>
              <input
                style={{
                  width: "100%",
                  height: "30px",
                  marginBottom: filteredCourses.length === 0 ? "0" : "10px",
                }}
                type="text"
                placeholder="Tìm kiếm..."
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <select
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Tất cả</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                style={{ width: "100%", height: "30px" }}
                type="number"
                placeholder="Giá thấp nhất"
                name="min"
                value={selectedPriceRange.min}
                onChange={handlePriceRangeChange}
              />
              <input
                style={{ width: "100%", height: "30px", marginTop: "10px" }}
                type="number"
                placeholder="Giá cao nhất"
                name="max"
                value={selectedPriceRange.max}
                onChange={handlePriceRangeChange}
              />
            </div>
            <Button variant="primary" onClick={handleAddCourseModal}>
              Thêm khóa học
            </Button>
            <Modal
              show={showAddCourseModal}
              onHide={handleAddCourseModal}
              size="lg"
              style={{ maxWidth: "2000px", width: "100%" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Thêm khóa học</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                  <Form.Label>Lĩnh vực</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                  >
                    <option value="">Chọn lĩnh vực</option>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleAddCourseModal}>
                  Đóng
                </Button>
                <Button variant="primary" onClick={handleAddCourse}>
                  Tạo khóa học
                </Button>

                {showAlert && (
                  <SweetAlert
                    title="Xác nhận"
                    showCancel
                    cancelBtnText="Hủy"
                    onConfirm={handleConfirmChoice}
                    onCancel={handleCancelChoice}
                  >
                    Bạn có chắc chắn muốn tạo khóa học không?
                  </SweetAlert>
                )}
              </Modal.Footer>
            </Modal>
          </Col>
          <Col md={9}>
            <Row>{renderCourses()}</Row>
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
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default TeacherCourse;
