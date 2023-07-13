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
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RatingStar from "../../RatingStar/RatingStar";
import { FaStar } from "react-icons/fa";

const StudentCourse = ({ user }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: "",
    max: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showReViewModal, setShowReViewModal] = useState(false);
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

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
      const response = await axios.get(AppUrl.studentGetCourses, {
        params: { page, user_id },
      });
      setCurrentPage(page);
      // console.log(JSON.parse(response.data));
      if (response.data.courses.data) {
        console.log(response.data);
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

  const handleCloseReViewCourse = async () => {
    setShowReViewModal(false);
    setTimeout(() => {
      getCourses(1, user.id);
      filterCourses();
    }, 1000);
  };
  const handleReViewModal = (item) => {
    console.log(item);
    setSelectedCourse(item.course_id);
    setShowReViewModal(true);
  };
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
            <div style={styles.stars} className="mt-2">
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    color={
                      item.averageRating > index ? colors.orange : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
            <Card.Title className="mt-2">{item.title}</Card.Title>
            {/* <Card.Text>{
              parse(item.description)}</Card.Text> */}
            <Card.Text className="courseViewMore">${item.price}</Card.Text>
            <Link
              to={"/course-details/" + item.course_id}
              className="float-left courseViewMore"
            >
              Xem chi tiết
            </Link>
            <div className="progressBar mt-2">
              {item.lessons && item.status_course ? (
                <ProgressBar
                  now={(item.status_course / item.lessons) * 100}
                  label={`${Math.ceil(
                    (item.status_course / item.lessons) * 100
                  )}% hoàn thành`}
                />
              ) : (
                "Chưa học"
              )}
            </div>
          </Card.Body>
          <Card.Footer>
            {item.rating === null ? (
              <Button onClick={() => handleReViewModal(item)}>Đánh Giá</Button>
            ) : (
              ""
            )}
          </Card.Footer>
        </Card>
      </Col>
    ));
  };

  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">KHÓA HỌC CỦA TÔI</h1>
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
      <Modal
        show={showReViewModal}
        onHide={handleCloseReViewCourse}
        size="lg"
        style={{ maxWidth: "2000px", width: "100%" }}
      >
        <Modal.Body>
          <RatingStar
            user={user}
            course={selectedCourse}
            handleCloseReViewCourse={handleCloseReViewCourse}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReViewCourse}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
export default StudentCourse;
