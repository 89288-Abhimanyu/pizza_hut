import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Pizza, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Pizza className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-gray-900">Pizza Hut</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/menu">
                  <Button variant="ghost">Menu</Button>
                </Link>
                
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm">
                    <ShoppingCart className="h-5 w-5" />
                    {getItemCount() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getItemCount()}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {isAdmin() && (
                  <Link to="/admin">
                    <Button variant="ghost">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

