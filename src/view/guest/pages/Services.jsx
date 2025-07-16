import { useState } from 'react';
import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';
import { FaBandAid, FaPlay, FaRing } from 'react-icons/fa';
import { BsSmartwatch } from 'react-icons/bs';
import { ImMeter2 } from 'react-icons/im';
import { SiGnometerminal } from 'react-icons/si';
import { PiWaveTriangleFill } from 'react-icons/pi';

const Services = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const playVideo = () => {
      setIsVideoPlaying(true);
    };
  
    const closeVideo = () => {
      setIsVideoPlaying(false);
    };
  return (
    <div className="bg-gray-100" >
      {/* Hero Section */}
      <HeroPages 
        HeroPagesHeading="Comprehensive Healthcare Solutions" 
        HeroPagesParagraph="At BADANIX, we leverage cutting-edge digital technology to revolutionize healthcare delivery." 
        bgImageUrl='../../images/hospitalImg.png' 
      />

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white shadow-md">
        
      

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Telemedicine */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/fc407400e9.jpg" 
              alt="Telemedicine"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Telemedicine & Remote Healthcare</h3>
            <p className="text-gray-800">
              • Seamless virtual consultations with licensed healthcare professionals. <br />
              • Remote patient monitoring with real-time medical feedback. <br />
              • 24/7 access to medical advice and follow-ups from the comfort of your home.
            </p>
          </div>

          {/* Service 2: EHR Management */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/gadgets.jpg" 
              alt="EHR Management"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Electronic Health Records (EHR) Management</h3>
            <p className="text-gray-800">
              • Secure, cloud-based patient data repository accessible to both patients and healthcare providers. <br />
              • Centralized, interoperable records to ensure continuity of care across multiple providers. <br />
              • Patient-friendly access to medical history, lab results, and reports.
            </p>
          </div>

          {/* Service 3: Personalized e-Medicine */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/personalize.jpg" 
              alt="Personalized e-Medicine"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Personalized e-Medicine & Genomic Care</h3>
            <p className="text-gray-800">
              • Tailored treatment plans based on genomic and biomarker analysis. <br />
              • Precision medicine to manage chronic conditions with greater accuracy. <br />
              • Access to personalized drug regimens optimized for individual patient needs.
            </p>
          </div>

          {/* Service 4: AI-powered Diagnostics */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/aidigonistic.jpg" 
              alt="AI-powered Diagnostics"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">AI-powered Diagnostics & Wearable Support</h3>
            <p className="text-gray-800">
              • AI-driven insights and clinical decision support for enhanced diagnostic precision. <br />
              • Continuous health monitoring through integrated smart wearable devices. <br />
              • Predictive alerts for potential health risks to prevent emergencies.
            </p>
          </div>

          {/* Service 5: Online Appointment Scheduling */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/coreValue.jpg" 
              alt="Online Appointment Scheduling"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Online Appointment Scheduling & Virtual Visits</h3>
            <p className="text-gray-800">
              • Hassle-free appointment booking with automatic reminders via the app. <br />
              • Virtual check-ins and follow-ups without the need for clinic visits. <br />
              • Personalized recommendations for specialists based on patient health records.
            </p>
          </div>

          {/* Service 6: Digital Prescription Management */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/doctorstanding.webp" 
              alt="Digital Prescription Management"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Digital Prescription & Medication Management</h3>
            <p className="text-gray-800">
              • Secure electronic prescriptions available directly within the app. <br />
              • Smart medication tracking with reminders and refill notifications. <br />
              • Integration with partner pharmacies for quick and easy refills.
            </p>
          </div>

          {/* Service 7: Advanced Remote Monitoring */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/remote_monitoring.jpg" 
              alt="Advanced Remote Monitoring"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Advanced Remote Monitoring Solutions</h3>
            <p className="text-gray-800">
              • Continuous real-time monitoring of vital signs through wearable devices. <br />
              • Emergency alerts sent to caregivers and healthcare providers when abnormalities are detected. <br />
              • In-app dashboards for tracking and analyzing health data trends.
            </p>
          </div>

          {/* Service 8: Health Education & Wellness Programs */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/84c445573b.jpg" 
              alt="Health Education"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Health Education, Awareness & Wellness Programs</h3>
            <p className="text-gray-800">
              • Interactive resources on health conditions, preventive care, and nutrition. <br />
              • Custom wellness plans, including mental health support and stress management tools. <br />
              • Community programs to foster healthy living through education and empowerment.
            </p>
          </div>

          {/* Service 9: Wearable Device Integration */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6">
            <img
              className="rounded-lg mb-4 w-full h-56 object-cover"
              src="../../images/wearables.webp" 
              alt="Wearable Device Integration"
              
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Wearable Device Integration & Data Sync</h3>
            <p className="text-gray-800">
              • Seamless data synchronization with health tracking wearables and fitness apps. <br />
              • Insightful analytics to help users stay proactive about their well-being. <br />
              • Device management to customize tracking settings and data flow.
            </p>
          </div>

          {/* Service 10: Live Workout & Fitness Coaching */}
          <div className="bg-gray-50 rounded-lg shadow-lg p-6  block lg:hidden">
            <img
              className="rounded-lg mb-4"
              src="../../images/live_workout.webp" 
              alt="Live Workout & Fitness Coaching"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">Live Workout & Fitness Coaching Sessions</h3>
            <p className="text-gray-800">
              • On-demand and scheduled live workout classes from certified trainers. <br />
              • Remote coaching tailored to individual fitness levels and health goals. <br />
              • Health-focused challenges to motivate and engage users regularly.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 py-16 px-4 sm:px-8 lg:px-16 shadow-md">
      {/* Video Display */}
      <div className="block md:flex justify-around items-center mt-10 space-x-8">
        {/* Text Section */}
        <div className=" text-center md:-start md:w-1/2 mx-5">
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">How It Works</h3>
          <p className="text-lg text-gray-700 mb-2">Browse Devices: Explore detailed product descriptions, features, and reviews in-app.</p>
          <p className="text-lg text-gray-700 mb-2">Order Directly: Add your preferred wearables to the cart and complete the purchase in-app.</p>
          <p className="text-lg text-gray-700 mb-2">Seamless Integration: Once purchased, easily link devices to your BADANIX app for instant data sync.</p>
          <p className="text-lg text-gray-700 mb-2">Support & Warranty: Access customer service for device setup, troubleshooting, and warranty claims.</p>
          <p className="text-lg text-gray-700 mb-2">Exclusive Offer: Enjoy discounts on your first purchase and discounted shipping on select devices!</p>
        </div>

        {/* Video Section */}
        <div className="md:w-1/2 mb-12 relative">
  <div 
    onClick={playVideo} 
    className="rounded-md shadow-lg overflow-hidden cursor-pointer relative"
  >
    <video
      className="rounded-t-md rounded-bl-full rounded-br-3xl w-full h-auto"
      src="../../video/video.mp4"
      alt="Overview of Services"
      controls={false}
    />
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-md  ">
    <FaPlay size={100} className='text-primary  border-4  border-primary p-6 rounded-full font-bold' />

    </div>
  </div>
</div>

      </div>

      {/* Video Overlay */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"  onClick={closeVideo} >
          <div className="relative">
            <button 
              onClick={closeVideo} 
              className="absolute top-4 right-4 text-white text-3xl p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition"
              aria-label="Close video"
            >
              &times;
            </button>
            <video 
              className="rounded-md max-w-full" 
              controls 
              autoPlay
              src="../../video/video.mp4"
              alt="Overview of Services" 
            />
          </div>
        </div>
      )}
    </div>
      {/* BADANIX Wearable Store Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 shadow-md mt-10">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">BADANIX Wearable Store</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Your One-Stop Shop for Digital Wearables. Discover our carefully curated collection of wearable devices designed to enhance your health journey. Our wearables store ensures that your health monitoring needs are met with the latest wearable technology, seamlessly integrated into your wellness routine.
        </p>

        {/* Wearable Devices List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Smart Watches */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">Smart Watches</h3>
            <p className="text-gray-800">Track your heart rate, steps, sleep patterns, and more.</p>
          </div>

           <BsSmartwatch size={30} className='text-primary'/>

            </div>
          
          {/* Fitness Bands */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">Fitness Bands</h3>
            <p className="text-gray-800">Monitor physical activity and set fitness goals.</p>
          </div>
          <FaBandAid size={30} className='text-primary'/>

            </div>
          {/* Blood Pressure Monitors */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">Blood Pressure Monitors</h3>
            <p className="text-gray-800">Stay on top of your cardiovascular health.</p>
          </div>
          <ImMeter2 size={30} className='text-primary'/>

</div>
          {/* Glucose Monitors */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">Glucose Monitors</h3>
            <p className="text-gray-800">Manage blood sugar levels seamlessly.</p>
          </div>
          <SiGnometerminal  size={30} className='text-primary'/>

</div>
          {/* ECG Devices */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">ECG Devices</h3>
            <p className="text-gray-800">Get real-time heart health insights.</p>
          </div>
          <PiWaveTriangleFill size={30} className='text-primary'/>

</div>
          {/* Smart Rings */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between">
          <div className=""> <h3 className="text-xl font-semibold text-primary mb-2">Smart Rings</h3>
            <p className="text-gray-800">Discreet health monitoring at your fingertips.</p>
          </div>
          <FaRing size={30} className='text-primary'/>

          </div>
        </div>


      </section>

     {/* BADANIX Wearable Store Section */}
     <section className="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50 shadow-md mt-10">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">BADANIX Wearable Store</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Your One-Stop Shop for Digital Wearables. Discover our carefully curated collection of wearable devices designed to enhance your health journey. Our wearables store ensures that your health monitoring needs are met with the latest wearable technology.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
            Shop Now
          </button>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Services;
