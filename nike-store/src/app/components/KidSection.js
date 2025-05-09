"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

// Product data with unique IDs
const kidsProducts = [
  { id: "9", name: "Nike Kids 1", price: "$79.99", image: "/kids/kid1.webp" },
  { id: "10", name: "Nike Sportswear Club", price: "$99.99", image: "/kids/kid2.avif" },
  { id: "11", name: "Nike Kids sportsware", price: "$119.99", image: "/kids/kid4.avif" },
  { id: "12", name: "Nike Kids ", price: "$110.99", image: "/kids/kid3.jpg" },
];

// Variants for staggered animation of product cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Variants for product cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Variants for product image
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

// Variants for text (name and price)
const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.3, ease: "easeOut" },
  },
};

// Variants for "Add to Cart" button
const buttonVariants = {
  initial: { scale: 1 },
  click: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { rotate: 10, transition: { duration: 0.2, ease: "easeOut" } },
};

// Variants for "View All" button
const viewAllVariants = {
  initial: { scale: 1, x: 0 },
  hover: { scale: 1.05, x: 8, transition: { duration: 0.3, ease: "easeOut" } },
};

// Variants for the "View All" arrow icon
const arrowVariants = {
  initial: { x: 0 },
  hover: {
    x: [0, 5, 0],
    transition: { repeat: Infinity, duration: 0.5, ease: "easeOut" },
  },
};

// Variants for loading spinner
const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1, ease: "linear" },
  },
};

export default function KidsSection({ onCartUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, setIsLoading: setGlobalLoading } = useCart();

  // Fallback API URL if environment variable is not set
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleAddToCart = async (product) => {
    setIsLoading(true);
    setGlobalLoading(true);
    try {
      const price = parseFloat(product.price.replace("$", ""));
      // Log the product to debug ID issues
      console.log("Adding to cart:", { id: product.id, name: product.name });
      const response = await axios.post(`${API_URL}/api/cart/add`, {
        id: product.id, // Use the unique product.id
        name: product.name,
        price,
        quantity: 1,
        image: product.image,
      });
      if (response.data.success) {
        addToCart({ ...product, price }); // Pass the entire product object
        toast.success(response.data.message || "Product added to cart!", {
          position: "top-center",
        });
        if (onCartUpdate) onCartUpdate();
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to add product to cart", { position: "top-center" });
    } finally {
      setIsLoading(false);
      setGlobalLoading(false);
    }
  };

  return (
    <motion.section
      id="kids"
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
        <h2 className="text-3xl text-black font-semibold">Kids' Collection</h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {kidsProducts.map((product) => (
          <motion.div
            key={product.id} // Use unique product.id
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
                className={`p-2 bg-black text-white rounded-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
      <motion.div
        className="flex justify-center mt-8"
        initial="initial"
        whileHover="hover"
        variants={viewAllVariants}
      >
        <button className="flex items-center text-black font-semibold">
          <span>View All</span>
          <motion.div variants={arrowVariants} initial="initial">
            <FaArrowRight className="ml-2 text-xl" />
          </motion.div>
        </button>
      </motion.div>
    </motion.section>
  );
}