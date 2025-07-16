import FacebookLogin from 'react-facebook-login'; // Import from the correct package
import { SiFacebook } from 'react-icons/si';

// Client-side Facebook Sign-In Component
const FacebookLoginButton = () => {
  const handleLoginSuccess = (response) => {
    console.log(response);
  };

  const handleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <FacebookLogin
      appId="YOUR_APP_ID" // Replace with your actual Facebook App ID
      autoLoad={false} // Whether to auto-trigger the login dialog
      fields="name,email,picture" // The fields you want to access
      callback={handleLoginSuccess} // Handle successful login
      onFailure={handleLoginFailure} // Handle failed login
      cssClass="facebook-button" // Custom CSS class
      textButton={
        <div className="flex items-center">
          <SiFacebook className='border-2 border-gray-500 rounded-full p-3 text-blue-700' size={46} />
          <span className="ml-2"></span>
        </div>
      }
    />
  );
};

// Export only the FacebookLoginButton component
export default FacebookLoginButton;
