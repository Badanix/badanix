import { useRef, useState, useEffect } from 'react';
import AuthHeader from '../../partials/AuthHeader';
import { APIURLS, UserTypeImage } from '../../../components/Constants';
import { FaUserTie } from "react-icons/fa";
import styles from '../../../components/styles';
import { useFormValidation } from './formValidation';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// API URLs
const APIURLPATIENTSVERIFY = APIURLS.APIURLPATIENTSVERIFY;
const APIURLDOCTORSVERIFY = APIURLS.APIURLDOCTORSVERIFY;
const APIURLINSTITUTIONVERIFY = APIURLS.APIURLINSTITUTIONVERIFY;
const APIURLPATIENTRESENDEMAILCODE = APIURLS.APIURLPATIENTRESENDEMAILCODE;
const APIURLDOCTORSRESENDEMAILCODE =APIURLS.APIURLDOCTORSRESENDEMAILCODE;
 const APIURLINSTITUTIONRESENDEMAILCODE =APIURLS.APIURLINSTITUTIONRESENDEMAILCODE
const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const emailFromRegister = query.get('email');
  const { setActionType } = useFormValidation(true);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const allFilled = otp.every((num) => num !== "");

  useEffect(() => {
    getVerificationCode();
  }, [emailFromRegister]);

  const getVerificationCode = async (otpCode) => {
    console.log('OTP Submitted by User:', otpCode);
  
    if (!emailFromRegister) {
      Swal.fire('Error', 'No email provided in query parameters.', 'error');
      return;
    }
  
    let apiUrl = '';
    const role_id = parseInt(localStorage.getItem('role_id'), 10);
  
    console.log('Role ID:', role_id);
  
    switch (role_id) {
      case 1:
        apiUrl = `${APIURLPATIENTSVERIFY}/${encodeURIComponent(emailFromRegister)}`;
        break;
      case 2:
        apiUrl = `${APIURLDOCTORSVERIFY}/${encodeURIComponent(emailFromRegister)}`;
        break;
      case 3:
        apiUrl = `${APIURLINSTITUTIONVERIFY}/${encodeURIComponent(emailFromRegister)}`;
        break;
      default:
       console.log('Error', "The User doesn't have a valid role", 'error');
        return;
    }

    console.log('API URL:', apiUrl);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_code: otpCode,
          verified: 1, 
        }),
      });
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      // If the server confirms success, show a success message
      if (response.ok && responseData.status === 200 ) {
        Swal.fire({
          title: 'Success',
          text: 'Verification successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => navigate('/auth-login'));
      }
    } catch (err) {
      console.error('Error during verification:', err);
      Swal.fire('Error', err.message || 'An unexpected error occurred.', 'error');
    }
  };
  
  
  
  
  
  
  
  
  // Handle OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; 

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  
  

  const resendVerificationCode = async () => {
    if (!emailFromRegister) {
      Swal.fire('Error', 'No email provided for resending the verification code.', 'error');
      return;
    }
  
    let apiUrl = '';
    const role_id = parseInt(localStorage.getItem('role_id'), 10);
  
    console.log('Role ID:', role_id);  
    switch (role_id) {
      case 1:
        apiUrl = APIURLPATIENTRESENDEMAILCODE;
        break;
      case 2:
        apiUrl = APIURLDOCTORSRESENDEMAILCODE;
        break;
      case 3:
        apiUrl = APIURLINSTITUTIONRESENDEMAILCODE;
        break;
      default:
        Swal.fire('Error', "The User doesn't have a valid role", 'error');
        return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/${emailFromRegister}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
  
      
        if (data.status === "success") {
          Swal.fire('Success', 'Verification code sent successfully', 'success');
        } else {
          
          Swal.fire('Error', data.message || 'An error occurred', 'error');
        }
      } else {
      
        if (response.status === 200) {
          Swal.fire('Success', 'Verification code sent successfully', 'success');
        } else {
          Swal.fire('Error', 'Unexpected response format or no such user exists.', 'error');
        }
      }
    } catch (err) {
      Swal.fire('Error', err.message || 'An unknown error occurred', 'error');
    }
  };
  
  
  
  
  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "Enter" && allFilled) {
      const otpCode = otp.join("");
      getVerificationCode(otpCode);
    }
  };

  return (
    <div     className={`relative w-full min-h-screen bg-cover bg-center `}
>
      {/* Header */}
      <AuthHeader />
      <main className={styles.mainContainer}>
      <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`} >
  {/* Image Section */}
  <div className="flex-grow" >
            <img
              src={ UserTypeImage.default}
              alt=""
              className='inset-0 w-full max-h-full object-cover -mt-[170px]'
            />
          </div>
          </section>
        <section className='lg:w-4/12 my-[10px]  mt-[60px] sm:mx-[100px] sm:ml-[150px] sm:my-[100px] md:mt-[120px] lg:mt-[90px] w-3/4 mx-auto'>
          <div className='flex justify-between border-b border-gray-200 sm:max-w-[30rem] mr-7 mb-4 text-primary'>
            <h1 className='font-bold text-2xl text-start sm:mr-4 mb-3'>Security verification</h1>
            <FaUserTie className='mt-2 text-secondary' size={25} />
          </div>
          
         



          <div className='flex justify-center mb-5 mt-8'>
            <p>Verification code sent to ({emailFromRegister.replace(/(.{3})(.*)(@.*)/, '$1****$3')})</p>
          </div>
          <form className="w-full max-w-lg" autoComplete="off">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2 mb-[20px] mt-3">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] text-center border text-[28px] border-gray-300 rounded-md focus:outline-none focus:primary-border-color"
                  />
                ))}
              </div>
              <button
                disabled={!allFilled}
                className={`px-4 py-2 w-full p-3 rounded-[20px] border-2 border-b-[9px] bg-transparent ${allFilled ? "primary-border-color text-primary " + styles.buttonClass : "border-gray-400 text-gray-400"}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActionType('verifyEmail');
                  if (allFilled) {
                    const otpCode = otp.join("");  
                    getVerificationCode(otpCode);
                  }
                }}
              >
                Submit
              </button>
              <p className='mt-4'>Didn&apos;t receive verification code? <span  className='text-primary underline text-[13px] sm:text-[15px] cursor-pointer' onClick={resendVerificationCode} >Resend verification code</span></p>
            </div>
          </form>
        </section>
      </main>
      <div className="relative">
        {/* <AuthChat/> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
