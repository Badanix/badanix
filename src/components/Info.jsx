import { useEffect, useState } from "react";
import { FcSpeaker } from "react-icons/fc"
import { Notifications } from "./Constants";
import { RiMenuAddLine } from "react-icons/ri";
import PropTypes from 'prop-types'

const Info = ({className, PclassName}) => {
    const [showNotification, setShowNotification] = useState(false);

    const [currentNotification, setCurrentNotification] = useState(0);
  const [animationClass, setAnimationClass] = useState('slide-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % Notifications.length);
        setAnimationClass('slide-in');
      }, 500); 
    }, 4000); 

    return () => clearInterval(interval);
  }, []);



  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };
  return (
<div className={`flex mt-1 ${className}`}>
  <FcSpeaker className='mt-1 ml-2'/>
  <p className={`text-sm ml-1 text-gray-400 notification ${PclassName} ${animationClass}`} style={{  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
    {Notifications[currentNotification].message}
  </p>
  <RiMenuAddLine className='mt-[2px] ml-[30px] cursor-pointer text-primary dark:text-secondary' onClick={handleNotificationClick}/>
</div>  )
}

Info.propTypes={
  className: PropTypes.string,
  PclassName:PropTypes.string,
}
export default Info