import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const About = () => {
  return (
    <div className="bg-gray-50">
      
      {/* Hero Section */}
      <HeroPages 
        HeroPagesHeading="About Us" 
        bgImageUrl="../../images/gadgets.jpg" 
      />

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 lg:px-0">
        {/* Introduction */}
        <section className="text-center py-10">
          <h2 className="text-3xl font-extrabold text-primary mb-6">About BADANIX Digital Healthcare</h2>
          <p className="text-lg text-gray-700">
            At BADANIX Digital Healthcare, we are committed in transforming to e-healthcare through the power of technology. 
            Our mission is to deliver innovative, accessible, and reliable digital healthcare solutions that enhance 
            well-being, streamline e-clinical workflows, and empower e-healthcare providers to offer high-quality care.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            With a focus on the future, BADANIX bridges the gap between cutting-edge technology and compassionate care.
          </p>
        </section>

        {/* Core Values Section with Images */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10">
          <div>
            <img src="../../images/coreValue.jpg" alt="Innovation" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-primary mb-6">Our Core Values</h2>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li><strong>Innovation:</strong> Harnessing the latest technologies to develop groundbreaking e-healthcare solutions.</li>
              <li className="mt-2"><strong>Compassion: </strong>Our solutions prioritize the e-patient experience, ensuring that technology enhances empathy in care delivery.              </li>
              <li className="mt-2"><strong>Accessibility: </strong>We believe that everyone deserves access to quality e-healthcare, regardless of location or financial status globally.              </li>
              <li className="mt-2"><strong>Integrity:</strong> Transparency, privacy, and data security are at the core of everything we do.</li>
              <li className="mt-2"><strong>Collaboration: </strong>We work closely with e-healthcare providers, e-patients, and technology partners to create impactful solutions.
              </li>
            </ul>
          </div>
        </section>

        {/* Our Vision */}
        <section className="text-center py-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700">
            To become a global leader in digital healthcare, reshaping the delivery of medical services through seamless, e-patient-centered solutions and enabling healthier lives for all.
          </p>
        </section>

        {/* Our Mission */}
        <section className="text-center py-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700">
            We aim to empower e-healthcare providers and e-patients with intuitive digital tools that enhance accessibility, transparency, and efficiency in e-healthcare delivery. By integrating advanced technologies into every touchpoint of care, we are committed to making high-quality e-healthcare services available and affordable to all.
          </p>
        </section>

        {/* Services with Images */}
               <section className="py-10">
          <h2 className="text-2xl font-bold text-primary text-center mb-10">What We Offer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Service 1 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/fc407400e9.jpg" alt="Telemedicine Services" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Telemedicine Services</h3>
                <p className="text-gray-700">
                BADANIX offers secure, virtual consultations with licensed e-healthcare professionals, enabling e-patients to access care from the comfort of their homes. Our telemedicine platform supports video consultations, remote monitoring, and e-prescriptions, ensuring that care is just a click away.

                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/gadgets.jpg" alt="EHR System" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Electronic Health Records (EHR)</h3>
                <p className="text-gray-700">
                Our EHR solution enables healthcare facilities to store, manage, and access e-patient data efficiently. It improves clinical decision-making through real-time access to medical histories, lab results, and medication records, ensuring seamless coordination across departments and providers.

                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/aidigonistic.jpg" alt="AI-powered Diagnostics" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">AI-powered Diagnostics and Moimtoring</h3>
                <p className="text-gray-700">
                With Artificial Intelligence integrated into our diagnostic tools, e-healthcare providers can make faster and more accurate diagnoses. Our AI algorithms assist in predicting e-health risks, interpreting medical images, and monitoring chronic conditions, reducing human error and enhancing care quality.

                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/84c445573b.jpg" alt="e-Health Management Apps
" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">E-Health Management Apps
                </h3>
                <p className="text-gray-700">
                BADANIX offers mobile apps that help e-patients track their e-health metrics, book appointments, manage prescriptions, and stay informed through personalized e-health content. These apps empower users to take control of their well-being and maintain healthier lifestyles.

                </p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/ba7fece653.jpg" alt="Hospital Management Systems (HMS)" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Hospital Management Systems (HMS)</h3>
                <p className="text-gray-700">
                Our advanced HMS simplifies administrative tasks such as billing, inventory management, and e-patient scheduling. With our solutions, e-healthcare institutions can improve operational efficiency, reduce costs, and ensure better e-patient outcomes.

                </p>
              </div>
            </div>

            {/* Service 6 */}
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="../../images/wearables.webp" alt="Wearable Technology Integration
" className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">Wearable Technology Integration
                </h3>
                <p className="text-gray-700">
                We partner with wearable device manufacturers to collect real-time e-health data, including heart rate, blood pressure, and glucose levels etc. This integration supports preventive care and provides valuable insights to e-healthcare professionals for continuous e-patient monitoring.

                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Why Choose Us */}
        <section className="bg-primary py-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose BADANIX?</h2>
          <p className="text-lg mb-6">E-Patient-Centered Solutions | End-to-End Support | Advanced Security Measures</p>
          <p className="text-lg">Scalable Solutions | Global Reach | Impactful Change</p>
        </section>

        {/* Call to Action */}
        <section className="text-center py-10">
          <h2 className="text-2xl font-bold text-primary mb-6">Join Us in Shaping the Future of E-Healthcare</h2>
          <p className="text-lg text-gray-700">
            At BADANIX Digital Healthcare, we believe in a future where technology and medicine intersect to create healthier communities. 
            Whether youre a provider looking to digitize your practice or a e-patient seeking more accessible care, join us on this journey.
          </p>
          <div className="mt-6">
            <button className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-primary-dark">Download Our App</button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
