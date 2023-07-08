import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const TopNavigation = () => {
  const [navBarTitle, setNavBarTitle] = useState("navTitle");
  const [navVariant, setNavVariant] = useState("dark");
  const [navBarBack, setNavBarBack] = useState("navBackground");
  const [navBarItem, setNavBarItem] = useState("navItem");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onScroll = () => {
    if (window.scrollY > 100) {
      setNavBarTitle("navTitleScroll");
      setNavBarBack("navBackgroundScroll");
      setNavBarItem("navItemScroll");
      setNavVariant("light");
    } else if (window.scrollY < 100) {
      setNavBarTitle("navTitle");
      setNavBarBack("navBackground");
      setNavBarItem("navItem");
      setNavVariant("dark");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  const checkLoggedIn = async () => {
    if (user) {
      setIsLoggedIn(true);
      // console.log(user);
      setUserName(user.name);
    } else {
      setIsLoggedIn(false);
      setUserName("...");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <React.Fragment>
      <Navbar
        className={navBarBack}
        collapseOnSelect
        fixed="top"
        expand="lg"
        variant={navVariant}
      >
        <Container>
          <Navbar.Brand>
            <NavLink className={navBarItem} to="/">
              EDU WEBSITE
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>
                <NavLink
                  activeclassname="menu_active"
                  className={navBarItem}
                  to="/"
                >
                  TRANG CHỦ
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeclassname="menu_active"
                  className={navBarItem}
                  to="/about"
                >
                  THÔNG TIN
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeclassname="menu_active"
                  className={navBarItem}
                  to="/course"
                >
                  KHÓA HỌC
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeclassname="menu_active"
                  className={navBarItem}
                  to="/contact"
                >
                  LIÊN HỆ
                </NavLink>
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  {/* Teacher */}
                  {user.roles === "teacher" ? (
                    <NavDropdown
                      className={navBarItem}
                      title="QUẢN LÝ"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        className={navBarItem}
                        as={Link}
                        to="/course-management"
                      >
                        Khóa học của tôi
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={navBarItem}
                        as={Link}
                        to="/tests-management"
                      >
                        Bài kiểm tra
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={navBarItem}
                        as={Link}
                        to="/question-management"
                      >
                        Câu hỏi và Lựa chọn
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className={navBarItem}
                        as={Link}
                        to="/user-management"
                      >
                        Học viên
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        title={userName}
                        className={navBarItem}
                      ></NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    ""
                  )}

                  {/* Student */}
                  {user.roles === "student" ? (
                    <Nav.Link>
                      <NavLink
                        activeclassname="menu_active"
                        className={navBarItem}
                        to="/student-courses"
                      >
                        KHÓA HỌC CỦA TÔI
                      </NavLink>
                    </Nav.Link>
                  ) : (
                    ""
                  )}
                  <Nav.Link>
                    <NavLink
                      activeclassname="menu_active"
                      className={navBarItem}
                      to="/"
                      onClick={handleLogout}
                    >
                      ĐĂNG XUẤT
                    </NavLink>
                    <NavLink
                      activeclassname="menu_active"
                      className={navBarItem}
                      to="/update-information"
                    >
                      <FontAwesomeIcon
                        className="navBarItem"
                        style={{ marginLeft: "8px" , fontSize: "14px"}}
                        icon={faUserAlt}
                      />
                    </NavLink>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <NavLink
                    activeclassname="menu_active"
                    className={navBarItem}
                    to="/login"
                  >
                    ĐĂNG NHẬP
                  </NavLink>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default TopNavigation;
