import { FaStethoscope, FaPills, FaCapsules, FaFirstAid, FaFileMedical } from 'react-icons/fa';
import { MdOutlineAssistant } from 'react-icons/md';

const ServicesSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-8 py-[70px] bg-gray-100 -mt-20 absolute left-1 right-1 border-t-2 rounded-t-xl z-10 shadow-lg mb-20">

      {/* Left Side - Text and Button */}
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center md:text-starttablet:text-center text-primary">Professional Care for Everyone</h2>
        <p className="text-gray-600 mb-6 text-center md:text-center tablet:w-[95%] md:w-[85%]">
          A tech-enabled healthcare solution where patients can meet with doctors online using peer-to-peer medical e-specialists.
        </p>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary w-full md:w-2/3 hidden tablet:mx-[40px] tablet:w-2/3 md:block mx-[150px] custom-mini:mx-[20px] ">
          Sign Up Now
        </button>
      </div>

      {/* Right Side - Icons and Labels */}
      <div className="md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 md:mt-0">
        <div className="flex flex-col items-center">
          <FaStethoscope className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">E-Specialist Diagnostic</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPills className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">Online <br className='custom-xs:block custom-sm:hidden md:hidden '/>Medication</p>
        </div>
        <div className="flex flex-col items-center">
          <MdOutlineAssistant className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">E-Medical AI Assistant</p>
        </div>
        <div className="flex flex-col items-center">
          <FaFirstAid className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">E-Emergency Response</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCapsules className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">Online Prescribed Delivery</p>
        </div>
        <div className="flex flex-col items-center">
          <FaFileMedical className="text-5xl text-primary mb-2" />
          <p className="text-gray-700 text-center">Electronic Health Record</p>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
