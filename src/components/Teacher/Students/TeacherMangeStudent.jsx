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
  Table,
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
import DataTable from "react-data-table-component";

const TeacherMangeStudent = ({ user }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (user) {
      getCourses(1, user.id);
    }
  }, []);

  useEffect(() => {
    filterCourses();
  }, [allCourses, searchTitle, selectedCategory, students, selectedCourse]);

  const getCourses = async (page, user_id) => {
    // console.log(user_id);
    try {
      const response = await axios.get(AppUrl.getListStudent, {
        params: { page, user_id },
      });
      setCurrentPage(page);
      // console.log(JSON.parse(response.data));
      if (response.data.courses.data) {
        setAllCourses(response.data.courses.data);
        setCategories(response.data.categories);
        setTypes(response.data.types);
        setStudents(response.data.students.data);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  const filterCourses = () => {
    const filtered = students.filter((student) => {
      const isMatchedTitle =
        searchTitle === "" ||
        student.name.toLowerCase().includes(searchTitle.toLowerCase());

      const isMatchedCategory =
        selectedCategory === "" ||
        student.course_category_id == selectedCategory;

      // console.log(student.course_id, selectedCourse);
      const isMatchedCourse =
        selectedCourse === "" || student.course_id == selectedCourse;

      return isMatchedTitle && isMatchedCategory && isMatchedCourse;
    });

    setFilteredCourses(filtered);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSearch = () => {};

  const StudentTable = () => {
    if (loading) {
      return <p>Đang tải...</p>;
    }
    console.log("students: ", students);
    const columns = [
      {
        name: "Họ tên",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Khóa học",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Thanh Toán",
        selector: (row) => row.payment_status,
        sortable: true,
      },
      {
        name: "Tiến độ",
        selector: (row) =>
          ((row.status_course / row.lessons) * 100 !== Infinity) && (row.lessons)
            ? (row.status_course / row.lessons) * 100 + "%"
            : "Chưa hoàn thành",
        sortable: true,
      },
      //   {
      //     cell: (row) => <CustomMaterialMenu size="small" row={row} />,
      //     allowOverflow: true,
      //     button: true,
      //     width: "56px",
      //   },
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
        title="Danh Sách Học Viên"
        columns={columns}
        data={filteredCourses}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        pagination
      />
    );
  };
  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">QUẢN LÝ HỌC VIÊN</h1>
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
              <select
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
                value={selectedCourse}
                onChange={handleCourseChange}
              >
                <option value="">Tất cả</option>
                {allCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col md={9}>
            {/* <Row>{renderCourses()}</Row> */}
            <Row>{StudentTable()}</Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default TeacherMangeStudent;
