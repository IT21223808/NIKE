"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Variants for section animation
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Variants for text animation (h1 - character-by-character)
const textVariantsH1 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", type: "spring", bounce: 0.4 },
  },
};

// Variants for paragraph animation (word-by-word)
const textVariantsP = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Variants for button animation
const buttonVariants = {
  initial: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", type: "spring", stiffness: 200 },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0px 0px 10px rgba(234, 179, 8, 0.6)", // Yellow glow
    transition: {
      scale: { duration: 0.3 },
      boxShadow: { repeat: Infinity, repeatType: "reverse", duration: 0.5 },
    },
  },
  click: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

// Variants for image animation
const imageVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Helper component to split text into characters
const AnimatedText = ({ text, variants, className }) => {
  return (
    <motion.span variants={variants} initial="hidden" animate="visible">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Helper component to split text into words
const AnimatedParagraph = ({ text, variants, className }) => {
  return (
    <motion.p className={className} variants={variants} initial="hidden" animate="visible">
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "0.25rem" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default function Hero() {
  return (
    <motion.section
      className="relative pt-30 w-full h-[80vh] bg-gradient-to-r from-black to-yellow-400 text-white flex items-center"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      transition={{ once: true }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Left Side: Text */}
        <motion.div className="w-1/2">
          <motion.h1 className="text-5xl font-bold mb-4" variants={textVariantsH1}>
            <AnimatedText text="Discover the Latest Collections" />
          </motion.h1>
          <AnimatedParagraph
            text="Upgrade your style with innovative designs and premium quality"
            variants={textVariantsP}
            className="text-xl mb-6"
          />
          <motion.button
            className="px-8 py-3 bg-yellow-500 text-white rounded-full"
            variants={buttonVariants}
            initial="initial"
            animate="visible"
            whileHover="hover"
            whileTap="click"
          >
            Shop Now
          </motion.button>
        </motion.div>
        {/* Right Side: Image */}
        <motion.div className="w-1/2">
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            transition={{ once: true }}
          >
            <Image
              className="w-full h-[70vh] object-contain"
              src="/nike.png"
              alt="Nike Shoe"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}