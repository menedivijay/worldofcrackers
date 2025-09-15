import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Alert, Row, Col, Badge, Card, } from "react-bootstrap"; 
import {  Plus } from "react-bootstrap-icons";
import { useAuth } from "../../hooks/useAuth";
import AddressDialog  from "../AddressDialog";



 const AddressBook = ({ user }) => {
  const [addresses, setAddresses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // Load addresses from localStorage on mount
  useEffect(() => {
    if (user?.username) {
      const savedAddresses = localStorage.getItem(`addresses_${user.username}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    }
  }, [user?.username]);

  // Save addresses to localStorage
  const saveAddressesToStorage = (newAddresses) => {
    if (user?.username) {
      localStorage.setItem(
        `addresses_${user.username}`,
        JSON.stringify(newAddresses)
      );
      setAddresses(newAddresses);
    }
  };

  const handleAddAddress = (newAddress) => {
    let updatedAddresses = [...addresses];

    if (updatedAddresses.length === 0 || newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
      newAddress.isDefault = true;
    }

    updatedAddresses.push(newAddress);
    saveAddressesToStorage(updatedAddresses);
    setAlertMessage("✅ Address added successfully.");
  };

  const handleEditAddress = (updatedAddress) => {
    let updatedAddresses = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr
    );

    if (updatedAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr.id === updatedAddress.id ? addr : { ...addr, isDefault: false }
      );
    }

    saveAddressesToStorage(updatedAddresses);
    setEditingAddress(null);
    setAlertMessage("✏️ Address updated successfully.");
  };

  const handleEdit = (addressId) => {
    const address = addresses.find((addr) => addr.id === addressId);
    if (address) {
      setEditingAddress(address);
      setDialogOpen(true);
    }
  };

  const handleDelete = (addressId) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    saveAddressesToStorage(updatedAddresses);
    setAlertMessage("🗑️ Address deleted.");
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    saveAddressesToStorage(updatedAddresses);
    setAlertMessage("⭐ Default address updated.");
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case "home":
        return "success";
      case "work":
        return "primary";
      default:
        return "secondary";
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted">
          Manage your shipping and billing addresses for faster checkout.
        </p>
        <Button style={{backgroundColor:"purple", borderColor:"purple"}} onClick={() => setDialogOpen(true)}>
         <Plus className="me-1" /> Add New Address
        </Button>
      </div>

      {alertMessage && (
        <Alert
          variant="info"
          dismissible
          onClose={() => setAlertMessage(null)}
        >
          {alertMessage}
        </Alert>
      )}

      <Row className="g-3">
        {addresses.map((address) => (
          <Col key={address.id} md={6} lg={4}>
            <Card className="p-3 border">
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <Badge bg={getTypeVariant(address.type)} className="me-2">
                    {address.type}
                  </Badge>
                  {address.isDefault && (
                    <Badge bg="dark" className="me-2">
                      Default
                    </Badge>
                  )}
                </div>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEdit(address.id)}
                    className="me-2"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>

              <div>
                <p className="fw-bold mb-1">{address.name}</p>
                <p className="mb-1">
                  {address.doorNo}, {address.street}
                </p>
                {address.village && <p className="mb-1">{address.village}</p>}
                <p className="mb-1">
                  {address.city} - {address.pincode}
                </p>
                {address.landmark && (
                  <p className="mb-1">Near: {address.landmark}</p>
                )}
                <p className="mb-1">📞 {address.phone}</p>
              </div>

              {!address.isDefault && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={() => handleSetDefault(address.id)}
                >
                  Set as Default
                </Button>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      <AddressDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingAddress(null);
        }}
        address={editingAddress}
        onSave={editingAddress ? handleEditAddress : handleAddAddress}
      />
    </div>
  );
};

export default AddressBook;

// ✅ PropTypes validation
AddressBook.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};


/*const AddressBook = () => {
  
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
      {/* Header + Add Button 
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

/* ✅ PropTypes runtime validation 
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
};*/