import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../pages/Login';
import { useState } from 'react';
import PropTypes from "prop-types";
import useCart from '../contexts/CartContext';
import { Filter, ShoppingCart } from 'lucide-react';
import { Search, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import '../App.css'

function Headers({ onFilterClick }){

  const { isAuthenticated, user, logout } = useAuth();
  const { state } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();


    return (
      
          <header className="sticky-top shadow-sm" style={{width: "100%",backgroundImage: "url('/images/')", backgroundSize: "cover", backgroundPosition: "center", backgroundColor:"black"}}>
            <div className="container-fluid px-3">

              {/* Navbar Row */}
              <div className="d-flex align-items-center justify-content-between" style={{ height: '60px' }}>
                
                {/* Mobile Layout (Filter + Logo) */}
                <div className="d-flex align-items-center gap-2 d-md-none">
                  <button 
                    type="button" 
                    className="btn btn-link text-white p-2"
                    onClick={onFilterClick}
                  >
                    <Filter className="bi bi-funnel fs-5"/>
                  </button>
                  <div className="fw-bold text-white fs-5">✨ World of Crackers</div>
                </div>

                {/* Desktop Logo */}
                <div className="d-none d-md-flex align-items-center gap-2">
                  <div className="fw-bold text-white fs-4">✨ World of Crackers</div>
                </div>

                {/* Search Bar (Desktop Only) */}
                <div className="d-none d-md-flex flex-grow-1 mx-4" style={{ maxWidth: '500px' }}>
                  <div className="position-relative w-100">
                    <Search className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted" size={40}/>
                    <input 
                      type="text" 
                      className="form-control ps-5 p-2" 
                      placeholder="Search for Crackers, Fireworks and More"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-1 gap-md-3">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as={Button}
                      size="sm"
                      className="d-flex align-items-center gap-2 text-light bg-transparent border-0"
                    >
                      <User className="h-4 w-4" />
                      <span className='fs-6'>{isAuthenticated ? user?.username : "Profile"}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {isAuthenticated ? (
                        <>
                          <Dropdown.Item onClick={() => navigate("/profile")}>
                            My Orders
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate("/personalinfo")}>Account Settings</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={()=> logout()}>
                             Logout
                          </Dropdown.Item>
                        </>
                      ) : (
                        <Dropdown.Item onClick={() => setIsLoginModalOpen(true)}>
                          Login / Sign Up
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <button type="button" className="btn text-white d-flex align-items-center  px-md-1 position-relative"
                    onClick={() => navigate("/cart")}
                  >
                      <ShoppingCart className="bi bi-cart me-md-2"/>
                      <span className="d-none d-md-inline">Cart</span>

                      {state.totalItems > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle 
                                    bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold mt-1"
                          style={{ width: "1.25rem", height: "1.25rem", fontSize: "0.75rem" }}
                        >
                          {state.totalItems}
                        </span>
                      )}
                    </button>
                </div>
              </div>

              {/* Mobile Search Bar */}
              <div className="d-md-none pb-3">
                <div className="position-relative">
                  <Search className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-dark fs-1"/>
                  <input 
                    type="text" 
                    className="form-control ps-5" 
                    placeholder="Search products..." 
                    style={{ height: '40px' }} 
                  />
                </div>
              </div>
            </div>
            <Login
                       isOpen={isLoginModalOpen}
                       onClose={() => setIsLoginModalOpen(false)}
            />
          </header>
            

);
}

Headers.propTypes = {
  onFilterClick: PropTypes.func,
};

export default Headers;