// import { FaLocationDot } from 'react-icons/fa6';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'

import { defaultUrl } from './Constants';
import { useGetDoctorFind } from '../view/loggedIn/secured/patients/services/ServicesForm';
const CardSlider = () => {

  const {PATIENTSFINDDoctorByRating}=useGetDoctorFind();
  const displayDotorsRatingVerified= PATIENTSFINDDoctorByRating.filter((item)=>item.verified===1 && item.status===1);
  
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  
  return (
    <div className="w-full flex justify-center">
      <Slider {...settings} className="w-[90%] mx-auto ">
        {displayDotorsRatingVerified.map((item, index) => (
          <div key={index} className="max-w-sm custom-sm:max-w-lg  rounded-lg border border-gray-200 shadow-md p-4 mx-auto text-primary dark:text-secondary">
           <div className="flex items-center">
  <div className="relative flex-shrink-0">
    <img 
      src={`${defaultUrl}${item.prof_pics}`}
      alt="Doctor" 
      className="w-20 h-20 rounded-full object-cover"
    />
    {/* <span
      className={`absolute top-0 right-0 w-4 h-4 border-2 border-white rounded-full ${
        item.online ? 'bg-green-600' : 'bg-red-600'
      }`}
    ></span> */}
  </div>
  <div className="ml-4 flex-1">
    <div className="flex items-center">
      
    </div>
    <p className="text-lg font-semibold mt-1">{item.fullname}</p>
    <p className='text-gray-400 dark:text-white text-sm ml-3 capitalize'>{item.specialization?.replace(/s$/, '')|| ''}</p>
    {/* <div className="flex items-center mt-2">
      <FaLocationDot className="text-primary dark:text-secondary ml-1" />
      <p className="text-gray-500 dark:text-white text-sm ml-2">{item.location}</p>
    </div> */}
    <div className="flex items-center mt-2">
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, starIndex) => (
          <svg
            key={starIndex}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${starIndex < item.reviewNumber ? 'text-secondary' : 'text-gray-400'}`}
          >
            <path d="M12 .587l3.668 7.431L24 9.803l-6 5.84 1.42 8.303L12 18.896 4.58 23.946 6 15.643 0 9.803l8.332-1.785L12 .587z" />
          </svg>
        ))}
      </div>
      <div className='flex items-center space-x-2'>
  <p className="text-sm text-gray-500 dark:text-white">{item.rating} <span className='ml-2'> {item.reviewNumber}</span> |</p>
  <p className="text-sm text-gray-500 dark:text-white">{item.reviewTotal} Reviews</p>
</div>

    </div>
  </div>
</div>
<Link to ={item.link}>
            <button className="mt-4 bg-primary dark:bg-secondary text-white w-full py-2 rounded-lg">
              Book Appointment
            </button>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
  
  
  
};

export default CardSlider;
