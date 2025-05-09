import React from 'react';
import { motion } from 'framer-motion';

// Variants for section
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Variants for title
const titleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
  },
};

// Variants for grid container
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

// Variants for category cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', type: 'spring', stiffness: 100 },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Variants for text overlay
const textOverlayVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.3, ease: 'easeOut' },
  },
  hover: {
    opacity: 0.9,
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const Category = () => {
  return (
    <motion.section
      id="other-products"
      className="py-12 bg-[#423e2f]"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold text-center text-white mb-8"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Other Products
        </motion.h2>
        
        {/* Grid layout - 2x2 grid for larger images */}
        <motion.div
          className="grid grid-cols-2 gap-8 text-white"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Clothes Category */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.img
              src="/other/cloths.avif"
              alt="Clothes"
              className="w-full h-96 object-cover rounded-lg"
              variants={cardVariants}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-4 rounded-b-lg"
              variants={textOverlayVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <span className="text-xl font-bold">Clothes</span>
            </motion.div>
          </motion.div>

          {/* Shoe Category */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.img
              src="/other/shoe.avif"
              alt="Shoe"
              className="w-full h-96 object-cover rounded-lg"
              variants={cardVariants}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-4 rounded-b-lg"
              variants={textOverlayVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <span className="text-xl font-bold">Shoe</span>
            </motion.div>
          </motion.div>

          {/* Accessories Category */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.img
              src="/other/oth3.avif"
              alt="Accessories"
              className="w-full h-96 object-cover rounded-lg"
              variants={cardVariants}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-4 rounded-b-lg"
              variants={textOverlayVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <span className="text-xl font-bold">Accessories</span>
            </motion.div>
          </motion.div>

          {/* Sports Category */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.img
              src="/other/accessories.avif"
              alt="Sports"
              className="w-full h-96 object-cover rounded-lg"
              variants={cardVariants}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-4 rounded-b-lg"
              variants={textOverlayVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <span className="text-xl font-bold">Sports</span>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
};

export default Category;