import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import useCart from "../contexts/CartContext";
import products from "../data/products";
import "../App.css"
import { ArrowLeft,  Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const Dashboard = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate("/");
    window.location.reload();
  };
  
   const { isAuthenticated } = useAuth();
  const [isCheckout, setIsCheckout] = useState(false);
  const { items: cartItems = [], removeItem, updateQuantity, state } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);
 
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const subtotal = cartProducts.reduce(
    (sum, product) =>
      sum + (product?.discountedPrice || 0) * (product?.quantity || 0),
    0
  );

  //const shipping = subtotal > 500 ? 0 : 40;

  
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    landmark:"",
  });

  const navigate = useNavigate();
  // Order confirmation state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD${timestamp}${random}`;
  };
  // Handle order placement
  const handlePlaceOrder = async () => {
    if(!isAuthenticated){
      alert("Please login to place the order");
      return;
    }
    
    setIsPlacingOrder(true); // disable button and show "Placing Order..."
    try {
      // simulate API call or your order logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order", error);
    } finally {
      setIsPlacingOrder(false); // re-enable button
    }
    // Validate required fields
    if (
      !customerDetails.fullName ||
      !customerDetails.address ||
      !customerDetails.city ||
      !customerDetails.pincode ||
      !customerDetails.phoneNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newOrderId = generateOrderId();

    const orderData = {
      orderId: newOrderId,
      customerDetails,
      items: cartProducts.map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        brand: product.brand,
        quantity: product.quantity,
        price: product.discountedPrice,
      })),
      subtotal,
      total,
      orderDate: new Date().toISOString(),
      status: "processing",
    };

    const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    const updatedOrders = [orderData, ...existingOrders];
    localStorage.setItem("userOrders", JSON.stringify(updatedOrders));

    setOrderId(newOrderId);
    
    setOrderPlaced(true);
   };

  const handleInputChange = (field, value) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (state.items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2 className="fw-bold mb-3">Your cart is empty</h2>
          <p className="text-muted mb-4">Add some products to get started!</p>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{width: "100%",backgroundImage: "url('/images/congras.gif')", backgroundSize: "cover", backgroundPosition: "center",}}>
      <div className="card text-center w-100" style={{maxWidth: "400px"}}>
        <div className="card-header bg-white border-0">
          <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25" style={{ width: "64px", height: "64px" }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle bg-success" style={{ width: "32px", height: "32px" }}>
              <span className="text-white fs-6">✓</span>
            </div>
          </div>
          <h5 className="text-success">Order Placed Successfully!</h5>
        </div>

        <div className="card-body">
          <div className="bg-light p-3 rounded mb-3">
            <p className="text-muted small mb-1">Your Order ID</p>
            <p className="fw-bold fs-6 text-dark mb-0">{orderId}</p>
          </div>

          <div className="text-muted small mb-3">
            <p className="mb-0">Total Price: ₹{Math.round(total * 1.18)}</p>
            <p className="mb-0">
              Payment Method:{" "}
              {customerDetails.paymentMethod === "co"
                ? "Cash on Delivery"
                : "Card Payment"}
            </p>
          </div>

          <button
            className="btn btn-success w-100"
            onClick={Dashboard}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="sticky-top h-100 bg-light" style={{maxWidth:"100%"}}>
        <header className="sticky-top shadow-sm" style={{width: "100%",backgroundImage: "url('/images/')", backgroundSize: "cover", backgroundPosition: "center", backgroundColor:"black"}}>
            <div className="container-fluid px-3">

              {/* Navbar Row */}
              <div className="d-flex align-items-center justify-content-between" style={{ height: '60px' }}>
                

                {/* Desktop Logo */}
                <div className="d-none d-md-flex align-items-center gap-2">
                  <div className="fw-bold text-white fs-4" onClick={()=>navigate("/")}>✨ DiwaliMart</div>
                </div>
                 
                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-1 gap-md-3">
                  <button type="button" className="btn text-white d-flex align-items-center  px-md-1 position-relative"
                    onClick={() => navigate("/")}>
                      <ArrowLeft className="bi bi-cart me-md-2 fixed"/>
                      <span className="d-none d-md-inline text-white">Back to Shopping</span>
                    </button>
                </div>
              </div>
            </div>
          </header>
    
      <div className="container">
         <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8 h-100">
          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Shopping Cart ({state.totalItems} items)</h5>
            </div>
            <div className="card-body">
              {state.items.map((item) => (
                <div 
                  key={item.id} 
                  className="cart-item-1 d-flex align-items-center justify-content-between mb-3 border rounded">
                  <div className="d-flex"><img 
                    src={item.image} 
                    alt={item.name}
                    className="img-fluid-a rounded-start "
                    style={{ width: "70px", height: "70px", padding:"2px"}}
                  />

                  <div className="flex-grow-1 pt-3" style={{paddingLeft:"10px"}}>
                    <h6 className="small fw-medium text-body text-truncate mb-0">{item.name}</h6>
                    <p className="text-muted small mb-2">{item.brand}</p>
                  </div>
                  </div>
                 <div className="d-flex align-items-center justify-content-between gap-5 end"> 
                  <div className="flex align-items-center gap-4">
                      <span className="small text-muted">Quantity:</span>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm p-2 py-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>

                        <span className="text-center" style={{ width: "32px" }}>
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-outline-secondary btn-sm px-2 py-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      </div>
                      <div className="text-end p-2">
                        <p className="fw-semibold mb-0">₹{item.price * item.quantity}/-</p>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="bi bi-trash"/>
                        </button>
                      </div>
                </div> 
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
            <div
              className="card sticky-top custom-top-24 mt-3"
              style={{ top: "3.8rem", zIndex: 1040 }}
            >
              <div className="card-header">
                <h5 className="mb-0">
                  {isCheckout ? "Delivery information" : "Order Summary"}
                </h5>
              </div>

              {/* Switch between Order Summary and Checkout Form */}
              {!isCheckout ? (
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>--</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>₹{Math.round(total * 0.12)}</span>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="coupon" className="form-label">
                      Apply Coupon
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="coupon"
                        placeholder="Enter coupon code"
                        className="form-control"
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        Apply
                      </button>
                    </div>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                    <span>Total Fare</span>
                    <span>₹{Math.round(total * 1.18)}</span>
                  </div>

                  <button
                    className="btn btn-success w-100"
                    onClick={() => setIsCheckout(true)}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              ) : (
                <div className="card-body p-3">
                  {/* Full Name + Phone */}
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label htmlFor="fullName" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control "
                        value={customerDetails.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number (+91) *
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        className="form-control"
                        maxLength={10}
                        value={customerDetails.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        placeholder="Phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      className="form-control"
                      rows={3}
                      value={customerDetails.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter your complete address"
                      required
                    ></textarea>
                  </div>

                  {/* City + Pincode+ lankmark */}
                  <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                      <label htmlFor="city" className="form-label">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        value={customerDetails.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="pincode" className="form-label">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        maxLength={6}
                        className="form-control"
                        value={customerDetails.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="Enter pincode"
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="landmark" className="form-label">
                        Landmark *
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        className="form-control"
                        value={customerDetails.landmark}
                        onChange={(e) => handleInputChange("landmark", e.target.value)}
                        placeholder="Enter Landmark"
                        required
                      />
                    </div>
                  </div>

                  <h6>Total Amount: ₹{Math.round(total * 1.18)}</h6>

                  <button
                    className="btn w-100 text-white" style={{backgroundColor:"green"}}
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                  >
                    {isPlacingOrder ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              )}
              </div>
          </div>
      </div>
    </div>
    </div>
  );

    // Order confirmation view
  
}
export default Cart;

Cart.prototype = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  customerDetails: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    pincode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
  }),
};



