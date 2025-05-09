// Navbar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for cart items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function Navbar({ onCartUpdate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, cartCount, isLoading, removeFromCart } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white text-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="Nike Logo" className="w-24" />
          </Link>
          <div className="hidden md:flex space-x-8 text-black items-center">
            <Link href="/">
              <span className="text-lg hover:text-yellow-400">Home</span>
            </Link>
            <Link href="#new">
              <span className="text-lg hover:text-yellow-400">New</span>
            </Link>
            <Link href="#mens">
              <span className="text-lg hover:text-yellow-400">Men</span>
            </Link>
            <Link href="#womens">
              <span className="text-lg hover:text-yellow-400">Women</span>
            </Link>
            <Link href="#kids">
              <span className="text-lg hover:text-yellow-400">Kids</span>
            </Link>
            <Link href="#other-products">
              <span className="text-lg hover:text-yellow-400">Other Products</span>
            </Link>
            <button onClick={toggleCart} className="relative">
              <FaShoppingCart className="text-black text-xl cursor-pointer hover:text-yellow-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleCart} className="relative">
              <FaShoppingCart className="text-black text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="md:block hidden">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 bg-gray-200 text-black rounded-full focus:outline-none"
            />
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
            <Link href="/">
              <span className="block text-lg">Home</span>
            </Link>
            <Link href="#new">
              <span className="block text-lg">New</span>
            </Link>
            <Link href="#mens">
              <span className="block text-lg">Men</span>
            </Link>
            <Link href="#womens">
              <span className="block text-lg">Women</span>
            </Link>
            <Link href="#kids">
              <span className="block text-lg">Kids</span>
            </Link>
            <Link href="#other-products">
              <span className="block text-lg">Other Products</span>
            </Link>
            <div>
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 w-full bg-gray-800 text-white rounded-full focus:outline-none"
              />
            </div>
          </div>
        )}
      </nav>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-black">Your Cart</h2>
          <button onClick={toggleCart} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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
        <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
          {isLoading ? (
            <p className="text-black">Loading cart...</p>
          ) : cart.length === 0 ? (
            <p className="text-black">Your cart is empty</p>
          ) : (
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-black">{item.name}</h3>
                      <p className="text-sm text-black">
                        ${(typeof item.price === "number" ? item.price : parseFloat(item.price)).toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
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
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        <div className="p-4 border-t">
          <Link href="/cart" onClick={toggleCart}>
            <button className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500">
              View Full Cart
            </button>
          </Link>
        </div>
      </div>
      {isCartOpen && (
        <div className="fixed inset-0 bg-opacity-10 z-40" onClick={toggleCart}></div>
      )}
    </>
  );
}