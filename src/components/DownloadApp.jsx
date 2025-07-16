import { FaSearch } from "react-icons/fa";
import { NAMES,IMAGE} from "./Constants";
import { GrApple, GrSchedule } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { MdVerified } from "react-icons/md";

const DownloadApp = () => {
  const siteName= NAMES.SITE_TITLE
  return (
    <div className="bg-gray-50 py-10">
      {/* First Section: Download {siteName} */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-8 mt-9">
    {/* Images */}
    <div className="lg:w-[45%] block h-[464px] -mt-2 md:mt-5">
    <div className="flex justify-center items-center w-full -mt-4 md:-mt-6 lg:mt-[70px] ml-4">
    <p className="flex uppercase text-2xl md:text-4xl text-primary font-bold text-center mx-auto">
        HOW {siteName} WORKS
    </p>
</div>


        <p className="text-lg text-gray-700 mb-6 mt-6 text-center lg:text-start">
            Introducing {siteName}, your dedicated online telemedicine platform designed to prioritize your health and wellbeing. With a user-centered approach, our platform offers a seamless 4-step booking process, ensuring that taking care of your health is both convenient and effective.
        </p>
        <button className=" flex px-6 py-3 bg-primary text-white font-semibold rounded-md mx-[50px] md:mx-auto">
            Book Now on {siteName}
        </button>
    </div>
    
    {/* Text Content */}
    <div className="md:w-3/4 mt-4 lg:-mt-9 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-6  md:-mt-[200px]">
    {/* First Item */}
    <div className="flex space-x-4 border-4 border-gray-300 p-6 lg:px-9 justify-center">
        <FaSearch size={40} className="text-primary" />
        <div>
            <h3 className="uppercase font-bold text-primary">Search for an e-doctor</h3>
            <p>Find an e-specialist who is right for you based on your needs and preferences.</p>
        </div>
    </div>

    {/* Second Item */}
    <div className="flex space-x-4 border-4 border-gray-300 p-6 justify-center">
        <GrSchedule size={70} className="text-primary -mt-4" />
        <div>
            <h3 className="uppercase font-bold text-primary">Schedule date and time</h3>
            <p>Select a date and time convenient for you within the green tags and make payment.</p>
        </div>
    </div>

    {/* Third Item */}
    <div className="flex space-x-4 border-4 border-gray-300 p-6 justify-center">
        <FaUserDoctor size={70} className="text-primary -mt-4" />
        <div>
            <h3 className="uppercase font-bold text-primary">Speak with a doctor</h3>
            <p>Once the e-doctor confirms your appointment, start the conversation once your dat and time reaches.</p>
        </div>
    </div>

    {/* Fourth Item */}
    <div className="flex space-x-4 border-4 border-gray-300 p-6 justify-center">
        <GiMedicines size={70} className="text-primary -mt-4" />
        <div>
            <h3 className="uppercase font-bold text-primary">Get prescriptions</h3>
            <p>Take your prescribed e-medication as a QR code/code to any nearby pharmacy registered with {siteName}.</p>
        </div>
    </div>
</div>


</div>


      {/* download app */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8 mt-[80px]">
  {/* Images */}
  <div className="lg:w-[45%] hidden lg:block h-[440px] bg-primary rounded-r-[335px] relative">
    <img
      src={NAMES.appOne}
      alt="phone"
      className="absolute right-[4rem] z-3 -top-10" // Adjust right position
    />
    <img
      src={NAMES.appTwo}
      alt="phone"
      className="absolute right-[18rem] -top-28" // Adjust right position
    />
  </div>

  {/* Text Content */}
  <div className="lg:w-1/2 mt-2 lg:mt-0  text-center  text-primary md:mt-[70px] ">
    <h2 className="text-2xl md:text-4xl font-bold mb-4">
      Download {siteName} to start getting expert treatment
    </h2>
    <p className="text-lg text-gray-700 mb-6">
      {siteName} is and E-Healthcare services solution that 
      provides easy access to quality healthcare services.
    </p>
    <p className="text-lg text-gray-700 mb-6">
      Our pilot application is a e-doctor-on-demand application that connects e-patients to 
      licensed medical e-professionals in real-time who can consult, recommend tests, 
      diagnose, prescribe medications, and address a wide variety of health issues.
    </p>
    {/* App Download Buttons */}
    <div className="flex md:justify-center space-x-6 lg:justify-start md:space-x-[40px]   sm:space-x-4 md:mt-3 mx-auto lg:ml-[80px]">

        
  <a 
    href={NAMES.GOOGLEDOWNLOAD} 
    target="_blank" 
    rel="noreferrer" 
    className="flex items-center space-x-1 sm:space-x-3 border-2 p-1 sm:p-3 rounded-xl border-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300"
  >
    <img 
      src={IMAGE.GOOGLEDOWNLOAD}
      alt="Google Play" 
      className="w-4 sm:w-10"
    />
    <div className="text-left">
      <p className="text-xs sm:text-sm group-hover:text-white uppercase">Get it on</p>
      <p className="font-bold group-hover:text-white text-lg sm:text-xl">Google Play</p>
    </div>
  </a>

  <a 
    href={NAMES.APPLEDOWNLOAD} 
    target="_blank" 
    rel="noreferrer" 
    className="flex items-center space-x-2 sm:space-x-3 border-2 p-1 sm:p-3 rounded-xl border-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-300"
  >
    <GrApple size={22} className="sm:w-10" />
    <div className="text-left">
      <p className="text-xs sm:text-sm group-hover:text-white uppercase">Available on the</p>
      <p className="font-bold group-hover:text-white text-lg sm:text-xl">App Store</p>
    </div>
  </a>
</div>

  </div>
</div>







{/* Second Section: Become a Specialist */}
<div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-8 mt-20 lg:mt-[350px] lg:mb-[130px]">
  {/* Text Content */}
  <div className="md:w-1/2 text-center md:text-left lg:relative -pt-8 lg:-translate-y-[100px] lg ">
    <h2 className="uppercase text-2xl md:text-2xl text-primary font-bold text-center lg:text-start mx-auto">
      Become a Specialist on {siteName}
    </h2>
    <ul className="text-md md:text-lg text-gray-700 mb-6 space-y-4 mt-8">
      <li className="flex items-center space-x-2">
        <MdVerified className="text-secondary" />
        <span>Attend to aligned e-patients</span>
      </li>
      <li className="flex items-center space-x-2">
        <MdVerified className="text-secondary" />
        <span>Write e-medical reports</span>
      </li>
      <li className="flex text-start lg:items-center space-x-2">
        <MdVerified className="text-secondary" />
        <span>Give medical advice to e-patients</span>
      </li>
      <li className="flex items-center space-x-2">
        <MdVerified className="text-secondary" />
        <span>Prescribe e-medicine</span>
      </li>
      <li className="flex text-start items-center space-x-2">
        <MdVerified className="text-secondary" />
        <span>Make money on every e-consultation</span>
      </li>
    </ul>
    <button className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-secondary">
     Partner with us on {siteName}
    </button>
  </div>

  {/* Image Section with background image */}
  <div className="lg:w-[896px] relative lg:top-16 lg:right-16 right-5 left-5 self-end px-5 mx-auto hidden lg:block">
    {/* First Image */}
    <img 
      src={IMAGE.LOGO}
      alt="doctor" 
      className="lg:absolute lg:bottom-0 lg:right-0" 
    />

    {/* Second Image */}
    <img 
      src="https://www.elixdoc.com/images/Doc-2-image.png" 
      alt="doctor" 
      className="absolute -bottom-4 lg:left-10 -left-8 h-[40dvh] lg:h-auto" 
    />

    {/* Third Image */}
    {/* <img 
      src="/images/Doc-3-image.png" 
      alt="doctor" 
      className="absolute -bottom-9 lg:right-44 left-16 lg:left-auto h-[45dvh] lg:h-auto" 
    /> */}

    {/* Fourth Image */}
    <img 
      src="https://www.elixdoc.com/images/Doc-1-image.png" 
      alt="doctor" 
      className="absolute -bottom-10  lg:-right-12 h-[40dvh] left-[11rem] lg:left-auto lg:h-auto" 
    />
  </div>
</div>



    </div>
  );
};

export default DownloadApp;
