import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
const HeroPages = ({HeroPagesParagraph,HeroPagesHeading, bgImageUrl}) => {
  return (
    <div>
      <NavBar navBgColor="bg-white" className=" rounded-b-2xl mx-auto w-[95%]" textColor="text-primary" />
     
      <div 
        className="relative bg-cover bg-center mt-[60px] py-[120px]" 
        style={{ 
          backgroundImage: `url(${bgImageUrl})`, 
          minHeight: '40vh', 
        
        }}
        
      >
     

        {/* Dark Overlay on the Image */}
        <div 
          className="absolute inset-0 bg-gray-800 opacity-70" // Dark overlay with 70% opacity
          style={{ zIndex: 0 }} // Ensure it is behind the text
        />
    <Link 
  to={'/'} 
  className='absolute top-8 underline flex space-x-2 text-gray-200 my-4 brightness-125 '
>
  <FaArrowLeft className='mt-1 text-white' />
  <span>Back to Home</span>
</Link>
        {/* Centered Text Section */}
        <div 
          className="flex flex-col items-center justify-center h-full text-white text-center relative" // Centering the text
          style={{ padding: '0 20px', zIndex: 1 }} // Adding padding and ensuring it's on top
        >
          <h1 className="text-4xl sm:text-5xl font-bold">{HeroPagesHeading}</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl">
          {HeroPagesParagraph}
          </p>
        </div>
      </div>
    </div>
  )
}
HeroPages.propTypes = {
    HeroPagesParagraph:PropTypes.string, 
    HeroPagesHeading:PropTypes.string,
    bgImageUrl: PropTypes.elementType,
};
export default HeroPages
