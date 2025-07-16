import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io5";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // To get the current path
import { NAMES } from "./Constants";

const NavBar = ({  textColor,className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  // const location = useLocation(); // Get the current path

  // Define logo and logoWhite from Constants
  // const logoWhite = NAMES.LOGOWHITE;
  const logo = NAMES.LOGO;

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50); // Adjust the value as needed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine if we're on the home page
  // const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Menu Bar */}
      <nav
        className={`p-6 md:py-4 bg-white text-primary shadow-xl flex justify-between items-center w-full z-10 fixed top-0 left-0 transition-all duration-300 rounded-b-lg ${className}`}>
        <div className="flex items-center space-x-8 custom-sm:space-x-0">
          <a href="/">
          <img src={logo}
              alt="Logo"
              className="w-3/4 h-6 sm:h-8 sm:mr-[150px] custom-sm:mr-5"
            />
          </a>
          <div className="hidden lg:flex items-center space-x-6 custom-sm:space-x-0">
            <a
              href="/about"
              className={`p-2 lg:px-7 rounded-xl hover:bg-secondary hover:text-white ${
                scrolled ? "text-primary" : `${textColor}`
              }`}
            >
              About Us
            </a>
            <a
              href="/contact"
              className={`p-2 lg:px-7 rounded-xl hover:bg-secondary hover:text-white ${
                scrolled ? "text-primary" : `${textColor}`
              }`}
            >
              Contact Us
            </a>
            <a
              href="/services"
              className={`p-2 lg:px-7 rounded-xl hover:bg-secondary hover:text-white ${
                scrolled ? "text-primary" : `${textColor}`
              }`}
            >
              Services
            </a>
            <a
              href="/testimonal"
              className={`p-2 lg:px-7 rounded-xl hover:bg-secondary capitalize hover:text-white ${
                scrolled ? "text-primary" : `${textColor}`
              }`}
            >
             testimonals
            </a>
          </div>
        </div>

        <div className="lg:hidden flex space-x-8">
          <div className="flex border-2 rounded-xl my-auto px-2 py-1 custom-xs:ml-8">
            <IoLogoApple size={25} className="mr-1" />
            <FaGooglePlay size={22} className="mt-[2px]" />
          </div>
          <button
            onClick={toggleMenu}
            className={`focus:outline-none ${
              scrolled ? "text-primary" : `${textColor}`
            }`}
          >
            {menuOpen ? (
              <IoMdClose className="text-2xl bg-white text-primary rounded-full p-1" />
            ) : (
              <MdMenuOpen className="-mt-1" size={33} />
            )}
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
        <Link
      to={'./auth-register'}
      className={`p-2 rounded-xl hover:bg-secondary hover:text-white capitalize ${scrolled ? "text-primary" : `${textColor}`}`}
      onMouseEnter={() => setHovered(true)}  
      onMouseLeave={() => setHovered(false)}  
    >
      {hovered ? 'Register either as a Doctor or as an Institution' : 'Partner With Us'}
    </Link>
          <Link to={'./register'}>
          <button
            className={`bg-secondary border-primary text-primary border-2 px-4 py-2 rounded-lg shadow hover:bg-secondary hover:text-white hover:border-2  ${
              scrolled
                ? "bg-primary text-white hover:bg-white hover:text-primary"
                : "bg-white text-primary"
            }`}
          >
            Get Started
          </button>
          </Link>
          <Link to={'./auth-login'}
            className={`p-2 rounded-xl hover:bg-secondary hover:text-white ${
              scrolled ? "text-primary" : `${textColor}`
            }`}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } tablet:hidden bg-white text-primary p-6 absolute top-0 left-0 w-full h-screen`}
        >
          <div className="flex justify-between items-center mb-6 -mt-3">
            <a href="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-6" />
            </a>
            <button
              onClick={toggleMenu}
              className="text-primary focus:outline-none"
            >
              <IoMdClose
                className="font-bold text-2xl bg-white text-primary rounded-full p-1"
                size={35}
              />
            </button>
          </div>

          <div className="space-y-4">
            <a
              href="/about"
              className="block hover:bg-white hover:text-primary p-2 py-3  border-b-2"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="block hover:bg-white hover:text-primary p-2  border-b-2"
            >
              Contact Us
            </a>
            <a
              href="#services"
              className="block hover:bg-white hover:text-primary p-2  border-b-2"
            >
              Services
            </a>
            <div className="tablet:flex">
              <a
                href="/auth-register"
                className="block hover:bg-white hover:text-primary p-2 rounded-xl border-2 text-center border-gray-400 mt-6"
              >
                Partner With Us
              </a>
              <a
                className="block w-full bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-gray-200 text-center my-4"
                href="/register"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="block hover:bg-white hover:text-primary p-2 rounded-xl border-2 text-center border-gray-400 mt-6 sm:my-4"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Validate the other props
NavBar.propTypes = {
  navBgColor: PropTypes.string.isRequired, 
  textColor: PropTypes.string.isRequired,  
  className: PropTypes.string.isRequired, 
};

export default NavBar;
