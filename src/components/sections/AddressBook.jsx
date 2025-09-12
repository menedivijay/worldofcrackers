import PropTypes from "prop-types";
import { Button } from "react-bootstrap"; 
import {  Plus } from "react-bootstrap-icons"; 
import { useAuth } from "../../hooks/useAuth";


const AddressBook = () => {
  
    const {  isAuthenticated } = useAuth();
    
  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">
          Please login to view your Delivery Address.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted mb-0">
          Manage your shipping and billing addresses for faster checkout.
        </p>
        <Button style={{backgroundColor:"purple", borderColor:"purple"}}>
          <Plus className="me-1" />
          Add Address
        </Button>
      </div>
    </div>
  );
};
export default AddressBook;

/* ✅ PropTypes runtime validation */
AddressBook.propTypes = {
  initialAddresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["home", "work", "other"]).isRequired,
      name: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      isDefault: PropTypes.bool.isRequired,
    })
  ).isRequired,
};