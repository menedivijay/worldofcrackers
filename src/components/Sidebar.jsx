import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
    "All",
    "SPARKLERS",
    "FLOWER POTS",
    "Ground Chakkars",
    "KIDS FANCY",
    "BOMBS",
    "ROCKETS", 
    "GARLANDS",
    "FANCY SHOTS",
    "MULTIPILE SHOTS",
    "SEPECIAL MULTIPILE SHOTS",

];

function Sidebar({ 
  selectedCategory=[], 
  selectedBrands = [], 
  availableBrands = [], 
  onCategorySelect, 
  onBrandToggle,
  mobile = false
}){

  const [categoryOpen, setCategoryOpen] = useState();
  const [brandsOpen, setBrandsOpen] = useState();

  if (mobile) {
      return (
        <div className="p-3">
            <div className="mb-4">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-between py-2 fs-6 fw-semibold text-dark border-bottom border-secondary"
                style={{
                  top: "4rem",
                  maxHeight: "calc(100vh - 4rem)", // fit viewport height
                               
                }} >
                <span>Category</span>
                {!categoryOpen ? (
                    <ChevronRight className="bi bi-chevron-right"/>
                  ) : (
                    <ChevronDown className="bi bi-chevron-down"/>
                  )}
              </button>

              {categoryOpen && (
                <nav className="mt-3 d-flex flex-column gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategorySelect?.(category)}
                      className={`w-100 d-flex align-items-center justify-content-between px-4 py-2 fs-5 text-start rounded-4 border 
                        ${
                          selectedCategory === category
                            ? "bg-light fw-semibold text-dark border-dark border-opacity-25"
                            : "text-muted bg-light"
                        }`}
                    >
                      <span className="fs-6">{category}</span>
                    </button>
                  ))}
                </nav>
              )}
            </div>

            {/* Brands Section */}
            <div className="mb-4">
              <button
                onClick={() => setBrandsOpen(!brandsOpen)}
                className="btn btn-outline-light w-100 d-flex align-items-center justify-content-between py-2 fs-6 fw-semibold text-dark border-bottom border-secondary"
              >
                <span>Brands</span>
                {brandsOpen ? (
                    <ChevronDown className="bi bi-chevron-down"/>
                  ) : (
                    <ChevronRight className="bi bi-chevron-right"/>
                  )}
              </button>

              {brandsOpen && (
                <div className="mt-2">
                  {availableBrands.map((brand) => (
                    <div key={brand} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`mobile-brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => onBrandToggle?.(brand)}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor={`mobile-brand-${brand}`}
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
      );
  }

  return (
    <div className="border-end bg-light h-100 position-sticky " style={{top:"4rem", width:"225px",}}>
      <div className="px-3 py-2 position-sticky responsive" style={{top:"4rem"}}>
       <div className="position-sticky bg-light pt-3" style={{top:"3.5rem",width:"100%",}}>
        <h2 className="h5 fw-semibold pb-2 mb-1">Filters</h2>
       </div> 
       <div className="positon-sticky" style={{ top:"6rem"}}>
            <div className="mb-2 overflow-auto" style={{ maxHeight: "100%" }}>
            <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="btn btn-light w-100 d-flex align-items-center justify-content-between"
            >
                <span>Category</span>
                {categoryOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {categories.map((category) => (
            categoryOpen && (<div className="mt-2">
            <button
                key={category}
                onClick={() => onCategorySelect && onCategorySelect(category)}
                className="btn w-100 text-start px-3 py-2 small mb-1 responsive"
                style={{
                backgroundColor: selectedCategory === category ? "#343a40" : "#fff", // dark vs light
                color: selectedCategory === category ? "#fff" : "#212529",
                border: "1px solid #ced4da",
                overflowY:'auto' // optional: keep border consistent
                }}
            >
                {category}
            </button>
            </div>
              )))}
            </div>
          </div>

        {/* Brands Section */}
        <div className="mb-4">
          <button
            onClick={() => setBrandsOpen(!brandsOpen)}
            className="btn btn-light w-100 d-flex align-items-center justify-content-between"
          >
            <span>Brands</span>
            {brandsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {brandsOpen && (
            <div className="mt-2 overflow-auto" style={{ maxHeight: "200px" }}>
              {availableBrands.map((brand) => (
                <div key={brand} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => onBrandToggle && onBrandToggle(brand)}
                  />
                  <label className="form-check-label small" htmlFor={`brand-${brand}`}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

// ✅ PropTypes for runtime validation
Sidebar.propTypes = {
  selectedCategory: PropTypes.string,
  selectedBrands: PropTypes.arrayOf(PropTypes.string),
  availableBrands: PropTypes.arrayOf(PropTypes.string),
  onCategorySelect: PropTypes.func,
  onBrandToggle: PropTypes.func,
  mobile: PropTypes.bool,
};