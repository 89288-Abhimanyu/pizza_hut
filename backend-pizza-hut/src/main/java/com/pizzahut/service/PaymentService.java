package com.pizzahut.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.pizzahut.model.Order;
import com.pizzahut.model.PaymentResponse;
import com.pizzahut.model.User;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;
	PaymentResponse createRazorpayPaymentLink(Order order) throws RazorpayException;
}