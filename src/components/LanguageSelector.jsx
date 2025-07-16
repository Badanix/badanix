import  { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {
    // Initialize the Google Translate widget
    const addGoogleTranslateScript = () => {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      googleTranslateScript.type = 'text/javascript';
      document.body.appendChild(googleTranslateScript);
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default LanguageSelector;
