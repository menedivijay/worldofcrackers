import Checkout from './pages/checkout';
import Login from "./pages/Login"
import { CartProvider } from './contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/checkout" element={<Checkout />}/>
       </Routes>
      </BrowserRouter>  
    </CartProvider> 
  );
};

export default App;
