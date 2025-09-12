package com.pizzahut.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pizzahut.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
