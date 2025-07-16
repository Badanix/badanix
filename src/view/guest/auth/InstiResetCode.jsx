import { useRef, useState } from 'react';
import AuthHeader from '../../partials/AuthHeader';
import { APIURLS, UserTypeImage } from '../../../components/Constants';
import { FaUserTie } from "react-icons/fa";
import styles from '../../../components/styles';
import { useFormValidation } from './formValidation';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const InstiResetCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const emailFromForgotPassword = query.get('email');
 const { setActionType } = useFormValidation(true);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const allFilled = otp.every((num) => num !== "");

  const verifyOtp = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Swal.fire('Error', 'Please enter the 6-digit OTP sent to your email.', 'error');
      return;
    }

    if (!emailFromForgotPassword) {
      Swal.fire('Error', 'No email provided in query parameters.', 'error');
      return;
    }

    try {
      const url = `https://api.digitalhospital.com.ng/api/v1/institution/reset`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      });

      const text = await response.text();
      console.log("API Raw Response:", text);

      const result = JSON.parse(text);

      if (result.status === 401) {
        Swal.fire('Error', result.message || 'Invalid OTP.', 'error');
        return;
      }

      if (!response.ok || result.status !== 200) {
        Swal.fire('Error', result.message || 'Something went wrong.', 'error');
        return;
      }

      Swal.fire({
        title: 'Success',
        text: result.message || 'Code verified. A new password has been sent to your email. Login and change it in settings.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => navigate('/auth-login'));

    } catch (error) {
      console.error("Verification error:", error);
      Swal.fire('Error', error.message || 'Something went wrong. Please try again later.', 'error');
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (val.length > 1 || (val && isNaN(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Move focus forward or backward
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!val && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter" && allFilled) {
      verifyOtp();
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center">
      <AuthHeader />
      <main className={styles.mainContainer}>
        <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`}>
          <div className="flex-grow">
            <img
              src={UserTypeImage.default}
              alt="User Type"
              className="inset-0 w-full max-h-full object-cover -mt-[170px]"
            />
          </div>
        </section>
        <section className="lg:w-4/12 my-[10px] mt-[60px] sm:mx-[100px] sm:ml-[150px] sm:my-[100px] md:mt-[120px] lg:mt-[90px] w-3/4 mx-auto">
          <div className="flex justify-between border-b border-gray-200 sm:max-w-[30rem] mr-7 mb-4 text-primary">
            <h1 className="font-bold text-2xl text-start sm:mr-4 mb-3">Security verification</h1>
            <FaUserTie className="mt-2 text-secondary" size={25} />
          </div>

          <form className="w-full max-w-lg" autoComplete="off" onSubmit={e => {
            e.preventDefault();
            setActionType('resetCode');
            if (allFilled) verifyOtp();
          }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2 mb-[20px] mt-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    ref={el => inputRefs.current[index] = el}
                    className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] text-center border text-[28px] border-gray-300 rounded-md focus:outline-none focus:border-primary"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!allFilled}
                className={`px-4 py-2 w-full p-3 rounded-[20px] border-2 border-b-[9px] bg-transparent 
                  ${allFilled ? "primary-border-color text-primary " + styles.buttonClass : "border-gray-400 text-gray-400"}`}
              >
                Verify Code
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default InstiResetCode;
