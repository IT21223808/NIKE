import { motion } from 'framer-motion';

// Variants for section
const sectionVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

// Variants for title
const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.3, ease: 'easeOut', type: 'spring', bounce: 0.4 },
  },
};

// Variants for grid container
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

// Variants for story cards
const cardVariants = {
  hidden: { opacity: 0, x: -50, rotate: 5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 120 },
  },
  hover: {
    rotateX: 5,
    rotateY: 5,
    border: '2px solid #eab308', // Vibrant yellow border
    backgroundColor: '#fef3c7', // Light yellow background
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Variants for button
const buttonVariants = {
  initial: { y: 0 },
  hover: {
    y: [-2, 2, -2],
    backgroundColor: '#eab308', // Yellow for contrast
    color: '#000000',
    transition: {
      y: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
      backgroundColor: { duration: 0.3 },
    },
  },
  click: {
    scale: [1, 1.2, 1],
    backgroundColor: '#ca8a04',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Variants for text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.2, ease: 'easeOut' },
  },
  hover: {
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function InspiringStories() {
  return (
    <motion.section
      className="bg-white text-black py-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl font-semibold mb-6"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Inspiring Stories
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Overcoming Odds Card */}
          <motion.div
            className="bg-gray-200 p-6 rounded-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-xl font-bold mb-2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Overcoming Odds
            </motion.h3>
            <motion.p
              className="text-sm mb-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              New athletes talk about their success on the court
            </motion.p>
            <motion.button
              className="bg-black text-white py-2 px-6 rounded-full"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="click"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Training Secrets Card */}
          <motion.div
            className="bg-gray-200 p-6 rounded-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-xl font-bold mb-2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Training Secrets
            </motion.h3>
            <motion.p
              className="text-sm mb-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Unlock some personal tips from elite trainers
            </motion.p>
            <motion.button
              className="bg-black text-white py-2 px-6 rounded-full"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="click"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Unlock Your Potential Card */}
          <motion.div
            className="bg-gray-200 p-6 rounded-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.h3
              className="text-xl font-bold mb-2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Unlock Your Potential
            </motion.h3>
            <motion.p
              className="text-sm mb-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Discover new training methods to push yourself further
            </motion.p>
            <motion.button
              className="bg-black text-white py-2 px-6 rounded-full"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="click"
            >
              Read More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}