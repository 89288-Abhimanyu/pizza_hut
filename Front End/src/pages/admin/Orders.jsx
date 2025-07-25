import { useState } from 'react';
import { useOrder } from '../../contexts/OrderContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Clock, MapPin, Phone, CreditCard } from 'lucide-react';

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrder();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
    { value: 'preparing', label: 'Preparing', color: 'bg-blue-500' },
    { value: 'ready', label: 'Ready', color: 'bg-green-500' },
    { value: 'delivered', label: 'Delivered', color: 'bg-gray-500' }
  ];

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        <div className="flex items-center space-x-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Order Details - #{order.id}</DialogTitle>
                            <DialogDescription>
                              Order placed on {formatDate(order.createdAt)}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              {/* Customer Information */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Customer Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                                    <div className="flex items-center">
                                      <Phone className="h-4 w-4 mr-2" />
                                      {selectedOrder.phone}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      {selectedOrder.deliveryAddress.address}, {selectedOrder.deliveryAddress.city} {selectedOrder.deliveryAddress.zipCode}
                                    </div>
                                    <div className="flex items-center">
                                      <CreditCard className="h-4 w-4 mr-2" />
                                      <span className="capitalize">{selectedOrder.paymentMethod}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Order Status</h4>
                                  <Select 
                                    value={selectedOrder.status} 
                                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {statuses.map(status => (
                                        <SelectItem key={status.value} value={status.value}>
                                          {status.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {selectedOrder.status !== 'delivered' && (
                                    <div className="flex items-center mt-2 text-sm text-gray-600">
                                      <Clock className="h-4 w-4 mr-2" />
                                      Est. delivery: {formatDate(selectedOrder.estimatedDelivery)}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h4 className="font-semibold mb-2">Order Items</h4>
                                <div className="space-y-2">
                                  {selectedOrder.items.map(item => {
                                    const itemPrice = item.pizza.price * (item.size === 'small' ? 0.8 : item.size === 'large' ? 1.2 : 1);
                                    return (
                                      <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.pizza.name} ({item.size}) x{item.quantity}</span>
                                        <span>${(itemPrice * item.quantity).toFixed(2)}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Order Summary */}
                              <div className="border-t pt-4">
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Delivery:</span>
                                    <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span>${selectedOrder.tax.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-base pt-1 border-t">
                                    <span>Total:</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Special Instructions */}
                              {selectedOrder.notes && (
                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-1">Special Instructions:</h4>
                                  <p className="text-sm text-gray-600">{selectedOrder.notes}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Select 
                        value={order.status} 
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map(status => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 py-4">No orders found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;

