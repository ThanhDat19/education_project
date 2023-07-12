import {
  faFacebook,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, createRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import face from "../../asset/image/default-avatar.png";
import AppUrl from "../../api/AppUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/authActions";
import Cookies from "js-cookie";

const UpdateInformation = ({ user }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avarta, setAvarta] = useState(null);
  const [avartaPreview, setAvartaPreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setAvarta(user.avarta);

      if (user.avarta) {
        const avartaPreviewURL = "http://127.0.0.1:8000" + user.avarta;
        setAvartaPreview(avartaPreviewURL);
      }
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (avartaPreview) {
        URL.revokeObjectURL(avartaPreview);
      }
    };
  }, [avartaPreview]);

  const handleSubmit = async () => {
    // Prepare the form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avarta) {
      formData.append("avarta", avarta);
    }

    try {
      // Send the POST request to update the course
      const response = await axios.post(
        AppUrl.UpdateInformation + user.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        Cookies.remove("user");
        dispatch(getUser(response.data.user));
        Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
        toast.success("Khóa học đã được cập nhật thành công.");
      } else {
        toast.error("Khóa học đã được cập nhật thất bại.");
      }

      // Handle the response as needed
    } catch (error) {
      // Handle errors
      console.log(error);
      toast.error("Error: " + error);
    }
  };

  const handleNewName = (event) => {
    setName(event.target.value);
  };

  const handleNewEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setAvarta(selectedImage);
    const previewURL = URL.createObjectURL(selectedImage);
    setAvartaPreview(previewURL);
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row className="text-center">
        <h1 className="reviewMainTitle">CẬP NHẬT THÔNG TIN</h1>
        <div className="reviewbottom"></div>
      </Row>
      <Row>
        <Col lg={7} md={6} sm={12} className="text-center border-dark">
          {}
          {avartaPreview ? (
            <img
              src={avartaPreview}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "300px",
                objectFit: "cover",
                minWidth: "300px",
                maxHeight: "300px",
                minHeight: "300px",
                borderRadius:"100%",
              }}
            />
          ) : (
            <img
              src={face}
              alt="Preview"
              style={{
                marginTop: "10px",
                maxWidth: "300px",
                objectFit: "cover",
                minWidth: "300px",
                maxHeight: "300px",
                minHeight: "300px",
                borderRadius:"100%"
              }}
            />
          )}
        </Col>

        <Col lg={4} md={6} sm={12} className="mt-5">
          <Form.Group>
            <Form.Control
              type="file"
              name="image_validate"
              id="upload"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Họ và Tên</Form.Label>
            <Form.Control
              className="p-3"
              type="text"
              value={name}
              onChange={handleNewName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="p-3"
              type="email"
              value={email}
              onChange={handleNewEmail}
            />
          </Form.Group>

          <div className="text-center text-md-start mt-4 pt-2">
            <Button className="mb-0 px-5" size="lg" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default UpdateInformation;
