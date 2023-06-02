import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import ReactPaginate from "react-paginate";
import AppUrl from "../../api/AppUrl";

const Courses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: "",
    max: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getCourses(1);
    }, 500);
  }, []);

  useEffect(() => {
    filterCourses();
  }, [allCourses, searchTitle, selectedCategory, selectedPriceRange]);

  const getCourses = async (page) => {
    try {
      setCurrentPage(page);
      const response = await axios.get(AppUrl.CourseAll, { params: { page } });
      if (response.data.courses.data) {
        setAllCourses(response.data.courses.data);
        setLoading(false);
        setTotalCourse(response.data.courses.total);
        setTotalPages(response.data.total_pages);
        console.log(response.data);
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

  const renderCourses = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (filteredCourses.length === 0) {
      return <p>No matching courses found.</p>;
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
            <Card.Text>{parse(item.description)}</Card.Text>
            <Card.Text>$ {item.price}</Card.Text>
            <Link
              to={"/course-details/" + item.id}
              className="float-left courseViewMore"
            >
              Xem chi tiết
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Fragment>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="serviceMainTitle text-center">MY COURSES</h1>
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
                placeholder="Search..."
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <select
                style={{ width: "100%", height: "30px", marginBottom: "10px" }}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                <option value="1">Web Development</option>
                <option value="2">Mobile Development</option>
                <option value="3">PHP</option>
              </select>
              <input
                style={{ width: "100%", height: "30px" }}
                type="number"
                placeholder="Min Price"
                name="min"
                value={selectedPriceRange.min}
                onChange={handlePriceRangeChange}
              />
              <input
                style={{ width: "100%", height: "30px", marginTop: "10px" }}
                type="number"
                placeholder="Max Price"
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

export default Courses;
