package com.pizzahut.service;

import java.util.List;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.pizzahut.Exception.CartException;
import com.pizzahut.Exception.OrderException;
import com.pizzahut.Exception.RestaurantException;
import com.pizzahut.Exception.UserException;
import com.pizzahut.model.Order;
import com.pizzahut.model.PaymentResponse;
import com.pizzahut.model.User;
import com.pizzahut.request.CreateOrderRequest;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException, RazorpayException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
