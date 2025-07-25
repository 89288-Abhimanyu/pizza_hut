import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pizza, Clock, Truck, Star } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Pizza className="h-8 w-8 text-red-600" />,
      title: "Fresh Ingredients",
      description: "We use only the freshest ingredients sourced locally"
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Fast Delivery",
      description: "Hot pizzas delivered to your door in 30 minutes or less"
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      title: "Free Delivery",
      description: "Free delivery on orders over ₹25 within our delivery zone"
    },
    {
      icon: <Star className="h-8 w-8 text-red-600" />,
      title: "5-Star Rated",
      description: "Rated #1 pizza place in the city by our customers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Pizza Hut
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Authentic Italian pizzas made with love and delivered fresh to your door
            </p>
            {isAuthenticated() ? (
              <Link to="/menu">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  Order Now
                </Button>
              </Link>
            ) : (
              <div className="space-x-4">
                <Link to="/login">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Order Now
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg"  className="bg-white text-red-600 hover:bg-gray-100">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Pizza Hut?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to delivering the best pizza experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Pizzas Preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Most Popular Pizzas
            </h2>
            <p className="text-lg text-gray-600">
              Taste the favorites that keep our customers coming back
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Margherita", price: "₹240", image: "/api/placeholder/300/200" },
              { name: "Pepperoni", price: " ₹280", image: "/api/placeholder/300/200" },
              { name: "Supreme", price: " ₹320", image: "/api/placeholder/300/200" }
            ].map((pizza, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Pizza className="h-16 w-16 text-gray-400" />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{pizza.name}</span>
                    <span className="text-red-600">{pizza.price}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            {isAuthenticated() ? (
              <Link to="/menu">
                <Button size="lg">View Full Menu</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="lg">Login to Order</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

