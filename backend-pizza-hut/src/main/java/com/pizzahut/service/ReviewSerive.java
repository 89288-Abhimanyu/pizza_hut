package com.pizzahut.service;

import java.util.List;

import com.pizzahut.Exception.ReviewException;
import com.pizzahut.model.Review;
import com.pizzahut.model.User;
import com.pizzahut.request.ReviewRequest;

public interface ReviewSerive {
	
    public Review submitReview(ReviewRequest review,User user);
    public void deleteReview(Long reviewId) throws ReviewException;
    public double calculateAverageRating(List<Review> reviews);
}
