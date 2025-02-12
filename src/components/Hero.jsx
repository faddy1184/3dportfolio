import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import heroBg from '../assets/herobg.png'; // Adjust the path based on your directory structure

const Hero = () => {
  return (
    <section
      className='relative w-full h-screen mx-auto'
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
    >
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[rgb(138,0,251)]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className='text-[rgb(138,0,251)]'>Faddy</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user<br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>
      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-3 w-full flex justify-center items-center'>
        <a href="#about">
          <div className='w-[30px] h-[54px] rounded-3xl border-4 border-white flex justify-center items-start p-1'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-3 h-3 rounded-full bg-white' 
            />
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
