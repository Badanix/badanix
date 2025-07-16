import { FaStethoscope, FaPills} from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { TbBuildingHospital } from 'react-icons/tb';

const CoreServicesSection = () => {
    
    const coreServices = [
      { icon: FaStethoscope, title: 'Virtual Consultations', description: 'Connect you to our certified e-specialists across the globe via video call' },
      { icon: FaPills, title: 'Pharmacy Services',description: 'Order your prescribed medication through our leading pharmaceutical providers'  },
      { icon: TbBuildingHospital, title: 'hospital services', description: 'Connect you to our certified e-specialists across the globe'  },
      { icon: ImLab, title: 'Laboratory Access', description: 'Enjoy top notch diagnosis services at any of our laboratories partner of your choice.'  },
    ];
  
    return (
        <div className="py-12 relative mt-[450px] md:mt-[300px] mx-auto w-[90%] "> {/* Set top-20 to create space for the absolute section */}
       <h2 className="text-3xl font-bold text-center mb-[50px] text-primary border-b-4 border-secondary mx-auto w-fit pb-4 ">

            Our  Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {coreServices.map((service, index) => (
     <div
     key={index}
     className="p-9 py-[70px] lg:py-[150px]  bg-white rounded-lg shadow-lg text-center border-2 group hover:bg-primary hover:text-white hover:border-4 hover:border-secondary  duration-300 ease-in-out hover:scale-110 transition-all hover:shadow-3xl cursor-pointer  "
   >
     <div
       className="mb-9 mx-auto bg-primary text-white p-7 rounded-full flex items-center justify-center h-32 w-32 group-hover:bg-white group-hover:text-primary group-hover:border-4 group-hover:border-secondary transition-all duration-300 ease-in-out hover:scale-110"
     >
       <service.icon size={60} /> {/* Render the icon with a specific size */}
     </div>
     <h3 className="text-xl font-semibold mt-4 capitalize text-primary group-hover:text-white">{service.title}</h3>
     <p className="mt-2">{service.description}</p>
   </div>
   
   
          ))}
        </div>
      </div>
    );
  };
  
  export default CoreServicesSection;
  