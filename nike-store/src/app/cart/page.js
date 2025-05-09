// CartPage.jsx
"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Log cart items for debugging
  console.log("Cart items:", cart);

  // Calculate total amount
  const totalAmount = cart
    .reduce((total, item) => {
      const price = typeof item.price === "string" ? parseFloat(item.price.replace("$", "")) : item.price || 0;
      return total + price * (item.quantity || 1);
    }, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold text-black mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-md mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-base font-medium text-black">{item.name}</h3>
                  <p className="text-sm text-black">
                    ${(typeof item.price === "string" ? parseFloat(item.price) : item.price || 0).toFixed(2)} x {item.quantity || 1}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log("Removing item with id:", item.id);
                  removeFromCart(item.id);
                  toast.info("Item removed from cart");
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Total: ${totalAmount}
            </h2>
            <Link href="/checkout">
              <button className="w-full bg-yellow-400 text-black py-3 text-sm font-medium uppercase tracking-wide hover:bg-yellow-500">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}