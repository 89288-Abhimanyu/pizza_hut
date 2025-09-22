package com.pizzahut.service;

import java.util.List;

import com.pizzahut.Exception.FoodException;
import com.pizzahut.Exception.RestaurantException;
import com.pizzahut.model.Category;
import com.pizzahut.model.Food;
import com.pizzahut.model.Restaurant;
import com.pizzahut.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest req,Category category,
						   Restaurant restaurant) throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;
	
	public List<Food> getRestaurantsFood(Long restaurantId,
			boolean isVegetarian, boolean isNonveg, boolean isSeasonal,String foodCategory) throws FoodException;
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
