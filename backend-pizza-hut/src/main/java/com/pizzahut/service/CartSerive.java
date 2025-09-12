package com.pizzahut.service;

import com.pizzahut.Exception.CartException;
import com.pizzahut.Exception.CartItemException;
import com.pizzahut.Exception.FoodException;
import com.pizzahut.Exception.UserException;
import com.pizzahut.model.Cart;
import com.pizzahut.model.CartItem;
import com.pizzahut.model.Food;
import com.pizzahut.model.User;
import com.pizzahut.request.AddCartItemRequest;
import com.pizzahut.request.UpdateCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
