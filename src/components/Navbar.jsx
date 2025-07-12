import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { animateScroll as scroll, scroller } from "react-scroll";
import { styles } from "../styles";
import { navLinks } from "../constants/index";
import { logo, menu, close } from "../assets";

const Navbar = ({ isAuthenticated, setIsAuthenticated, setLoginClicked }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActive(window.location.hash.substring(1));
  }, [location]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handleNavClick = (link) => {
    if (!isAuthenticated) {
      localStorage.setItem("previousPath", link.id);
      setLoginClicked(true);
      navigate("/login");
      return;
    }

    setToggle(false);
    setActive(link.id);

    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => scrollToSection(link.id), 300);
    } else {
      scrollToSection(link.id);
    }
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      smooth: "easeInOutCubic",
      offset: -70, // Adjust for fixed navbar
    });
  };

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 ${scrolled ? "bg-primary shadow-md" : "bg-transparent"}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2" onClick={() => { scroll.scrollToTop(); setActive(""); }}>
          <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full" />
          <p className="text-white text-[18px] font-bold cursor-pointer">Faddy | Developer</p>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex list-none flex-row items-center gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`text-[17px] font-medium cursor-pointer transition-all ${
                active === nav.id ? "text-white font-semibold underline decoration-white decoration-2" : "text-gray-400"
              } hover:text-white`}
              onClick={() => handleNavClick(nav)}
            >
              {nav.title}
            </li>
          ))}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-white bg-red-500 px-5 py-2 rounded-md text-[15px]">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white bg-purple-600 px-5 py-2 rounded-md text-[15px]">
              Login
            </Link>
          )}
        </ul>

        {/* Mobile Nav Toggle */}
        <div className="sm:hidden flex justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[30px] h-[30px] cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {/* Mobile Nav Menu */}
        {toggle && (
          <div className="sm:hidden fixed top-0 right-0 w-2/3 h-full bg-gray-900 p-6 z-30 shadow-lg flex flex-col">
            <button className="self-end text-white text-2xl" onClick={() => setToggle(false)}>✖</button>
            <ul className="list-none flex flex-col gap-6 mt-5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className={`text-[17px] ${
                      active === link.id ? "text-white font-semibold underline decoration-white decoration-2" : "text-gray-400"
                    } hover:text-white transition-all`}
                  >
                    {link.title}
                  </button>
                </li>
              ))}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="text-white bg-red-500 px-5 py-2 rounded-md text-[16px]">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-white bg-purple-600 px-5 py-2 rounded-md text-[16px] text-center">
                  Login
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
