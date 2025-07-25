import { useState } from 'react';
import { usePizza } from '../../contexts/PizzaContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2, Search, Leaf, Star } from 'lucide-react';

const AdminPizzas = () => {
  const { pizzas, addPizza, updatePizza, deletePizza } = usePizza();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPizza, setCurrentPizza] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'classic',
    ingredients: '',
    image: '',
    popular: false,
    vegetarian: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['classic', 'premium', 'vegetarian', 'specialty'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIngredientsChange = (e) => {
    setFormData(prev => ({
      ...prev,
      ingredients: e.target.value.split(',').map(item => item.trim())
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleOpenDialog = (pizza = null) => {
    setCurrentPizza(pizza);
    if (pizza) {
      setFormData({
        name: pizza.name,
        description: pizza.description,
        price: pizza.price,
        category: pizza.category,
        ingredients: pizza.ingredients.join(', '),
        image: pizza.image,
        popular: pizza.popular,
        vegetarian: pizza.vegetarian,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'classic',
        ingredients: '',
        image: '',
        popular: false,
        vegetarian: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSavePizza = () => {
    if (currentPizza) {
      updatePizza(currentPizza.id, { ...formData, price: parseFloat(formData.price) });
    } else {
      addPizza({ ...formData, price: parseFloat(formData.price) });
    }
    setIsDialogOpen(false);
  };

  const handleDeletePizza = (id) => {
    if (window.confirm('Are you sure you want to delete this pizza?')) {
      deletePizza(id);
    }
  };

  const filteredPizzas = pizzas.filter(pizza => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pizza.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pizza.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pizza Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Pizza
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pizzas</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search pizzas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Vegetarian</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPizzas.map(pizza => (
                <TableRow key={pizza.id}>
                  <TableCell className="font-medium">{pizza.name}</TableCell>
                  <TableCell className="capitalize">{pizza.category}</TableCell>
                  <TableCell>₹{pizza.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {pizza.popular ? <Star className="h-4 w-4 text-yellow-500" /> : '-'}
                  </TableCell>
                  <TableCell>
                    {pizza.vegetarian ? <Leaf className="h-4 w-4 text-green-500" /> : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(pizza)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeletePizza(pizza.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPizzas.length === 0 && (
            <p className="text-center text-gray-500 py-4">No pizzas found.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentPizza ? 'Edit Pizza' : 'Add New Pizza'}</DialogTitle>
            <DialogDescription>
              {currentPizza ? 'Edit the details of this pizza.' : 'Fill in the details for a new pizza.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); handleSavePizza(); }} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">Ingredients</Label>
              <Textarea id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleIngredientsChange} className="col-span-3" placeholder="Comma separated ingredients" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleInputChange} className="col-span-3" placeholder="e.g., /api/placeholder/300/200" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="popular" className="text-right">Popular</Label>
              <Checkbox id="popular" name="popular" checked={formData.popular} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vegetarian" className="text-right">Vegetarian</Label>
              <Checkbox id="vegetarian" name="vegetarian" checked={formData.vegetarian} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, vegetarian: checked }))} className="col-span-3" />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPizzas;

