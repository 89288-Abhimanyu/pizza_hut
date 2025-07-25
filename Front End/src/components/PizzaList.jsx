import { initialPizzas } from '../data/pizzas';

const PizzaList = () => (
  <div className="max-w-3xl mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6">Pizza Menu</h1>
    {initialPizzas.map(pizza => (
      <div key={pizza.id} className="border rounded-lg p-4 mb-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{pizza.name}</h2>
        <p className="mb-1 text-gray-700">{pizza.description}</p>
        <p className="mb-1 font-bold text-green-700">Price: ₹{pizza.price}</p>
        <p className="mb-1 text-gray-600">Category: {pizza.category}</p>
        <p className="mb-1 text-gray-600">Ingredients: {pizza.ingredients.join(', ')}</p>
        <img src={pizza.image} alt={pizza.name} className="w-48 h-32 object-cover mt-2" />
      </div>
    ))}
  </div>
);

export default PizzaList;
