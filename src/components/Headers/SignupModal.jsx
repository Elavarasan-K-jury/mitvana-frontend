import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { userRegister } from "@src/api/services/userService";
import toast from "react-hot-toast";

const SignUpModal = ({ signupShow, handleSignUpClose, handleLoginClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await userRegister({ name, email, password, phone });
      if (res.success) {
        toast.success("Registration successful! Please login.");
        handleSignUpClose();
        handleLoginClose();
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={signupShow} onHide={handleSignUpClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-16 text-uppercase">SIGN UP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? "Loading..." : "SIGN UP"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
