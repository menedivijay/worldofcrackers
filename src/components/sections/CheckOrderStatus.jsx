import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const CheckOrderStatus = () => {
  const [orderNumber, setOrderNumber] = useState("");

  const {  isAuthenticated } = useAuth();
    
      if (!isAuthenticated) {
        return (
          <div className="text-center py-4">
            <p className="text-muted">
              Please login to view your Orders.
            </p>
          </div>
        );
      }

  return (
    <div className="mb-4">
      <p className="text-muted">
        Track your order status using your order ID.
      </p>

      <Card className="border border-2">
        <Card.Body>
          <h5 className="fw-semibold mb-4">Track Your Order</h5>

          <Form>
            <Row className="g-3 mb-4">
              <Col md={6}>
                <Form.Group controlId="orderNumber">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., ORD-2024-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              style={{backgroundColor:"purple"}}
            >
              Track Order
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CheckOrderStatus;
