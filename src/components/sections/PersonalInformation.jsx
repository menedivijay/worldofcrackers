import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";


const PersonalInformation = () => {
  const { user, isAuthenticated, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      const nameParts = user.username.split(" ");
      setFormData({
        username: nameParts[0] || user.username,
        fullname: nameParts.slice(1).join(" ") || user.fullname,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, isAuthenticated]);

  // 🔹 update function
  const updateUser = (username, updatedData) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u) => u.username === username);

    if (index === -1) {
      return false; // user not found
    }

    users[index] = { ...users[index], ...updatedData };
    localStorage.setItem("users", JSON.stringify(users));

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser && authUser.username === username) {
      localStorage.setItem("authUser", JSON.stringify(users[index]));
      setUser(users[index]); // ✅ update context
    }

    return true;
  };

  // 🔹 Save handler
  const handleSave = () => {
    const success = updateUser(formData.username, {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
    });

    if (success) {
      alert("✅ Profile Updated: Your personal information has been successfully updated.");
      setIsEditing(false);
    } else {
      alert("❌ Update failed: User not found.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">
          Please login to view your personal information.
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header row */}
      <div className="d-flex justify-content-between align-items-center">
        <p className="text-muted mb-0">
          Manage your personal details and contact information.
        </p>
        {!isEditing && (
          <Button  onClick={() => setIsEditing(true)} style={{backgroundColor:"purple", borderColor:"purple"}}>
            Edit
          </Button>
        )}
      </div>

      {/* Basic Information */}
      <Card className="p-4 border">
        <h5 className="fw-semibold text-dark mb-3">Basic Information</h5>
        <Form>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group controlId="firstName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="lastName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="phone">
                <Form.Label>Phone Number (+91)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.phone}
                  className="form-control"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Group>
            </div>
          </div>

          {isEditing && (
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outline-secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} style={{backgroundColor:"purple", borderColor:"purple"}}>
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default PersonalInformation;