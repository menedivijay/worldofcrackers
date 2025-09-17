import { Plus, Minus } from "lucide-react";
import useCart from "../contexts/CartContext";

const ProductCard = ({
  id,
  name,
  brand,
  image,
  originalPrice,
  discountedPrice,
  currency = "₹",
}) => {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  const quantity = getItemQuantity(id);

  const handleAddToCart = () => {

    addItem({
      id,
      name,
      brand,
      image,
      price: discountedPrice,
      currency });
    
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(id, newQuantity);
  };
  return (
    <div className="card  h-100 w-150 shadow-sm  border-0 rounded-3">
      <div className="position-relative bg-light p-2 p-md-2 overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <img 
          src={image} 
          alt={name}
          className="img-fluid w-100 h-100 object-fit-contain transition"
          style={{ transition: 'transform 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {discountPercentage > 0 && (
          <div 
            className="position-absolute top-0 start-0 bg-success text-white small fw-semibold px-1 py-1 rounded" 
            style={{ marginTop: "0.2rem", marginLeft: "0.2rem" }}
          >
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <h3 className="small fw-medium text-body text-truncate mb-0">
            {name}
          </h3>
        </div>
        <p className="card-text small mb-2">
          <s className="text-muted ">{originalPrice} {currency}</s>{" "}
          <span className="fw-bold text-success">
            {discountedPrice} {currency}
          </span>
          
        
        <span className="badge text-white small mx-1 bg-secondary" style={{}}>{brand}</span>
        </p>

        {quantity === 0 ? (
            
            <button 
              onClick={handleAddToCart}
              className="btn btn-sm btn-dark w-100 p-1"
            >
              Add to Cart
            </button>
          ) : (
            <div className="d-flex align-items-center justify-content-between rounded " style={{backgroundColor:"#e2dfdfff"}}>
              <button
                className="btn btn-sm text-dark d-flex align-items-center justify-content-center rounded"
                style={{ width: "2rem", height: "2rem" }}
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <Minus className="bi bi-dash"/> {/* Bootstrap Icons */}
              </button>

              <span className="fw-medium text-dark">{quantity}</span>

              <button
                className="btn btn-sm text-dark d-flex align-items-center justify-content-center"
                style={{ width: "2rem", height: "2rem" }}
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="bi bi-plus"/>
              </button>
            </div>
          )}
      </div>
      </div>
    
  );
};

export default ProductCard