import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form } from "react-bootstrap";
import "../App.css"
import { signup, login } from "../config/api";
import { useAuth } from "../hooks/useAuth";

const Login = ({ isOpen, onClose }) => {
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [fullname, setFullname]=useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isSignupMode) {
        const res = await signup(fullname, username, email, phone, password);
        if (res.success) {
          if (res.user) setUser(res.user);
          alert("Your account has been created successfully!");
          onClose();
          resetForm();
        } else {
          alert(res.message || "Signup failed");
        }
      } else {
        const res = await login(email, password);
        if (!res.success) {
          alert(res.message || "Login Failed, Invalid credentials.");
          resetForm();
        } else {
          if (res.user) setUser(res.user);
          onClose();
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPhone("");
    setFullname("");
    setEmail("");
    setIsSignupMode(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {isSignupMode ? "Create Your Account" : "Login to Your Account"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleLogin}>
          {/* Username */}
          {!isSignupMode &&(
            <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          )}

          {/* Phone (only for signup) */}
          {isSignupMode && (
            <Form.Group className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Full Name"
                  className="mb-2"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your personal email"
                  className="mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              
              <Form.Label>Phone Number (+91)</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {/* Password */}
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder={
                isSignupMode ? "Create a new password" : "Enter your password"
              }
              value={password}
              className="mb-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn w-100 text-white"
            style={{backgroundColor:"purple"}}
          >
            {submitting ? "Please wait..." : isSignupMode ? "Create Account" : "Sign In"}
          </button>
        </Form>

        {/* Switch mode */}
        <hr />
        <div className="text-center">
          <p className="text-muted">
            {isSignupMode ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="btn login-link p-0"
              onClick={() => setIsSignupMode(!isSignupMode)}
            >
              {isSignupMode ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;

// ✅ Runtime Prop Validation
Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};