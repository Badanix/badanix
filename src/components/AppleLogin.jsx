// AppleLogin.jsx

import  { useEffect } from 'react';
// import AppleGrantType from 'oauth2-server-grant-type-apple';
import { SiApple } from "react-icons/si";

// Server-side OAuth2 Configuration (for server-side use)
// This would typically be in a server-side file, not in a React component file
// const oauth2ServerOptions = {
//   model: {
//     appleGrantType: {
//       appId: 'com.example.apple.login' // Replace with your Apple App ID
//     },
//   },
//   extendedGrantTypes: {
//     apple: AppleGrantType,
//   },
//   requireClientAuthentication: {
//     apple: false,
//   },
// };

// Function to handle Apple authentication (server-side)
// const getUserWithApple = async (jwtData) => {
//   // Example implementation:
//   // const user = await User.findOne({ appleId: jwtData.sub }) || 
//   //               await User.findOne({ email: jwtData.email }) ||
//   //               await User.create({ appleId: jwtData.sub, email: jwtData.email });

//   return user;
// };

// Client-side Apple Sign-In Component
const AppleLogin = () => {
  useEffect(() => {
    // Initialize Apple Sign-In on component mount
    window.AppleID.auth.init({
      clientId: 'YOUR_APPLE_CLIENT_ID', // Replace with your Apple client ID
      scope: 'email name',
      redirectURI: 'YOUR_REDIRECT_URI', // Replace with your redirect URI
      usePopup: true, // Use popup for the sign-in process
    });
  }, []);

  const handleSignIn = () => {
    window.AppleID.auth.signIn().then((response) => {
      // Handle the response from Apple
      console.log(response);
      // Send the authorization code to your server or handle it as needed
    }).catch((error) => {
      console.error('Error during Apple sign-in:', error);
    });
  };

  return (
    <button
      id="signinButton"
      className="flex justify-center items-center p-2 rounded-full shadow-lg hover:shadow-xl"
      onClick={handleSignIn}
    >
      <SiApple className='border-2 border-gray-500 rounded-full p-3' size={40} />
    </button>
  );
};

// Export only the AppleLogin component
export default AppleLogin;
