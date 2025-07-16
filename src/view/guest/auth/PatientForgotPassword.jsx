import AuthHeader from '../../partials/AuthHeader';
import styles from '../../../components/styles';
import { useState } from 'react';
import { APIURLS } from '../../../components/Constants';
import Swal from 'sweetalert2';

const PatientForgotPassword = () => {
  const  APIURLPATIENTSCHANGEPASSWORD = APIURLS.APIURLPATIENTSCHANGEPASSWORD;
  const [formData, setFormData] = useState({ email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getOTPCode = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      Swal.fire('Error', 'Please provide an email', 'error');
      return;
    }

    try {
      const response = await fetch("https://api.digitalhospital.com.ng/api/v1/user/forgotpassword", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok || data.status !== 200) {
        Swal.fire('Error', data.message || 'Failed to send OTP', 'error');
        return;
      }

      // Store role_id for doctor
      localStorage.setItem('role_id', 1);

      Swal.fire('Success', data.message || 'OTP sent to your email', 'success').then(() => {
        window.location.href = `/patientreset-code?email=${encodeURIComponent(formData.email)}`;
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Network error or server unavailable', 'error');
    }
  };

  return (
    <div>
      <AuthHeader />
      <main className={styles.mainContainer}>
        <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`}>
          <div className="flex-grow">
            <img
              src="https://images.pexels.com/photos/5214996/pexels-photo-5214996.jpeg"
              alt=""
              className="inset-0 w-full max-h-full object-cover -mt-[170px]"
            />
          </div>
        </section>

        <section className={styles.mainRegister}>
          <div className="border-b border-gray-200 sm:max-w-[30rem] mb-4 text-primary">
            <h1 className={`text-primary dark:text-secondary font-bold ${styles.subHeading}`}>Patient Forgot Password</h1>
          </div>

          <form className="space-y-6 sm:max-w-[30rem] mx-auto" autoComplete="off" onSubmit={getOTPCode}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                placeholder="Enter your registered email"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full p-3 text-primary rounded-[20px] bg-secondary border-2 border-primary border-b-[9px] mt-9 ${styles.buttonClass} hover:text-white hover:bg-primary hover:border-secondary`}
              >
                Next
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default PatientForgotPassword;
