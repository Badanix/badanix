// GoogleLoginButton.js
import { useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  useEffect(() => {
    // Initialize Google OAuth when the component mounts
    window.gapi.load('auth2', () => {
      window.auth2 = window.gapi.auth2.init({
        client_id: '560612638837-gd7nghtp898giquogtr8gr51aduljsdt.apps.googleusercontent.com', // Replace with your Google client ID
        // Additional scopes if required
        // scope: 'additional_scope'
      });
    });
  }, []);

  const handleSignIn = () => {
    window.auth2.grantOfflineAccess().then(signInCallback);
  };

  const signInCallback = (authResult) => {
    if (authResult['code']) {
      // Hide the sign-in button after successful authorization
      document.getElementById('signinButton').style.display = 'none';

      // Send the authorization code to your server
      fetch('http://example.com/storeauthcode', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/octet-stream; charset=utf-8',
        },
        body: authResult['code'],
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log('Error during sign-in.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <button
      id="signinButton"
      className="flex justify-center items-center p-2 rounded-full shadow-lg hover:shadow-xl"
      onClick={handleSignIn}
    >
<FcGoogle size={40} className='border-2 border-gray-500 rounded-full p-3'/>         </button>
</GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
