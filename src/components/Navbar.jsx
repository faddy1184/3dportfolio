import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants/index';
import { menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX}  w-full flex items-center py-5 absolute top-0 z-20 `}>
      <div className=' w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src="logo.svg" alt="logo" className='w-12 h-12 object-contain border-5 rounded-full' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            Faddy &nbsp;<span className='sm:block hidden'>| Developer</span>
          </p>
        </Link>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt="menu"
            className='w-[24px] h-[24px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden':'flex'}p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-0 rounded-xl `} ></div>
        </div>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-gray-500"
              }`}
            >
              <a
                href={`#${link.id}`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(false); // Close the mobile menu when a link is clicked
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className={`absolute top-14 right-5 ${toggle ? 'block' : 'hidden'} sm:hidden`}>
          <ul className='list-none flex flex-col items-center'>
            {navLinks.map((link) => (
              <li key={link.id} className={`py-2 ${active === link.title ? "text-white" : "text-gray-500"}`}>
                <a
                  href={`#${link.id}`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(false); // Close the mobile menu when a link is clicked
                  }}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
