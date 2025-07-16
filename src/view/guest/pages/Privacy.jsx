import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Privacy = () => {
  return (
    <div>
      <HeroPages 
        HeroPagesHeading="Privacy Policy" 
        HeroPagesParagraph="At BADANIX Digital Healthcare, we are committed to protecting the privacy and confidentiality of our users' personal information." 
        bgImageUrl='../../images/hospitalImg.png'
      />

      <div className="pt-20 pb-10 text-left bg-white">
        <main className="max-w-3xl mx-auto px-4 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700">Privacy Policy for BADANIX Digital Healthcare</h2>
          <p>
            This privacy policy outlines how we collect, use, store, and protect the information you provide while using our digital healthcare services. By accessing or using our services, you agree to the terms of this privacy policy.
          </p>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Personal Information:</strong> Full name, date of birth, gender, contact details (email, phone number, address), identification information (government ID or medical insurance details), payment information (when making payments for services).
              </li>
              <li>
                <strong>Health Information:</strong> Medical history, prescriptions, clinical data, symptoms, treatment plans, medical test results, and diagnostic reports.
              </li>
              <li>
                <strong>Usage Information:</strong> Device and browser information (IP address, operating system), interaction data (pages visited, services accessed).
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your user experience, store preferences, and analyze traffic. You can modify your cookie settings through your browser at any time.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide, personalize, and improve healthcare services.</li>
              <li>To connect you with healthcare providers and manage appointments.</li>
              <li>To process payments and manage billing.</li>
              <li>To communicate with you regarding medical updates or service changes.</li>
              <li>To ensure compliance with legal and regulatory obligations.</li>
              <li>To analyze usage trends and enhance platform functionality.</li>
            </ul>
            <p>
              We will not use your personal information for any purpose outside of the scope defined in this policy without your explicit consent.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">3. How We Share Your Information</h2>
            <p>We may share your information with the following parties under certain circumstances:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Healthcare Providers:</strong> To deliver medical care or consulting services.</li>
              <li><strong>Payment Processors:</strong> To facilitate transactions securely.</li>
              <li><strong>Legal Authorities:</strong> If required by law or to protect our legal rights.</li>
              <li><strong>Service Providers:</strong> Third-party vendors that assist us in delivering services (e.g., cloud hosting providers).</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">4. Data Security</h2>
            <p>
              We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. These measures include encryption, firewalls, secure servers, and strict access controls. However, no system can be 100% secure, and we encourage users to maintain strong passwords and safeguard their devices.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. If you terminate your account, we will delete your information unless retention is required for legal or regulatory purposes.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">6. Your Rights and Choices</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Access:</strong> You can request a copy of your personal data held by us through the right legal channels.</li>
              <li><strong>Correction:</strong> You can correct or update any inaccurate information.</li>
              <li><strong>Deletion:</strong> You can request the deletion of your personal data, subject to legal or operational retention requirements.</li>
              <li><strong>Consent Withdrawal:</strong> You can withdraw your consent for certain data processing activities at any time.</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided in the Contact Us section.</p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">7. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites, and we encourage users to review their privacy policies.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">8. Children’s Privacy</h2>
            <p>
              Our services are not directed at individuals under the age of 16 years old. We do not knowingly collect personal information from minors. If we discover that we have inadvertently collected such data, we will promptly delete it.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests related to this privacy policy, please contact us at: 
              <a href="mailto:info@badanix.com" className="text-blue-600 hover:underline"> info@badanix.com</a>
            </p>
          </section>

          <p className="mt-4">
            Thank you for trusting BADANIX Digital Healthcare with your personal information. Your privacy is our priority.
          </p>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Privacy;
