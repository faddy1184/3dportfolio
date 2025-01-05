import React from "react";
import { motion } from "framer-motion"; // Importing framer-motion for animation

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state (invisible)
      whileInView={{ opacity: 1 }} // Animation when it comes into view
      transition={{ duration: 1 }} // Duration of the animation
      className="footer"
    >
      <div className="text-center py-3 text-white">
        <p>faddysportfolio.com | All rights reserved</p>
        
        {/* Additional link */}
        <div className="mt-4">
          <a
            href="https://github.com/faddy1184" // Example GitHub link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 "
          >
            Visit My GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
