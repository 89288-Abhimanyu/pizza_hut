package com.pizzahut.service;

import java.util.List;

import com.pizzahut.Exception.FoodException;
import com.pizzahut.Exception.RestaurantException;
import com.pizzahut.model.IngredientCategory;
import com.pizzahut.model.IngredientsItem;
import com.pizzahut.model.Food;
import com.pizzahut.repository.IngredientsCategoryRepository;

public interface IngredientsService {
	
	public IngredientCategory createIngredientsCategory(
			String name,Long restaurantId) throws RestaurantException;

	public IngredientCategory findIngredientsCategoryById(Long id) throws Exception;

	public List<IngredientCategory> findIngredientsCategoryByRestaurantId(Long id) throws Exception;
	
	public List<IngredientsItem> findRestaurantsIngredients(
			Long restaurantId);

	
	public IngredientsItem createIngredientsItem(Long restaurantId, 
			String ingredientName,Long ingredientCategoryId) throws Exception;

	public IngredientsItem updateStoke(Long id) throws Exception;
	
}
