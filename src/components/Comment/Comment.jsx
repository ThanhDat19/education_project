import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Image, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AppUrl from "../../api/AppUrl";
import profanityList from "./profanityList";
import BadWordsFilter from "bad-words";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = ({ user, lesson }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");
  const filter = new BadWordsFilter();
  profanityList.forEach((word) => {
    filter.addWords(word);
  });

  useEffect(() => {
    // Fetch comments from Laravel backend API
    // console.log(lesson);
    axios
      .get(AppUrl.getComments + user.id, {
        params: { lesson },
      })
      .then((response) => {
        setComments(response.data.comments);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [lesson]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (comment.trim() !== "") {
      const newComment = {
        author: user.id,
        content: comment,
        lesson: lesson,
        impolite: 0,
      };

      if (filter.isProfane(comment)) {
        newComment.impolite = 1;
        axios
          .post(AppUrl.postComments + user.id, newComment)
          .then((response) => {
            setComment("");
          })
          .catch((error) => {
            console.error(error);
          });
        toast.error("Nội dung không phù hợp");
        console.log("Nội dung không phù hợp");
        return;
      }
      axios
        .post(AppUrl.postComments + user.id, newComment)
        .then((response) => {
          // console.log(response.data);
          setComments([...comments, response.data.comments]);
          setComment("");
        })
        .catch((error) => {
          console.error(error);
        });

      toast.success("Bình luận thành công");
    }
  };

  const handleDelete = (commentId) => {
    // Delete comment using the Laravel backend API
    axios
      .delete(AppUrl.deleteComments + user.id + "/" + commentId)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditingComment(commentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingComment("");
  };

  const handleSaveEdit = (commentId) => {
    if (filter.isProfane(editingComment)) {
      toast.error("Nội dung không phù hợp");
      console.log("Nội dung không phù hợp");
      return;
    }
    const updatedComment = {
      content: editingComment,
    };

    // Update comment using the Laravel backend API
    axios
      .put(AppUrl.putComments + user.id + "/" + commentId, updatedComment)
      .then((response) => {
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              comment_body: response.data.comment.comment_body,
            };
          }
          return comment;
        });

        setComments(updatedComments);
        setEditingCommentId(null);
        setEditingComment("");
        toast.success("Sửa bình luận thành công");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentTimestamp = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTimestamp) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Vừa mới";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} ngày trước`;
    }
  };

  const commentView = comments
    ? comments.map((comment) => (
        <ListGroup.Item key={comment.id}>
          <div className="d-flex align-items-start">
            <div>
              <div className="mb-2">
                <strong>{comment.user.name}</strong>{" "}
                {formatTimestamp(comment.created_at)}
              </div>
              {editingCommentId === comment.id ? (
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    value={editingComment}
                    onChange={(event) => setEditingComment(event.target.value)}
                  />
                  <div className="d-flex justify-content-end">
                    <Button
                      className="mx-1"
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Hủy
                    </Button>
                    <Button
                      className="mx-1"
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      Lưu
                    </Button>
                  </div>
                </Form.Group>
              ) : (
                <>
                  <div>{comment.comment_body}</div>
                </>
              )}
            </div>
          </div>
          {user.id === comment.user.id || user.roles === "teacher" ? (
            <div className="comment-actions mt-2">
              <Button
                className="mx-1"
                variant="outline-success"
                size="sm"
                onClick={() => handleEdit(comment.id, comment.content)}
              >
                <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(comment.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Xóa
              </Button>
            </div>
          ) : (
            ""
          )}
        </ListGroup.Item>
      ))
    : "Chưa có bình luận nào";

  return (
    <div>
      <h3 className="mt-2">Bình Luận</h3>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Viết bình luận..."
              value={comment}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Form.Group>
        <Button variant="primary" className="mt-2" type="submit">
          Xác nhận
        </Button>
      </Form>
      <ListGroup className="overflow-auto" style={{ height: "400px" }}>
        {commentView}
      </ListGroup>
      <ToastContainer />
    </div>
  );
};

export default Comment;
