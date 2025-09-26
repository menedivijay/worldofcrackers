import Sidebar from './Sidebar';
import Banner from './Banner';
// import products from '../data/products';
import { X } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import '../App.css';
import '../Login.css';
import ProductCard from './ProductCard';
import Header from './Header';

import 'bootstrap/dist/css/bootstrap.min.css';


function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const controller = new AbortController();
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = new URL('https://cracker-backend-0iz6.onrender.com/products');
        if (searchTerm && searchTerm.trim().length > 0) {
          url.searchParams.append('keyword', searchTerm.trim());
        }
        url.searchParams.append('page', String(page));
        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to load products (${response.status})`);
        }
        const data = await response.json();
        // Normalize API fields to UI-friendly shape
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p._id ?? p.productId ?? String(Math.random()),
          name: p.productName ?? '',
          brand: p.brandName ?? '',
          image: Array.isArray(p.images) && p.images[0]?.Location ? p.images[0].Location : '',
          originalPrice: p.orignalPrice ?? p.originalPrice ?? 0,
          discountedPrice: p.discountPrice ?? p.discountedPrice ?? 0,
          category: p.category ?? 'All',
          raw: p,
        }));
        setProducts(normalized);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
    return () => controller.abort();
  }, [searchTerm, page]);

  // Extract unique brands from products
  const availableBrands = useMemo(() => {
    const brands = products.map(product => product.brand || 'Other');
    return [...new Set(brands)].sort();
  }, [products]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };
  
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === "All" 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    // Apply brand filter if any brands are selected
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    return filtered;
  }, [selectedCategory, selectedBrands, products]);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.discountedPrice - b.discountedPrice;
      case "price-high-low":
        return b.discountedPrice - a.discountedPrice;
      default:
        return 0;
    }
  });


  return(
    <div>
          <Header onFilterClick={() => setMobileFiltersOpen(true)} searchTerm={searchTerm} onSearchChange={(val) => { setSearchTerm(val); setPage(1); }} />
          <Banner/>
            <div className="d-flex container-fluid px-0">
             <div className="d-none d-lg-block" style={{top:"4rem"}}>
              <Sidebar 
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                selectedBrands={selectedBrands}
                availableBrands={availableBrands}
                onBrandToggle={handleBrandToggle}
              />
              </div>
              <>

                {/* Drawer Overlay */}
                <div
                  className={`offcanvas-backdrop fade ${mobileFiltersOpen ? "show" : ""}`}
                  style={{ display: mobileFiltersOpen ? "block" : "none" }}
                  onClick={() => setMobileFiltersOpen(false)}
                />

                {/* Drawer Panel */}
                <div
                  className={`drawer bg-white shadow position-fixed top-0 start-0 h-100 ${
                    mobileFiltersOpen ? "drawer-open" : ""
                  }`}
                  style={{ width: "300px", maxHeight: "100vh", transition: "transform 0.3s ease-in-out" }}
                >
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="mb-0">Filters</h5>
                    <button
                      className="btn btn-light p-2"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-3 overflow-auto" style={{ maxHeight: "calc(96vh - 60px)" }}>
                    <Sidebar
                      selectedCategory={selectedCategory}
                      onCategorySelect={setSelectedCategory}
                      selectedBrands={selectedBrands}
                      availableBrands={availableBrands}
                      onBrandToggle={handleBrandToggle}
                      mobile={true}
                    />
                  </div>
                </div>

                {/* Custom CSS */}
                <style>{`
                  .drawer {
                    transform: translateX(-100%);
                    z-index: 1050;
                  }
                  .drawer-open {
                    transform: translateX(0);
                  }
                  .offcanvas-backdrop {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    z-index: 1040;
                  }
                `}</style>
              </>  
              <main className="flex-grow w-100">
                  <div className="sticky-bar bg-white mb-2 p-3 w-100 shadow-sm">
                    <div className="d-flex flex-column flex-md-row w-100 fixed justify-content-between align-items-start align-items-md-center gap-2">
                      {/* Category Title */}
                      <h1 className="h5 fw-bold text-dark mb-0">{selectedCategory}</h1>

                      {/* Sort Dropdown */}
                      <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">Price:</span>
                        <select
                          className="form-select form-select-sm"
                          style={{ width: "12rem", minWidth: "8rem" }}
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="default">Default</option>
                          <option value="price-low-high">Low to High</option>
                          <option value="price-high-low">High to Low</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 g-md-4 p-3">
                    {loading && (
                      <div className="col-12 text-center py-5">Loading products...</div>
                    )}
                    {error && (
                      <div className="col-12 text-center text-danger py-5">{error}</div>
                    )}
                    {!loading && !error && sortedProducts.map((product) => (
                      <div key={product.id} className="col">
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </div>

                  {/* No Products Message */}
                  {!loading && !error && sortedProducts.length === 0 && (
                    <div className="text-center py-5">
                      <p className="text-muted">No products found in this category.</p>
                    </div>
                  )}

                  {/* Pagination (simple prev/next; server page size is 15) */}
                  {!loading && !error && sortedProducts.length > 0 && (sortedProducts.length === 15 || page > 1) && (
                    <div className="d-flex justify-content-center align-items-center gap-2 py-3">
                      <button className="btn btn-outline-secondary btn-sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                      <span className="small">Page {page}</span>
                      <button className="btn btn-outline-secondary btn-sm" disabled={sortedProducts.length < 15} onClick={() => setPage((p) => p + 1)}>Next</button>
                    </div>
                  )}
                </main>
          </div>
       </div>
  );

};
export default Dashboard;