import { Fragment } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductFilter from "./CourseFilter/CourseFilter";
const AllCourses = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      options: ["option1", "option2"],
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      options: ["option2", "option3"],
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      options: ["option1", "option3"],
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description 4",
      options: ["option2"],
    },
  ];

  const filterOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const handleFilterChange = (selectedOptions) => {
    if (selectedOptions.length === 0) {
      setFilteredProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter((product) =>
        product.options.some((option) => selectedOptions.includes(option))
      );
      setFilteredProducts(filtered);
    }
  };

  const ProductList = ({ products }) => {
    return (
      <div>
        <h2>Product List</h2>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <Fragment>
      <Container className="text-center">
        <h1 className="serviceMainTitle">MY COURSES</h1>
        <div className="bottom"></div>
        <Row>
          <Col lg={3} md={12} sm={0}>
            <Row>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button>Search</Button>
              </Form>
              <div>
                <ProductFilter
                  options={filterOptions}
                  onFilterChange={handleFilterChange}
                />
                
              </div>
            </Row>
            <hr />
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Row>
              {/* <Col lg={6} md={6} sm={12} className="p-2">
                <img
                  className="courseImg"
                  src="https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113592.jpg?w=1060&t=st=1676537180~exp=1676537780~hmac=ff30767983b241621e623765dab5281d4155529a3bd48adc816467a4554fdd8e"
                  alt="Course"
                />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <h5 className="text-justify serviceName">Laravel 8</h5>
                <p className="text-justify serviceDescription">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link
                  to="/course-details"
                  className="float-left courseViewMore"
                >
                  View Detail
                </Link>
              </Col> */}
              <ProductList products={filteredProducts} />
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllCourses;
