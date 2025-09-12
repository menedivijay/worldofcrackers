import { useState} from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Card from "react-bootstrap/Card";
import AddressBook from "../components/sections/AddressBook";
import Login from "./Login";
import CheckOrderStatus from "../components/sections/CheckOrderStatus";
import MyOrders from "../components/sections/MyOrders";
import PersonalInformation from "../components/sections/PersonalInformation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import 'bootstrap/dist/css/bootstrap.min.css';


const navigationItems = [
  { id: "personal", label: "Personal information", hasArrow: true },
  { id: "address", label: "Address Book", hasArrow: true },
  { id: "orders", label: "My orders", hasArrow: true },
  { id: "status", label: "Check Order Status", hasArrow: true },
];



const ProfilePage = () => {
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInformation />;
      case "address":
        return <AddressBook />;
      case "orders":
        return <MyOrders />;
      case "status":
        return <CheckOrderStatus />;
      default:
        return <PersonalInformation onSectionChange={setActiveSection} />;
    }
  };

  const getSectionTitle = () => {
    const item = navigationItems.find((item) => item.id === activeSection);
    return item ? item.label : "Overview";
  };

  return (
    <div className="vh-100 bg-light" style={{maxWidth:"100%"}}>
        <header className="border-bottom bg-white bg-opacity-95 sticky shadow-sm">
            <div className="container px-1 w-100" style={{marginLeft:"15px"}}>
            <div className="d-flex align-items-center" style={{ height: "64px" }}>
                <button
                type="button"
                className="btn btn-link d-flex align-items-center text-decoration-none text-dark p-1"
                onClick={() => navigate(-1)}
                >
                <ArrowLeft size={16} className="me-2" />
                Back to Shopping
                </button>
            </div>
            </div>
        </header>

        <div className="d-flex justify-content-between align-items-center mx-4 py-1" >
            <div>
              <h1 className="h4 fw-semibold mb-1"
              style={{ fontFamily: "'Poppins', sans-serif",color:"purple" }}
            >MY PROFILE</h1>
            {isAuthenticated && user && (
                <p className="text-muted mb-1">Hello, {user.username}</p>
              )}
            </div>
            <button
             
              className="btn m-3 text-white "
              style={{backgroundColor:"purple"}}
              variant="outline-dark"
              onClick={() => isAuthenticated ? logout() : setIsLoginModalOpen(true)}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
          <hr className="m-1"></hr>
        <div className="container py-4">
            <div className="row g-4">
              {/* Sidebar Navigation */}
              <div className="col-lg-3">
                <Card className=" card border">
                  {navigationItems.map((item) => (
                    <div
                      key={item.id}
                      className={`w-100 d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-purple text-start rounded ${
                        activeSection === item.id
                          ? "bg-secondary text-white"
                          : "bg-white text-dark"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <span className="fw-medium">{item.label}</span>
                      {item.hasArrow && <ChevronRight size={16} />}
                    </div>
                  ))}
                </Card>
              </div>

              {/* Main Section */}
              <div className="col-lg-9">
                <Card className="border border-dark p-4">
                  <h2 className="h5 fw-semibold mb-4">{getSectionTitle()}</h2>
                  {renderContent()}
                </Card>
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