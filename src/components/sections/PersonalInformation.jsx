import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";


const PersonalInformation = () => {
  const { user, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
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
    <div className="sticky-top vh-100 bg-light" style={{maxWidth:"100%"}}>
        <header className="sticky-top shadow-sm" style={{width: "100%",backgroundImage: "url('/images/')", backgroundSize: "cover", backgroundPosition: "center", backgroundColor:"black"}}>
            <div className="container-fluid px-3">

              {/* Navbar Row */}
              <div className="d-flex align-items-center justify-content-between" style={{ height: '60px' }}>
                

                {/* Desktop Logo */}
                <div className="d-none d-md-flex align-items-center gap-2 cursor-pointer">
                  <div className="fw-bold text-white fs-4 cursor-pointer" 
                  onClick={()=>navigate("/")}>✨ DiwaliMart</div>
                </div>
                 
                 {isAuthenticated && user && (
                <h4 className="text-white mb-1">Hello, {user.username}</h4>
              )}

                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-1 gap-md-3">
                  <button type="button" className="btn text-white d-flex align-items-center  px-md-1 position-relative"
                    onClick={() => navigate("/")}>
                      <LogOut className="bi bi-cart me-md-2 fixed"/>
                      <span className="d-none d-md-inline">Back</span>
                    </button>
                </div>
              </div>
            </div>
          </header>
      <div className="d-flex sticky-top justify-content-between align-items-center px-4 my-2 py-0 " style={{top:"60px", zIndex:1040 }}>
            <div>
              <h1 className="h4 fw-semibold mb-1"
              style={{ fontFamily: "'Poppins', sans-serif",color:"black" }}
            >ACCOUNT SETTINGS</h1>
            </div>
        {!isEditing && (
          <Button  onClick={() => setIsEditing(true)} style={{backgroundColor:"black", borderColor:"black"}}>
            Edit
          </Button>
        )}
      
      </div>
      <hr className="m-1"></hr>
      {/* Basic Information */}
      <Card className=" container p-4 border mt-2 col-md-6" style={{backgroundColor:"white"}}>
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
              <Button onClick={handleSave} style={{backgroundColor:"green", borderColor:"green"}}>
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