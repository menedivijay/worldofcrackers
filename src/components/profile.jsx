import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Package, CalendarDays, Truck, CreditCard } from "lucide-react";

// ✅ Order PropTypes for runtime validation
const orderShape = PropTypes.shape({
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
});

const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("userOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "badge bg-success";
      case "processing":
        return "badge bg-primary";
      case "shipped":
        return "badge bg-purple"; // You can define custom purple in CSS
      default:
        return "badge bg-secondary";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container py-4">
        <h1 className="h4 fw-bold mb-4">My Profile</h1>
        <div className="card text-center p-5">
          <Package size={48} className="text-muted mb-3 mx-auto" />
          <h5 className="mb-2">No Orders Yet</h5>
          <p className="text-muted">
            You haven't placed any orders yet. Start shopping to see your order
            history here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h4 fw-bold mb-4">My Profile</h1>

      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <Package size={20} className="me-2" />
          <h5 className="mb-0">Order History ({orders.length} orders)</h5>
        </div>
        <div className="card-body">
          {orders.map((order) => (
            <div key={order.orderId} className="border rounded p-3 mb-4">
              {/* Order Header */}
              <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                <div>
                  <p className="fw-semibold mb-1">Order #{order.orderId}</p>
                  <p className="text-muted small d-flex align-items-center">
                    <CalendarDays size={14} className="me-1" />
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={getStatusClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="fw-bold">₹{order.total}</span>
                </div>
              </div>

              {/* Order Items */}
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-3 bg-light p-2 rounded mb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded border"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium">{item.name}</p>
                    <small className="text-muted">{item.brand}</small>
                  </div>
                  <div className="text-end">
                    <p className="mb-0 small">Qty: {item.quantity}</p>
                    <p className="mb-0 small">₹{item.price}</p>
                  </div>
                </div>
              ))}

              <hr />

              {/* Order Details */}
              <div className="row small">
                <div className="col-md-6 mb-3">
                  <h6 className="fw-medium d-flex align-items-center mb-2">
                    <Truck size={16} className="me-1" />
                    Delivery Address
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
                  <h6 className="fw-medium d-flex align-items-center mb-2">
                    <CreditCard size={16} className="me-1" />
                    Payment Method
                  </h6>
                  <p className="text-muted">
                    {order.customerDetails.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Card Payment"}
                  </p>
                  <div>
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>₹{order.subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-medium">
                      <span>Total:</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;

// ✅ PropTypes validation
Profile.propTypes = {
  orders: PropTypes.arrayOf(orderShape),
};
