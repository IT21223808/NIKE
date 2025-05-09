"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function DeliveryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart and redirect to homepage after a short delay
    const timer = setTimeout(() => {
      clearCart(); // Clear the cart after delivery confirmation
      router.push("/"); // Redirect to homepage
    }, 2000); // 2-second delay to show the confirmation message

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [clearCart, router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Delivery Confirmation</h1>
        <p className="text-gray-500 mb-4">
          The delivery of your order (ID: <strong>{orderId}</strong>) will be arranged shortly.
        </p>
        <p className="text-gray-500 mb-4">
          You will be notified with the tracking details soon. Redirecting to homepage...
        </p>
      </div>
    </div>
  );
}