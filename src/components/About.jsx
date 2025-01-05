import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import '../index.css'; // Import your CSS file

import { styles } from "../styles";
import { services } from "../constants"; // Ensure this is correctly defined
import { SectionWrapper } from "../hoc"; // Ensure this is correctly defined
import { fadeIn, textVariant } from "../utils/motion"; // Ensure this is correctly defined

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="w-full">
    <motion.div
      initial={{ opacity: 0, x: 50 }} // Initial state when not in view
      whileInView={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200, damping: 20, delay: index * 0.5 },
      }}
      whileHover={{ scale: 1.05 }} // Optional: add hover effect
      viewport={{ once: false }} // Ensures the animation triggers every time the element enters the viewport
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-violet-950 rounded-[20px] py-5 px-4 h-[280px] flex flex-col justify-center items-center text-center"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-24 h-24 object-contain" // Bigger icon
        />
        <h3 className="text-white text-[24px] font-bold">{title}</h3> {/* Larger text */}
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className='mt-10 flex flex-wrap justify-center  items-center gap-10'>
        {services.map((service, index) => (
          <div className='flex-wrap w-[45%] items-center md:w-[22.5%]' key={service.title}> {/* 2 cards per row on small screens, adjust on larger screens */}
            <ServiceCard index={index} {...service} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
