import Cart from './pages/cart';
import Login from "./pages/Login"
import { AuthProvider } from './hooks/useAuth';
import ProfilePage from './pages/ProfilePage';
import { CartProvider } from './contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PersonalInformation from './components/sections/PersonalInformation';


const App =() => {

  return (
   <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/personalinfo" element={<PersonalInformation/>}/>
       </Routes>
      </BrowserRouter>  
    </CartProvider>
   </AuthProvider> 
  );
};

export default App;
