import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";


const AddressDialog = ({ open, onOpenChange, address, onSave  }) => {
  
  const [formData, setFormData] = useState({
    type: address?.type || "home",
    name: address?.name || "",
    doorNo: address?.doorNo || "",
    street: address?.street || "",
    village: address?.village || "",
    city: address?.city || "",
    pincode: address?.pincode || "",
    landmark: address?.landmark || "",
    phone: address?.phone || "",
    isDefault: address?.isDefault || false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.doorNo ||
      !formData.street ||
      !formData.city ||
      !formData.pincode ||
      !formData.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newAddress = {
      id: address?.id || Date.now().toString(),
      ...formData,
    };

    onSave(newAddress);
    onOpenChange(false);

    setFormData({
      type: "home",
      name: "",
      doorNo: "",
      street: "",
      village: "",
      city: "",
      pincode: "",
      landmark: "",
      phone: "",
      isDefault: false,
    });
  };

  return (
    <Modal show={open} onHide={() => onOpenChange(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{address ? "Edit Address" : "Add New Address"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-sm-4">
          <Form.Group className="mb-3">
            <Form.Label>Type *</Form.Label>
            <Form.Select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group></div>
          <div className="col-sm-8">
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Full Name"
            />
          </Form.Group></div>
          <div className="col-sm-8">
          <Form.Group className="mb-3">
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control
              type="text"
              maxLength={10}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Phone Number"
            />
          </Form.Group></div>
       
          <div className="col-sm-4">
          <Form.Group className="mb-3">
            <Form.Label>Door No *</Form.Label>
            <Form.Control
              type="text"
              value={formData.doorNo}
              onChange={(e) => handleInputChange("doorNo", e.target.value)}
              placeholder="Door/Flat no."
            />
          </Form.Group></div>
           <div className="col-sm-6">
          <Form.Group className="mb-3">
            <Form.Label>Street *</Form.Label>
            <Form.Control
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange("street", e.target.value)}
              placeholder="Street Name"
            />
          </Form.Group></div>
           <div className="col-sm-6">
          <Form.Group className="mb-3">
            <Form.Label>Village*</Form.Label>
            <Form.Control
              type="text"
              value={formData.village}
              onChange={(e) => handleInputChange("village", e.target.value)}
              placeholder="Village Name"
            />
          </Form.Group></div>
          <div className="col-sm-4">
          <Form.Group className="mb-3">
            <Form.Label>City*</Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="City Name"
            />
          </Form.Group> </div>
          <div className="col-sm-3">
          <Form.Group className="mb-3">
            <Form.Label>Pincode*</Form.Label>
            <Form.Control
              type="text"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
              placeholder="Pincode"
            />
          </Form.Group></div>
          <div className="col-sm-5">
          <Form.Group className="mb-3">
            <Form.Label>Landmark*</Form.Label>
            <Form.Control
              type="text"
              value={formData.landmark}
              onChange={(e) => handleInputChange("landmark", e.target.value)}
              placeholder="Nearby Landmark"
            />
          </Form.Group></div></div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button  onClick={handleSave} style={{backgroundColor:"purple", borderColor:"purple"}}>
          {address ? "Update Address" : "Add Address"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressDialog;

// ✅ Runtime validation with PropTypes
AddressDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  address: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.oneOf(["home", "work", "other"]),
    name: PropTypes.string,
    doorNo: PropTypes.string,
    street: PropTypes.string,
    village: PropTypes.string,
    city: PropTypes.string,
    pincode: PropTypes.string,
    landmark: PropTypes.string,
    phone: PropTypes.string,
    isDefault: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
};
