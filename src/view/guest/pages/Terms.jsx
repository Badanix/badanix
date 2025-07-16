import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Terms = () => {
  return (
    <div className="bg-gray-50">
      <HeroPages
        HeroPagesHeading="Terms and Conditions"
        HeroPagesParagraph="Welcome to BADANIX Digital Healthcare. These Terms and Conditions govern your access to and use of our services."
        bgImageUrl="../../images/hospitalImg.png"
      />

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mt-8">Terms and Conditions of BADANIX Digital Healthcare</h1>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">1. Acceptance of Terms</h2>
          <p>
            By accessing, using, or registering with BADANIX Digital Healthcare, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree to these terms, you must not use our services. 
          </p>
          <p>
            Additional policies such as our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, 
            <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>, and 
            <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a> are incorporated by reference.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">2. Services Overview</h2>
          <p>
            BADANIX provides a range of digital healthcare services, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Online consultations with healthcare professionals (telemedicine)</li>
            <li>Appointment scheduling</li>
            <li>Electronic Health Record (EHR) management</li>
            <li>Health and wellness monitoring tools</li>
            <li>Digital prescription management</li>
            <li>Payment processing for medical services</li>
          </ul>
          <p className="font-semibold text-gray-700">
            **Disclaimer**: BADANIX does not replace emergency medical care. In life-threatening situations, contact local healthcare emergency services immediately.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">3. User Eligibility</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Users must be at least 16 years of age or have parental consent to use our services.</li>
            <li>Healthcare professionals using the platform must provide valid credentials and licenses, which will be verified by BADANIX.</li>
            <li>Users are responsible for providing accurate, complete, and updated information during registration.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">4. Account Registration and Security</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must create an account to access certain features of the platform.</li>
            <li>It is your responsibility to keep your login credentials confidential.</li>
            <li>You are liable for all activities conducted under your account. Notify us immediately in case of unauthorized access or security breaches.</li>
            <li>BADANIX reserves the right to suspend or terminate accounts for fraudulent or non-compliant activities.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">5. Healthcare Services Disclaimer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>BADANIX acts as a facilitator between users and licensed healthcare providers. We are not responsible for the medical advice provided by third-party professionals.</li>
            <li>Healthcare professionals on our platform operate independently and are solely responsible for the quality and legality of the services they provide.</li>
            <li>You agree that healthcare services provided via our platform are not substitutes for in-person clinical examinations where needed.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">6. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must provide accurate health information for medical consultations.</li>
            <li>Any misuse of the platform, including providing false information, will result in termination of your access.</li>
            <li>You must adhere to the healthcare provider’s advice and instructions during and after consultations.</li>
            <li>BADANIX is not liable for adverse outcomes resulting from failure to follow medical advice or inaccurate health records.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">7. Payment and Refund Policy</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Payments for consultations or other healthcare services are processed through secure third-party payment gateways.</li>
            <li>Fees may vary based on the services provided, healthcare professional charges, or local regulations.</li>
            <li>All payments must be made in the currency specified at checkout.</li>
            <li>Refunds will be issued only for cancellations made within the allowed cancellation window or when services are unavailable, as outlined in our Refund Policy.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">8. Data Privacy and Security</h2>
          <p>
            BADANIX is committed to protecting your privacy. Please review our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> to understand how we collect, use, and safeguard your personal data.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>We comply with global privacy regulations, including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant laws.</li>
            <li>All health records are encrypted and stored in compliance with applicable healthcare data laws such as HIPAA (for U.S. users).</li>
            <li>You are responsible for safeguarding your health data when sharing it with third-party providers.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">9. Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>BADANIX owns all intellectual property related to the platform, including trademarks, copyrights, and content. Unauthorized use of our intellectual property is prohibited.</li>
            <li>Users are granted a limited, non-transferable license to access and use the platform for personal healthcare purposes only.</li>
            <li>Healthcare providers retain ownership of medical content they create on the platform, subject to licensing agreements with BADANIX.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">10. Prohibited Conduct</h2>
          <p>Users and healthcare providers are prohibited from:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Engaging in fraudulent activities or impersonating others.</li>
            <li>Posting or transmitting harmful, offensive, or illegal content.</li>
            <li>Using the platform to promote or sell unauthorized goods or services.</li>
            <li>Violating local, national, or international healthcare regulations.</li>
          </ul>
          <p>
            BADANIX reserves the right to report any illegal activities to relevant authorities.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">11. Third-Party Links and Services</h2>
          <p>
            The platform may contain links to third-party websites or services. BADANIX is not responsible for the content or privacy practices of these third-party platforms. Use these links at your own risk.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">12. Limitation of Liability</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>BADANIX is not liable for any indirect, incidental, or consequential damages arising from your use of the platform or any services rendered.</li>
            <li>Our maximum liability shall not exceed the total amount paid by you for the services, except where prohibited by law.</li>
            <li>This limitation applies to all users and healthcare providers regardless of their claims.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">13. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless BADANIX, its affiliates, and employees from any claims, losses, damages, or liabilities arising from your use of the platform or your violation of these Terms and Conditions.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">14. Modifications to Terms</h2>
          <p>
            BADANIX reserves the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the services after modifications constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">15. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction where BADANIX is located, without regard to its conflict of law principles.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700">16. Contact Information</h2>
          <p>If you have any questions or concerns about these Terms and Conditions, please contact us at <a href="mailto:support@badanix.com" className="text-blue-600 hover:underline">support@badanix.com</a>.</p>
        </section>
      </main>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center">Connect With Us</h3>
          <p className="mt-2 text-center">
            Follow us on social media to stay updated on our latest innovations, events, and health services.
          </p>
         
          <p className="mt-6 italic text-gray-600 text-center">
            Let’s Build a Healthier Future, Together!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
