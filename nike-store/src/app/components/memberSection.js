// MemberSection.js

import React, { useState } from "react";
import { useSubscription } from "../context/subcriptionContext"; // Correct the import path
import { toast } from "react-toastify";
import axios from "axios";

export default function MemberSection() {
  const { subscribe } = useSubscription();  // Destructure the subscribe function from context
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    if (!trimmedEmail || !trimmedName) {
      toast.error("Please provide both a valid email and name.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Submitting:", { email: trimmedEmail, name: trimmedName });
      // Here you can integrate an API call or simulate the subscription
      subscribe(trimmedEmail, trimmedName); // Call the subscribe function from context

      toast.success("Subscription successful!");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="py-12 bg-[#7f6609] text-white">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div>
              <h2 className="text-2xl font-semibold font-mono mb-2">Nike Plus Member Exclusive</h2>
              <p className="text-sm text-gray-300 mb-2">Special Offer | Limited Time</p>
              <p className="text-lg">Unlock rewards and early access with Nike Plus membership</p>
            </div>
          </div>
          <div>
            <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-700">
              Join Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white text-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h3 className="text-3xl font-mono font-bold mb-4">Stay Updated with Nike</h3>
            <p className="text-lg mb-6">Sign up for our newsletter to receive exclusive offers</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 rounded-md w-full border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">We respect your privacy</p>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="p-3 rounded-md w-full border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-700 w-fit"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
          </div>

          <div className="lg:w-1/3">
            <img
              src="/img.jpg"
              alt="Nike Apparel"
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
