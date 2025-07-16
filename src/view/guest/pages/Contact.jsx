import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Contact = () => {
  return (
    <div>
      <HeroPages 
        HeroPagesHeading="Contact Us" 
        HeroPagesParagraph="We’d love to hear from you! Whether you have inquiries, need support, or want to explore partnership opportunities, feel free to reach out. Our team is here to assist you and provide the best solutions for your needs." 
        bgImageUrl="../../images/hospitalImg.png"
      />

      <div className="container mx-auto px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Get in Touch</h2>

        {/* General Inquiries Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">General Inquiries</h3>
          <p className="mb-2">📧 Email: <a href="mailto:info@badanix.com" className="text-blue-600 hover:underline">info@badanix.com</a></p>
          <p>🌐 Website: <a href="https://www.badanix.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.badanix.com</a></p>
        </div>

        {/* Customer Support Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Customer Support</h3>
          <p>For product support, service requests, or troubleshooting, contact our support team:</p>
          <p className="mb-2">📧 Support Email: <a href="mailto:support@badanix.com" className="text-blue-600 hover:underline">support@badanix.com</a></p>
        </div>

        {/* Partnerships Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Partnerships, Collaborations, and Adverts</h3>
          <p>Interested in partnering with us to build innovative health solutions? Reach out to our business development team:</p>
          <p className="mb-2">📧 Email: <a href="mailto:partnerships@badanix.com" className="text-blue-600 hover:underline">partnerships@badanix.com</a></p>
        </div>

        {/* Social Media Section */}
    
      </div>
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
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
