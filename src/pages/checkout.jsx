import { useState } from "react";
import useCart from "../contexts/CartContext";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { state, updateQuantity, removeItem } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
     setIsPlacingOrder(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsPlacingOrder(false);
    // Here you would typically integrate with a payment processor
    alert("Order placed successfully! 🎉"); 
    
    navigate("/");

  };

  if (state.items.length === 0) {
    return (
      <div className="container py-5">
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="bi bi-arrow-left me-2"/> Back to Shopping
        </button>

        <div className="text-center py-5">
          <h2 className="fw-bold mb-3">Your cart is empty</h2>
          <p className="text-muted mb-4">Add some products to get started!</p>
          <button className="btn btn-purple" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        className="btn text-dark mb-4 position-sticky sticky-top bg-white"
        onClick={() => navigate("/")} style={{top:"4rem", zIndex: 1040}}
      >
        <ArrowLeft className="bi bi-arrow-left me-2"/> Back to Shopping
      </button>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Shopping Cart ({state.totalItems} items)</h5>
            </div>
            <div className="card-body">
              {state.items.map((item) => (
                <div key={item.id} className="d-flex align-items-center gap-3 p-3 border rounded">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="rounded object-fit-cover"
                      style={{ width: "64px", height: "64px" }}
                    />
                    
                    <div className="flex-grow-1">
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">₹{item.price}</p>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="bi bi-dash"/>
                      </button>

                      <span className="text-center" style={{ width: "32px" }}>
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="bi bi-plus"/>
                      </button>
                    </div>

                    <div className="text-end">
                      <p className="fw-medium mb-1">₹{item.price * item.quantity}</p>
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="bi bi-trash"/>
                      </button>
                    </div>
                  </div>

                
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>₹{Math.round(total * 0.12)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total Fare</span>
                <span>₹{Math.round(total * 1.18)}</span>
              </div>

              {/* Form */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" placeholder="you@email.com"/>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Delivery Address
                </label>
                <input type="text" className="form-control" id="address" placeholder="Enter your address"/>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input type="tel" className="form-control" id="phone" placeholder="Your phone number"/>
              </div>

              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
