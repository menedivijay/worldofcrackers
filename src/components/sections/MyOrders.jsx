import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Package, CalendarDays, CreditCard, Truck } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated , user} = useAuth();

  useEffect(() => {
  if (user && user.username) {
    const key = `userOrders_${user.username}`;
    const savedOrders = localStorage.getItem(key);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders([]); // fallback if no orders exist
    } 
  }
}, [user]);

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge bg-success";
      case "processing":
        return "badge bg-primary";
      case "shipped":
        return "badge bg-warning text-dark";
      case "cancelled":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const handleCancelOrder = (orderId) => {
    alert("Do you want to cancel the order!");
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: "cancelled" } : order
    );
    setOrders(updatedOrders);
    // Update localStorage
    const key = user && user.username ? `userOrders_${user.username}` : `userOrders`;
    localStorage.setItem(key, JSON.stringify(updatedOrders));
  };


  if (!isAuthenticated) {
      return (
        <div className="text-center py-4">
          <p className="text-muted">
            Please login to view your Orders.
          </p>
        </div>
      );
    }

  if (orders.length === 0 && isAuthenticated) {
    return (
      <div className="container my-2">
        <div className="card text-center p-4">
          <Package size={48} className="text-muted mx-auto mb-3" />
          <h5>No Orders Yet</h5>
          <p className="text-muted">
            You haven't placed any orders yet. Start shopping to see your order history here!
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container my-2">
      <div className="card">
        <div className="card-header d-flex align-items-center gap-2">
          <Package size={20} />
          <span className="fs-5">Orders</span>
        </div>
        <div className="card-body">
          {orders.map((order, idx) => (
            <div key={order.orderId || idx} className="border rounded p-3 mb-3">
              {/* Order Header */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3">
                <div>
                  <p className="fw-semibold mb-1">Order ID: {order.orderId}</p>
                  <p className="text-muted small d-flex align-items-center gap-1 mb-0">
                    <CalendarDays size={14} />{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                  <span className={getStatusClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="fw-bold">₹{Math.round(order.totalFare)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-3">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center gap-3 bg-light p-2 rounded mb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded border"
                      style={{ width: "48px", height: "48px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-medium small">{item.name}</p>
                      <small className="text-muted">{item.brand}</small>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 small fw-medium">Qty: {item.quantity}</p>
                      <p className="mb-0 small">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              {/* Order Details */}
              <div className="row small">
                <div className="col-md-6 mb-3 mb-md-0">
                  <h6 className="fw-semibold d-flex align-items-center gap-1 mb-2">
                    <Truck size={16} /> Delivery Address
                  </h6>
                  <div className="text-muted">
                    
                    <p className="mb-0">{order.customerDetails.fullName}</p>
                    <p className="mb-0">{order.customerDetails.address}</p>
                    <p className="mb-0">
                      {order.customerDetails.city}, {order.customerDetails.pincode}
                    </p>
                    <p className="mb-0">{order.customerDetails.phoneNumber}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-semibold d-flex align-items-center gap-1 mb-2">
                    <CreditCard size={16} /> Payment Method
                  </h6>
                  <p className="text-muted mb-2">
                    {order.customerDetails.paymentMethod === "cod"
                      ? "Card Payment"
                      : "Cash on Delivery"}
                  </p>
                  <div>
                    
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span>₹{order.shipping}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Handling Fee:</span>
                      <span>₹{order.handlingfee}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-semibold">
                      <span>Total Fare:</span>
                      <span>₹{Math.round(order.totalFare)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-items-right pt-2">
                {order.status !== "cancelled" && order.status !== "shipped" 
                ?<button className="btn btn-outline-danger  rounded-0"
                  onClick={() => handleCancelOrder(order.orderId)}>
                  Cancel Order
                </button> : ""}
              </div>
            </div>
            
          ))}
        </div>
        
      </div>
    </div>
  );
};
export default MyOrders;

// PropTypes validation
MyOrders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.string.isRequired,
      customerDetails: PropTypes.shape({
        fullName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        pincode: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
      }).isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          brand: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
      subtotal: PropTypes.number.isRequired,
      shipping: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      orderDate: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
};
