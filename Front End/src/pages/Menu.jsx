import { useState } from 'react';
import { usePizza } from '../contexts/PizzaContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pizza, ShoppingCart, Star, Leaf } from 'lucide-react';

const Menu = () => {
  const { pizzas, loading } = usePizza();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState({});

  const categories = [
    { value: 'all', label: 'All Pizzas' },
    { value: 'classic', label: 'Classic' },
    { value: 'premium', label: 'Premium' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'specialty', label: 'Specialty' }
  ];

  const sizes = [
    { value: 'small', label: 'Small', multiplier: 0.8 },
    { value: 'medium', label: 'Medium', multiplier: 1 },
    { value: 'large', label: 'Large', multiplier: 1.2 }
  ];

  const filteredPizzas = pizzas.filter(pizza => 
    selectedCategory === 'all' || pizza.category === selectedCategory
  );

  const handleAddToCart = (pizza) => {
    const size = selectedSize[pizza.id] || 'medium';
    addToCart(pizza, size);
  };

  const handleSizeChange = (pizzaId, size) => {
    setSelectedSize(prev => ({
      ...prev,
      [pizzaId]: size
    }));
  };

  const getPriceForSize = (basePrice, size) => {
    const sizeData = sizes.find(s => s.value === size);
    return (basePrice * sizeData.multiplier).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-lg text-gray-600">
          Choose from our delicious selection of handcrafted pizzas
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Pizza Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPizzas.map(pizza => (
          <Card key={pizza.id} className="overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center relative">
              <Pizza className="h-16 w-16 text-gray-400" />
              {pizza.popular && (
                <Badge className="absolute top-2 right-2 bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {pizza.vegetarian && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  <Leaf className="h-3 w-3 mr-1" />
                  Veggie
                </Badge>
              )}
            </div>

            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{pizza.name}</span>
                <span className="text-pink-600 font-bold">
                  ₹{getPriceForSize(pizza.price, selectedSize[pizza.id] || 'medium')}
                </span>
              </CardTitle>
              <CardDescription>{pizza.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(pizza.ingredients) ? (
                      pizza.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No ingredients listed</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Size:</label>
                  <Select
                    value={selectedSize[pizza.id] || 'medium'}
                    onValueChange={(value) => handleSizeChange(pizza.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleAddToCart(pizza)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPizzas.length === 0 && (
        <div className="text-center py-12">
          <Pizza className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pizzas found</h3>
          <p className="text-gray-600">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;

