import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { requestPasswordRecover } from "@src/api/services/userService";
import toast from "react-hot-toast";

const RecoverPassword = ({ signupShow, handleSignUpClose, handleLoginClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await requestPasswordRecover({ email });
      if (res.success) {
        toast.success("Password reset link sent to your email");
        handleSignUpClose();
      } else {
        toast.error(res.message || "Failed to send reset link");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={signupShow} onHide={handleSignUpClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-16 text-uppercase">RECOVER PASSWORD</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? "Loading..." : "SEND RESET LINK"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecoverPassword;
