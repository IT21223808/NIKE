"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log("CartContext addToCart:", { id: item.id, name: item.name });
    if (!item.id) {
      console.error("Item missing id, generating temporary id", item);
      item.id = Date.now().toString();
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // Clear cart from localStorage
  };

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount, isLoading, setIsLoading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

// Custom wrapper for react-toastify
const AnimatedToastContent = ({ children, ...props }) => {
  const { closeToast, toastProps, isPaused, ...validProps } = props;
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      {...validProps}
    >
      {children}
    </motion.div>
  );
};

// Product data (mock for now)
const products = [
  { name: "Nike Air Zoom", price: "$129.99", image: "/new/bag.avif" },
  { name: "LeBron XIX", price: "$179.99", image: "/new/ball.avif" },
  { name: "Nike Pegasus", price: "$139.99", image: "/new/cap.avif" },
  { name: "LeBron XIX", price: "$179.99", image: "/new/sockes.avif" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3, ease: "easeOut" } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3, ease: "easeOut" } },
};
const buttonVariants = {
  initial: { scale: 1 },
  click: { scale: [1, 1.1, 1], transition: { duration: 0.3, ease: "easeOut" } },
  hover: { rotate: 10, transition: { duration: 0.2, ease: "easeOut" } },
};
const spinnerVariants = {
  animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: "linear" } },
};

export function ProductSection({ products: propProducts }) {
  const [isLoading, setIsLoading] = useState(false);

  const { addToCart, setIsLoading: setGlobalLoading } = useCart() || { addToCart: () => {}, setIsLoading: () => {} };

  const productsToDisplay = propProducts?.length > 0 ? propProducts : products;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleAddToCart = async (product) => {
    setIsLoading(true);
    setGlobalLoading(true);
    try {
      const price = parseFloat(product.price.replace("$", ""));
      const response = await axios.post(`${API_URL}/api/cart/add`, {
        name: product.name,
        price,
        quantity: 1,
        image: product.image,
      });
      if (response.data.success) {
        addToCart({ ...product, id: Date.now(), price });
        toast.success(
          <AnimatedToastContent>{response.data.message || "Product added to cart!"}</AnimatedToastContent>,
          { position: "top-center" }
        );
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        <AnimatedToastContent>Failed to add product to cart</AnimatedToastContent>,
        { position: "top-center" }
      );
    }
    setIsLoading(false);
    setGlobalLoading(false);
  };

  return (
    <motion.section
      id="new"
      className="py-12 bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl text-gray-700 font-semibold">Featured Products</h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {productsToDisplay.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={192}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            </motion.div>
            <div className="flex justify-between items-center w-full mb-4">
              <motion.h3
                className="text-xl text-gray-500 font-semibold"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {product.name}
              </motion.h3>
              <motion.p
                className="text-lg text-gray-500"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {product.price}
              </motion.p>
              <motion.button
                onClick={() => handleAddToCart(product)}
                className={`p-2 bg-black text-white rounded-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                variants={buttonVariants}
                initial="initial"
                animate="initial"
                whileTap="click"
                whileHover="hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                    variants={spinnerVariants}
                    animate="animate"
                  />
                ) : (
                  <FaShoppingCart className="text-xl" />
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}