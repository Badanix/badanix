import { NAMES } from './Constants';

const Preloader = () => {
  const logo = NAMES.LOGO;

  return (
    <div className="flex items-center justify-center h-screen ">
        {/* Spinner */}
       
        <img src={logo}
              alt="Logo"
              className="w-1/4 h-6 sm:h-8  animate-bounce"
            />
        </div>
       
  );
};

export default Preloader;
