import { useState } from "react";
import { IMAGE, DOWNLOAD } from '../../components/Constants';

import styles from "../../components/styles";
import UAParser from 'ua-parser-js';
import { RiQrScan2Line } from "react-icons/ri";

const AuthHeader = () => {

const [barcodeDropdown, setbarcodeDropdown]= useState(false);

const handleMouseOver = () => {
    setbarcodeDropdown(true);
  };
  
  // Handle mouse out event to hide dropdown
  const handleMouseOut = () => {
    setbarcodeDropdown(false);
  };
  
  
   // Function to get the device-specific URL
   const getDeviceStoreURL = () => {
    const parser = new UAParser();
    const result = parser.getResult();
  
    if (result.os.name === 'Android') {
      return DOWNLOAD.android_download; 
    }
  
    if (result.os.name === 'iOS') {
      return DOWNLOAD.apple_download; 
    }
  
    return DOWNLOAD.desktop_download; 
  };
  


  return (
    <div  >
       {/* Header */}
 <div className={styles.registerHeader} >
  <a href="/"  >  <img src={IMAGE.site_logo} alt="Logo" className="sm:absolute w-32 -mt-9 mr-5  sm:w-36 sm:h-auto sm:-mt-8" />
  </a>
 <div className={styles.registerHeader}  >
 <div
      className="relative inline-block"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {/* QR Code Icon */}
      <RiQrScan2Line
        className="mx-[20px] cursor-pointer text-primary dark:text-secondary"
        size={26}
      />

      {/* Dropdown for Barcode */}
      {barcodeDropdown && (
  <div className="absolute top-0 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
    <div className="p-4">
      <Barcode value={getDeviceStoreURL()} size={160} />
      <p className="text-center text-primary dark:text-secondary font-[700] mt-2">Scan to Download</p>
    </div>
  </div>
)}

    </div>
   {/* <ToggleTheme/> */}
        </div>
      </div>
      {/* End of header */}

    </div>
  )
}

export default AuthHeader
