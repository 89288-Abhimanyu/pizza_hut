import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { PizzaProvider } from './contexts/PizzaContext';
import { OrderProvider } from './contexts/OrderContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPizzas from './pages/admin/Pizzas';
import AdminOrders from './pages/admin/Orders';
import AdminLayout from './components/admin/AdminLayout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PizzaProvider>
        <CartProvider>
          <OrderProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Routes with navbar */}
                  <Route path="/*" element={
                    <>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/menu" element={
                          <ProtectedRoute>
                            <Menu />
                          </ProtectedRoute>
                        } />
                        <Route path="/cart" element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        } />
                        <Route path="/checkout" element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        } />
                        <Route path="/orders" element={
                          <ProtectedRoute>
                            <Orders />
                          </ProtectedRoute>
                        } />
                        
                        {/* Admin routes */}
                        <Route path="/admin/*" element={
                          <ProtectedRoute adminOnly={true}>
                            <AdminLayout>
                              <Routes>
                                <Route path="/" element={<AdminDashboard />} />
                                <Route path="/pizzas" element={<AdminPizzas />} />
                                <Route path="/orders" element={<AdminOrders />} />
                              </Routes>
                            </AdminLayout>
                          </ProtectedRoute>
                        } />
                      </Routes>
                    </>
                  } />
                </Routes>
              </div>
            </Router>
          </OrderProvider>
        </CartProvider>
      </PizzaProvider>
    </AuthProvider>
  );
}

export default App;

