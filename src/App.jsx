import Cart from './pages/cart';
import Login from "./pages/Login"
import { AuthProvider } from './hooks/useAuth';
import ProfilePage from './pages/ProfilePage';
import Order from './pages/orderpage';
import { CartProvider } from './contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {

  return (
   <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<Order/>}/>
       </Routes>
      </BrowserRouter>  
    </CartProvider>
   </AuthProvider> 
  );
};

export default App;
