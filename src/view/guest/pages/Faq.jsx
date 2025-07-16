import FAQSection from '../../../components/FAQSection';
import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Faq = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroPages 
        HeroPagesHeading="Frequently Asked Questions" 
        HeroPagesParagraph='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis quam euismod, suscipit urna sit amet, ultrices mi' 
        bgImageUrl='../../images/hospitalImg.png'
      />

      {/* Main Content Section */}
      <div className="pt-20 pb-10 bg-white text-center">
        {/* Mission Statement */}
        <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
        <p className="mt-4 text-lg">
          We strive to provide the best services and quality care to our patients.
        </p>
        
        {/* FAQ Section */}
        <FAQSection />
      </div>

      {/* Additional Information */}
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
};

export default Faq;
