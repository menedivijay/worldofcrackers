import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";
import useCart from '../contexts/CartContext';
import { Filter, ShoppingCart } from 'lucide-react';
import { Search, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import '../App.css'

function Headers({ onFilterClick }){
  const { state } = useCart();
  const navigate = useNavigate();

    return (
          <header className="sticky-top shadow-sm" style={{width: "100%",backgroundImage: "url('/images/header1.gif')", backgroundSize: "cover", backgroundPosition: "center",}}>
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
                  <div className="fw-bold text-white fs-5">✨ DiwaliMart</div>
                </div>

                {/* Desktop Logo */}
                <div className="d-none d-md-flex align-items-center gap-2">
                  <div className="fw-bold text-white fs-4">✨ DiwaliMart</div>
                </div>

                {/* Search Bar (Desktop Only) */}
                <div className="d-none d-md-flex flex-grow-1 mx-4" style={{ maxWidth: '500px' }}>
                  <div className="position-relative w-100">
                    <Search className="bi bi-search position-absolute top-50 start-0 translate-middle-y ps-3 text-muted" size={30}/>
                    <input 
                      type="text" 
                      className="form-control ps-5" 
                      placeholder="Search for Crackers, Fireworks and More"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-1 gap-md-3">
                  <button
                    type="button"
                    className="btn text-white d-flex align-items-center  px-md-1 position-relative"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="bi bi-cart me-md-2" />
                  </button>
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
          </header>

);
}

Headers.propTypes = {
  onFilterClick: PropTypes.func,
};

export default Headers;