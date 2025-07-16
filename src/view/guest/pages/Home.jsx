import HeroSection from '../../../components/HeroSection';
import ServicesSection from '../../../components/ServicesSection';
import CoreServicesSection from '../../../components/CoreServicesSection';
import FAQSection from '../../../components/FAQSection';
import Footer from '../../../components/Footer';
import DownloadApp from '../../../components/DownloadApp';


function Home() {
 
  return (
    <div className="">
      <HeroSection />
      <ServicesSection />
      <CoreServicesSection />
      <DownloadApp/>
      <FAQSection />
      <div className="bg-gray-200 py-10">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center">Connect With Us</h3>
          <p className="mt-2 text-center">
            Follow us on social media to stay updated on our latest innovations, events, and e-health services.
          </p>
         
          <p className="mt-6 italic text-gray-600 text-center">
            Let’s Build a Healthier Future, Together!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
