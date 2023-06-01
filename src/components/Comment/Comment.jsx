import React, { useState, useEffect } from "react";
import { Form, Button, ListGroup, Image, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState("");

  useEffect(() => {
    // Thêm các bình luận ảo vào mảng comments
    const dummyComments = [
      {
        id: 1,
        author: "John Doe",
        content: "This is a great post!",
        timestamp: "2023-05-30T10:00:00Z",
        avatar: "https://example.com/avatar1.jpg",
      },
      {
        id: 2,
        author: "Jane Smith",
        content: "Thanks for sharing.",
        timestamp: "2023-05-30T11:00:00Z",
        avatar: "https://example.com/avatar2.jpg",
      },
      {
        id: 3,
        author: "David Johnson",
        content: "I found this very helpful.",
        timestamp: "2023-05-30T12:00:00Z",
        avatar: "https://example.com/avatar3.jpg",
      },
    ];
    setComments(dummyComments);
  }, []);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (comment.trim() !== "") {
      const newComment = {
        id: Date.now(),
        author: "Anonymous",
        content: comment,
        timestamp: new Date().toISOString(),
        avatar: "https://example.com/avatar-anonymous.jpg",
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const handleReply = (commentId) => {
    // Xử lý trả lời bình luận
    console.log(`Reply to comment ${commentId}`);
  };

  const handleDelete = (commentId) => {
    // Xử lý xóa bình luận
    setComments(comments.filter((comment) => comment.id !== commentId));
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
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content: editingComment,
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setEditingCommentId(null);
    setEditingComment("");
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentTimestamp = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTimestamp) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div className="d-flex align-items-start">
              <Image
                src={comment.avatar}
                roundedCircle
                className="mr-3"
                width={50}
                height={50}
                alt="Avatar"
              />
              <div>
                <div>
                  <strong>{comment.author}</strong>
                </div>
                {editingCommentId === comment.id ? (
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      value={editingComment}
                      onChange={(event) =>
                        setEditingComment(event.target.value)
                      }
                    />
                    <div className="d-flex justify-content-end mt-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSaveEdit(comment.id)}
                        className="ml-2"
                      >
                        Save
                      </Button>
                    </div>
                  </Form.Group>
                ) : (
                  <>
                    <div>{comment.content}</div>
                    <div className="comment-timestamp">
                      {formatTimestamp(comment.timestamp)}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="comment-actions mt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleReply(comment.id)}
              >
                <FontAwesomeIcon icon={faReply} /> Reply
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleEdit(comment.id, comment.content)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(comment.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <InputGroup>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write a comment..."
              value={comment}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Comment;
