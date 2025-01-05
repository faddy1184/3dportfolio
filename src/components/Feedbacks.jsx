import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }} // Set initial state for animation
    whileInView={{
      opacity: 1,
      y: 0, // Animate back to the original position
      transition: { type: "spring", stiffness: 100, damping: 25, delay: index * 0.5 },
    }}
    viewport={{ once: false }} // Ensure the animation triggers every time the element enters the viewport
    className="bg-slate-950 p-10 rounded-3xl xs:w-full w-[300px]"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div>
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="-mt-20 bg-slate-800 rounded-[20px]">
      {/* Centering the content vertically and horizontally */}
      <div className={`bg-slate-700 rounded-2xl ${styles.padding} min-h-[280px] flex flex-col justify-center`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      {/* Container for testimonial cards */}
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap justify-center gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
