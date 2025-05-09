"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    deliveryMethod: "standard",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/confirmation?orderId=${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Personal Details */}
        <div className="mb-4 text-gray-400">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Personal Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border text-gray-500 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Delivery Method */}
        <div className="mb-4 text-gray-400">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Delivery Method</h2>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="standard">Standard Shipping ($5)</option>
            <option value="express">Express Shipping ($15)</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="mb-4 text-gray-400">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Payment Method</h2>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="credit-card">Credit/Debit Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {/* Payment Details */}
        {formData.paymentMethod === "credit-card" && (
          <div className="mb-4 text-gray-400">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Credit/Debit Card Details</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        {formData.paymentMethod === "cod" && (
          <div className="mb-4 text-gray-400">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Cash on Delivery</h2>
            <p className="text-gray-500">You will pay the delivery person upon receiving your order.</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}