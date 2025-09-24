import { useState} from "react";
import PropTypes from "prop-types";
import { LogOut } from "lucide-react";
import Login from "./Login";
import MyOrders from "../components/sections/MyOrders";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressBook from "../components/sections/AddressBook";
import PersonalInformation from "../components/sections/PersonalInformation";


const ProfilePage = () => {
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "personal", label: "Personal" },
    { key: "address", label: "Address" },
    { key: "orders", label: "Orders" },
    { key: "status", label: "Status" },
  ];

  const renderSection = () => {
    if (!isAuthenticated) {
      return (
        <div className="text-center py-5">
          <p className="mb-3">Please login to view your profile.</p>
          <button className="btn btn-dark" onClick={() => setIsLoginModalOpen(true)}>Login</button>
        </div>
      );
    }
    switch (activeSection) {
      case "overview":
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Account Overview</h5>
              <p className="mb-1"><strong>Username:</strong> {user?.username || "-"}</p>
              <p className="mb-1"><strong>Email:</strong> {user?.email || "-"}</p>
            </div>
          </div>
        );
      case "personal":
        return <PersonalInformation />;
      case "address":
        return <AddressBook />;
      case "orders":
        return <MyOrders />;
      case "status":
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Account Status</h5>
              <p>Your account is {isAuthenticated ? "active" : "inactive"}.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sticky-top h-100 bg-light" style={{maxWidth:"100%"}}>
        <header className="sticky-top shadow-sm" style={{width: "100%",backgroundImage: "url('/images/')", backgroundSize: "cover", backgroundPosition: "center", backgroundColor:"black"}}>
            <div className="container-fluid px-3">

              {/* Navbar Row */}
              <div className="d-flex align-items-center justify-content-between" style={{ height: '60px' }}>
                

                {/* Desktop Logo */}
                <div className="d-none d-md-flex align-items-center gap-2 cursor-pointer">
                  <div className="fw-bold text-white fs-4 cursor-pointer" 
                  onClick={()=>navigate("/")}>✨ World of Crackers</div>
                </div>
                 
                 {isAuthenticated && user && (
                <h4 className="text-white mb-1">Hello, {user.username}</h4>
              )}

                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-1 gap-md-3">
                  {isAuthenticated && (
                    <button type="button" className="btn text-white d-flex align-items-center  px-md-1 position-relative"
                      onClick={() => logout()}>
                        <LogOut className="bi bi-cart me-md-2 fixed"/>
                        <span className="d-none d-md-inline">Logout</span>
                      </button>
                  )}
                </div>
              </div>
            </div>
          </header>

        <div className="d-flex sticky-top justify-content-between align-items-center px-4 py-0 " style={{top:"60px", backgroundColor:"white", zIndex:1040 }}>
            <div>
              <h1 className="h4 fw-semibold mb-1"
              style={{ fontFamily: "'Poppins', sans-serif",color:"black" }}
            >MY ACCOUNT</h1>
            </div>
            <button
             
              className="btn m-3 text-white"
              style={{backgroundColor:"Black"}}
              variant="outline-dark"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <hr className="m-1"></hr>
        <div className="container py-4">
            <div className="row g-4">
              {/* Sidebar */}
              <div className="col-lg-3">
                <div className="list-group">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`list-group-item list-group-item-action ${activeSection === item.key ? 'active' : ''}`}
                      onClick={() => setActiveSection(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Main Section */}
              <div className="col-lg-9 align-itmes-center mx-auto">
                {renderSection()}
              </div>
            </div>
          </div>

          <Login
           isOpen={isLoginModalOpen}
           onClose={() => setIsLoginModalOpen(false)}
         />
        </div>

  );
};

export default ProfilePage;

ProfilePage.propTypes = {
  activeSection: PropTypes.oneOf([
    "overview",
    "personal",
    "address",
    "orders",
    "status",
  ]),
  isLoginModalOpen: PropTypes.bool,
};