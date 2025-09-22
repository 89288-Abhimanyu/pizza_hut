package com.pizzahut.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pizzahut.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
