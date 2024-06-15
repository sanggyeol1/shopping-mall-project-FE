import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../style/commentSection.style.css'

const CommentSection = ({ comments, addComment, deleteComment, currentUserId }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="comment-section mt-4">
      <h5>Comments</h5>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul className="list-unstyled">
        {comments.map((comment, index) => (
          <li key={index} className="mb-2 comment-item">
            <div>
              <strong>{comment.email}</strong>: {comment.content}
            </div>
            {comment.userId === currentUserId && (
              <Button variant="danger" size="sm" onClick={() => deleteComment(comment._id)} className="delete-button">
                X
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newComment">
          <Form.Label>Add a comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CommentSection;
