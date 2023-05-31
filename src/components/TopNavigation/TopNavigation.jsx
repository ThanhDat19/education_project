import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import axios from 'axios';

const TopNavigation = () => {
  const [navBarTitle, setNavBarTitle] = useState("navTitle");
  const [navVariant, setNavVariant] = useState("dark");
  const [navBarBack, setNavBarBack] = useState("navBackground");
  const [navBarItem, setNavBarItem] = useState("navItem");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
    // Kiểm tra trong local storage nếu có token
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    // console.log(token);
    if (token) {
      setIsLoggedIn(true);

      setUserName(JSON.parse(user).name); // Thay thế bằng thông tin người dùng thực tế
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây
    // Ví dụ:
    // Xóa token trong localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Sau đó cập nhật trạng thái đăng nhập
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
                  activeClassName="menu_active"
                  className={navBarItem}
                  to="/"
                >
                  TRANG CHỦ
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeClassName="menu_active"
                  className={navBarItem}
                  to="/about"
                >
                  THÔNG TIN
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeClassName="menu_active"
                  className={navBarItem}
                  to="/course"
                >
                  KHÓA HỌC
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink
                  activeClassName="menu_active"
                  className={navBarItem}
                  to="/contact"
                >
                  LIÊN HỆ
                </NavLink>
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link>
                    <NavLink
                      activeClassName="menu_active"
                      className={navBarItem}
                      to="/"
                      onClick={handleLogout}
                    >
                      ĐĂNG XUẤT
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <span className={navBarItem}>{userName}</span>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <NavLink
                    activeClassName="menu_active"
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