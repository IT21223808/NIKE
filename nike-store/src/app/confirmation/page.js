'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  const handleProceedToDelivery = () => {
    router.push(`/delivery?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">Order Confirmation</h1>
        <p className="text-gray-500 mb-4">
          Thank you for your order! Your order ID is <strong>{orderId || 'Not provided'}</strong>.
        </p>
        <p className="text-gray-500 mb-4">You will receive a confirmation email shortly.</p>
        <button
          onClick={handleProceedToDelivery}
          className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500"
        >
          Proceed to Delivery
        </button>
        <div className="mt-4">
          <Link href="/">
            <span className="text-blue-500 hover:underline">Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}