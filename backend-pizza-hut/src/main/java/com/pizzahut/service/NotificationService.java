package com.pizzahut.service;

import java.util.List;

import com.pizzahut.model.Notification;
import com.pizzahut.model.Order;
import com.pizzahut.model.Restaurant;
import com.pizzahut.model.User;

public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
