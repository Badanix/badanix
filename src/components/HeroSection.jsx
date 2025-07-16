import { NAMES } from "./Constants";
import { IoLogoApple } from "react-icons/io5";
import { FaGooglePlay } from "react-icons/fa";
import NavBar from "./NavBar";
import { useCallback, useEffect, useState } from "react";
import { MdLogin } from "react-icons/md";

const HeroSection = () => {
    const phoneImg = NAMES.phoneImg;
    const yourBgImageUrl= NAMES.Bgherorailway;
    const[desktopScreen, setDesktopScreen] =useState(window.innerWidth >= 768);

    const handleResize =useCallback(()=>{
        setDesktopScreen(window.innerWidth >= 768)
    }, []

    )
    useEffect(() => {
        window.addEventListener('resize', handleResize);
    
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [handleResize]);

  return (

<div
  className="relative bg-primary text-white bg-center bg-cover bg-blend-overlay "
  style={{ backgroundImage: desktopScreen ? `url(${yourBgImageUrl})` : "none" }}
>

<NavBar/>

      {/* Hero Section Content */}
      <div className="pt-24 p-8 md:grid md:grid-cols-2 md:gap-8 items-center relative tablet:-mt-[50px]">
        {/* Left Content - Text and Buttons */}
        <div className="text-white flex flex-col gap-y-[34px] order-2 md:order-1 md:-mt-[75px] md-ml-7 lg:-mt-[250px]  lg:leading-loose">
        <div className="lg:w-[800px] tablet:w-[500px] space-x-7 mt-8 md:mt-[100px]">
        <p className="uppercase  mx-[50px] text-xl text-secondary text-center">Enhancing patient care through digital health care</p>
  <p className="lg:text-[52px]  text-3xl font-bold text-center md:text-left custom-xs:text-3xl custom-sm:text-3xl tablet:text-3xl tablet:text-center lg:leading-[63px]">
    The Most Complete Healthcare Solutions in Your Pocket
  </p>
</div>



          <div className="lg:w-[700px]">
            <p className="lg:text-xl text-md text-center  custom-xs:-mt-3 lg:ml-[60px] tablet:ml-[60px] ">
              Leveraging technology to augment the reach of doctors and provide on-demand access, we are making quality healthcare more accessible than ever.
            </p>
          </div>
          <div className="flex flex-col gap-y-2.5 text-center mx-auto" >
          
            <div className="flex ">
      {desktopScreen ? (
        <div  className="flex">
          <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center shadow-lg tablet:mx-9 font-bold font-serif">
            <FaGooglePlay className="w-6 h-6 mr-2 text-primary " />
            <span>Google Play</span>
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg flex items-center shadow-lg font-bold font-serif">
            <IoLogoApple className="w-6 h-6 mr-2 text-primary" />
            <span>App Store</span>
          </button>
        </div>
      ) : (
        <div className="flex -mt-3 -mx-3 space-x-8"> 
          <button className="bg-white text-primary px-8 py-2 rounded-lg flex items-center shadow-lg custom-xs:mx-[10px] custom-sm:mx-[5px] custom-14:mx-[7px] custom-pixel:mx-[30px]  ">
            <span>Sign Up</span>
          </button>
          <button className="bg-white text-primary px-8 py-2 rounded-lg flex items-center shadow-lg">
           
            <span>Login</span> <MdLogin className="w-6 h-6 text-primary" />
          </button>
        </div>
      )}
    </div>
          </div>
        </div>

       {/* Right Content - Phone Image */}
<div className="sm:flex justify-center md:justify-end mt-8 md:mt-[30px] tablet:mt-[90px] md:ml-[80px] tablet:ml-[80px]   md:items-center order-1 md:order-2 mx-auto md:mx-0 overflow-x-hidden block">
  <img 
    src={phoneImg} 
    alt="Phone" 
    className="relative mt-10 md:-mt-0 md:ml-[100px]  custom-xs:ml-[40px]  custom-xs:-mt-0 w-[1200] h-[950]" 
   
  />
</div>

      </div>

      {/* Adding sloped bottom effect */}
     

</div>
  
  );
};

export default HeroSection;
