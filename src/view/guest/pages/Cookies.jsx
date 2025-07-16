import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Cookies = () => {
  return (
    <div>
      <HeroPages 
        HeroPagesHeading="Cookies Policy" 
        HeroPagesParagraph="Welcome to BADANIX Digital Healthcare! This Cookie Policy explains how we use cookies and similar technologies on our website to enhance your experience, improve our services, and ensure smooth operation. By continuing to use our website, you agree to our use of cookies as described in this policy." 
        bgImageUrl="../../images/hospitalImg.png"
      />

      <div className="container mx-auto px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Cookie Policy for BADANIX Digital Healthcare</h2>

        {/* What are Cookies */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">What are Cookies?</h3>
          <p className="mt-2">
            Cookies are small text files that websites store on your device (computer, smartphone, tablet) to track information about your interaction with the website. They help websites function properly, provide personalized experiences, and gather analytics to enhance performance.
          </p>
        </div>

        {/* Types of Cookies We Use */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Types of Cookies We Use</h3>
          <h4 className="text-xl font-semibold mt-4">a. Strictly Necessary Cookies</h4>
          <p>These cookies are essential for the basic functionality of our website. They enable features like secure logins, load balancing, and page navigation. Without these cookies, certain services on the site may not work.</p>
          <p><strong>Example:</strong> Login authentication cookies</p>

          <h4 className="text-xl font-semibold mt-4">b. Performance and Analytics Cookies</h4>
          <p>These cookies collect anonymous data to understand how users interact with our site, including which pages are visited and any errors encountered. This helps us improve performance and usability.</p>
          <p><strong>Example:</strong> Google Analytics</p>

          <h4 className="text-xl font-semibold mt-4">c. Functional Cookies</h4>
          <p>These cookies allow us to remember your preferences, such as language or region settings, for a more personalized experience.</p>
          <p><strong>Example:</strong> Remembering your login credentials</p>

          <h4 className="text-xl font-semibold mt-4">d. Targeting and Advertising Cookies</h4>
          <p>These cookies track your online activities to deliver personalized ads and measure the effectiveness of our campaigns. They may be placed by third-party advertisers with our permission.</p>
          <p><strong>Example:</strong> Facebook Pixel</p>
        </div>

        {/* How We Use Cookies */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">How We Use Cookies</h3>
          <ul className="mt-2 list-disc list-inside">
            <li>To provide essential website functionality</li>
            <li>To improve user experience and site performance</li>
            <li>To gather analytics for internal purposes</li>
            <li>To deliver personalized content and advertisements</li>
          </ul>
        </div>

        {/* Managing Cookies */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Managing Cookies</h3>
          <p className="mt-2">
            You can manage or delete cookies through your browser settings. Most browsers allow you to block or delete cookies, but please note that certain parts of our site may not function properly if you disable them. For more information on how to manage cookies, visit <a href="http://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
          </p>
        </div>

        {/* Third-Party Cookies */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Third-Party Cookies</h3>
          <p className="mt-2">
            Some of the cookies used on our website may be set by third parties, such as analytics providers or advertising partners. We do not control these cookies and recommend reviewing the cookie policies of the respective third parties for more information.
          </p>
        </div>

        {/* Updates to this Policy */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Updates to this Policy</h3>
          <p className="mt-2">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. Please review this page periodically to stay informed about how we use cookies.
          </p>
        </div>

        {/* Contact Us */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          <p className="mt-2">
            If you have any questions or concerns about this Cookie Policy, please contact us at:
            <br />
            <strong>BADANIX Digital Healthcare</strong>
            <br />
            Email: <a href="mailto:info@badanix.com" className="text-blue-600 hover:underline">info@badanix.com</a>
          </p>
        </div>

        <h4 className="text-center text-lg italic mt-4">Thank you for visiting BADANIX Digital Healthcare!</h4>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Cookies;
