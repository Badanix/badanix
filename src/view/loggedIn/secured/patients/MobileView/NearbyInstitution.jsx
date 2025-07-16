import { FaChevronRight, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Ensure you have this installed
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaLocationDot } from 'react-icons/fa6';
import { HiOfficeBuilding } from 'react-icons/hi';
import { useHospitalServices, useLaboratoryServices, usePharmacyServices } from '../services/ServicesForm';
import { defaultUrl } from '../../../../../components/Constants';


const NearbyInstitution = () => {
  const { LaboratoryData = [], loading: loadingLaboratory } = useLaboratoryServices(); 
    const { pharmacyData = [], loading: loadingPharmacy } = usePharmacyServices();
    const { HospitalData = [], loading: loadingHospital } = useHospitalServices(); 
  
    const categories = [
      { title: 'Laboratories', data: LaboratoryData, loading: loadingLaboratory },
      { title: 'Pharmacies', data: pharmacyData, loading: loadingPharmacy },
      { title: 'Hospitals', data: HospitalData, loading: loadingHospital },
    ];
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one category at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000, // Slides every 2 seconds
    arrows: true, // Show navigation arrows
  };
  return (
    <div className="mt-4 -mb-0">
      {categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="-mb-3">
              {/* Category Title Section */}
              <div className="flex justify-between mt-3 mx-3 text-primary dark:text-secondary">
                <p className="font-semibold text-lg">{category.title}</p>
                <div className="flex mx-3 font-[400]">
                  <Link to={`/${category.title.split(' ').pop().toLowerCase()}`} className="flex items-center">
                    <p>See all</p>
                    <FaChevronRight className="mt-[7px] ml-1" size={12} />
                  </Link>
                </div>
              </div>
  
              {/* Category Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {category.data.slice(0, 1).map((item) => (
                  <Link
                    key={item.id}
                    to={{
                      pathname: `/${encodeURIComponent(category.title.split(' ').pop().toLowerCase())}`,
                        search: `?id=${item.id}`,
                        state: { title: category.title }, 
                      }}
                    className="flex flex-col p-1 justify-between items-center m-3 border border-gray-200 rounded-lg shadow-sm"
                  >
                    {/* Thumbnail Image */}
                    <img   src={`${defaultUrl}${item.logo}`}alt={item.institution_name} className="w-full object-cover rounded-md" />
  
                    {/* Content Section */}

                    <div className="flex flex-col w-full p-2 ">
                      <h5 className="text-lg font-semibold text-primary dark:text-secondary capitalize">{item.institution_name}</h5>
  
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-white text-sm">
                        <FaLocationDot className="text-primary dark:text-secondary" />
                         <p className="text-gray-600">{item.address}</p>
                         <div className="bg-primary dark:bg-secondary text-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                          <FaLocationArrow className="cursor-pointer" size={20} />
                          
                        </div>
                      </div>
  
                      <hr />
  
                      {/* Date and Time Info */}
                      <div className="flex justify-around p-[6px] text-gray-500 text-sm mt-2">
                     
                        <div className="flex space-x-1">
                          <HiOfficeBuilding className="text-primary dark:text-secondary" />
                          <p>
                            {category.title.split(' ').pop() === 'Pharmacies'
                              ? 'Pharmacy'
                              : category.title.split(' ').pop() === 'Laboratories'
                              ? 'Laboratory'
                              : category.title.split().pop().slice(0, -1)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
  
};

export default NearbyInstitution