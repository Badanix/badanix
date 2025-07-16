import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaGooglePlay } from 'react-icons/fa';
import { NAMES } from './Constants';
import { IoLogoApple } from 'react-icons/io5';

const Footer = () => {
  const  siteName= NAMES.SITE_TITLE
    const logo =NAMES.LOGO
    const facebook =NAMES.FACEBOOK
    const instagram =NAMES.INSTAGRAM
    const twitter =NAMES.TWITTER
    const mail =NAMES.MAIL
    const phoneNumber =NAMES.phoneNumber

  const currentYear = new Date().getFullYear()
  return (
    <>
      {/* Footer Section */}
      <footer className="bg-white  py-12 overflow-x-hidden">
        <div className="container mx-auto px-4">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className='text-center '>
              <img src={logo} alt={siteName} className="h-12 mb-4" />
             
              <p className="text-sm">
                Building innovative solutions for a healthier future. We prioritize care and quality.
              </p>
              {/* <p className="mb-2">123 Healthcare Lane,</p>
                <p className="mb-2">City, State, ZIP Code</p>
                <p>Country</p> */}
         <div  className="flex space-x-5  justify-center mt-4 lg:justify-start ">
          
          <button className="bg-white text-primary px-4 lg:px-2 py-2 rounded-lg flex items-center shadow-lg tablet:mx-2 font-bold font-serif">
            <FaGooglePlay className="w-3  h-6 mr-2 text-primary  lg:w-6" />
            <span>Google Play</span>
          </button>
          <button className="bg-white text-primary px-4 py-2 rounded-lg flex items-center shadow-lg font-bold font-serif">
            <IoLogoApple className="w-6  h-6 mr-2 text-primary" />
            <span>App Store</span>
          </button>
        </div>
            </div>

            {/* Contact Us and Quick Links - Always on the Same Line */}
            <div className="flex flex-row gap-8 w-full mx-7">
              {/* Contact Us */}
              <div className="w-1/2">
                <h3 className="text-lg font-bold  mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
                  <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                
                </ul>
              </div>

              {/* Quick Links */}
              <div className="w-1/2">
                <h3 className="text-lg font-bold  mb-4">Useful Links</h3>
                <ul className="space-y-2">
                  <li><a href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                  <li><a href="/terms" className="hover:text-primary transition-colors">Terms and Conditions</a></li>
                
                  <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="/testimonal" className="hover:text-primary transition-colors">Testimonals</a></li>

                </ul>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-bold  mb-4 text-center lg:text-start">Stay Updated</h3>
              <p className="mb-4 text-sm">Sign up for our newsletter for the latest updates and offers.</p>
              <form>
              <input
  type="email"
  placeholder="Enter your email"
  className="w-full px-4 py-2 mb-4 text-gray-900 rounded-md border-2 border-primary"
/>

                <button className="w-full bg-secondary hover:bg-primary  py-2 rounded-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom Text */}
          <div className="text-center mt-12 text-sm">
            <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Social Menu */}
      <div className="fixed bottom-0 left-1 right-1 bg-secondary py-3 shadow-lg z-50 rounded-t-2xl">
        <div className="container mx-auto flex justify-around md:justify-center space-x-6  text-white md:space-x-12 ">
          {/* Social Media and Contact Icons */}
          <a href={facebook} target="_blank" rel="noopener noreferrer" className=" hover:text-blue-500 transition">
            <FaFacebook size="24" />
          </a>
          <a href={twitter} target="_blank" rel="noopener noreferrer" className=" hover:text-blue-400 transition">
            <FaTwitter size="24" />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className=" hover:text-pink-400 transition">
            <FaInstagram size="24" />
          </a>
          <a href={`mailto:${mail}`} className=" hover:text-yellow-500 transition">
            <FaEnvelope size="24" />
          </a>
          <a href={`tel:${phoneNumber}`} className=" hover:text-green-500 transition">
            <FaPhoneAlt size="24" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
