import Slider from 'react-slick';
import Footer from '../../../components/Footer';
import HeroPages from '../../../components/HeroPages';

const Testimonal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Slides every 2 seconds
    arrows: true, // Show navigation arrows
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets and smaller screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Adjust for mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };




  return (
    <div>
      {/* Hero Section */}
      <HeroPages 
        HeroPagesHeading="BADANIX DIGITAL HEALTHCARE TESTIMONIALS" 
        HeroPagesParagraph="Discover how BADANIX Digital Healthcare has transformed the healthcare experience for patients, healthcare providers, and partners. Hear directly from those whose lives and services have improved through our cutting-edge digital solutions."
        bgImageUrl="../../images/hospitalImg.png"
      />

      {/* Introduction */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Impact Through Real Stories</h2>
          <p className="text-lg text-gray-600 mb-8">
          &quot;At BADANIX DIGITAL HEALTHCARE, we believe in the power of transformation through technology. Here are some inspiring stories from our users who have experienced significant improvements in their healthcare journey with us. &quot;
          </p>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Slider {...settings}>
            {/* Testimonial 1 */}
            <div className="p-4">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="John Danta" className="w-24 h-24 rounded-full mx-auto lg:mx-0" />
                <div>
                  <p className="italic text-gray-700 text-lg">
                  &quot;I was initially hesitant about using a digital healthcare platform, but BADANIX has completely changed my perspective. The convenience of scheduling appointments and consulting with my doctor from home has been a game-changer. The team is professional and responsive, making my healthcare journey much smoother. I highly recommend BADANIX to anyone looking for reliable healthcare solutions! &quot;
                  </p>
                  <h3 className="mt-4 font-semibold text-primary">John Danta</h3>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-4">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img src="../../images/aebdd484dcdd907b78a276c4130cfe82.jpg" alt="Dr. Sarah Kesandra" className="w-24 h-24 rounded-full mx-auto lg:mx-0" />
                <div>
                  <p className="italic text-gray-700 text-lg">
                  &quot;As a healthcare provider, I am always looking for ways to enhance patient care. BADANIX has provided me with the tools to connect with my patients effectively, even when we can’t meet in person. The platform’s user-friendly interface and comprehensive features have made consultations easier and more efficient. I appreciate how BADANIX prioritizes patient safety and satisfaction! &quot;
                  </p>
                  <h3 className="mt-4 font-semibold text-primary">Dr. Sarah Kesandra</h3>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-4">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img src="https://images.pexels.com/photos/9629677/pexels-photo-9629677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Emily Rose" className="w-24 h-24 rounded-full mx-auto lg:mx-0" />
                <div>
                  <p className="italic text-gray-700 text-lg">
                  &quot;Partnering with BADANIX DIGITAL HEALTHCARE has allowed us to expand our services and reach more patients in need. Their commitment to leveraging technology for better healthcare delivery aligns perfectly with our mission. The collaboration has been fruitful, and we’re excited about the future projects we can undertake together!&quot;
                  </p>
                  <h3 className="mt-4 font-semibold text-primary">Emily Rose, CEO of Health Innovations Inc.</h3>
                </div>
              </div>
            </div>
             {/* Testimonial 4 */}
             <div className="p-4">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img src="../../images/aebdd484dcdd907b78a276c4130cfe82.jpg" alt="Dr. Sarah Kesandra" className="w-24 h-24 rounded-full mx-auto lg:mx-0" />
                <div>
                  <p className="italic text-gray-700 text-lg">
                  &quot;As a healthcare provider, I am always looking for ways to enhance patient care. BADANIX has provided me with the tools to connect with my patients effectively, even when we can’t meet in person. The platform’s user-friendly interface and comprehensive features have made consultations easier and more efficient. I appreciate how BADANIX prioritizes patient safety and satisfaction!&quot;
                  </p>
                  <h3 className="mt-4 font-semibold text-primary">Dr. Sarah Kesandra</h3>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us & Share Your Experience</h2>
        <p className="mb-6">
          We value your feedback and encourage you to share your experience with BADANIX. Your testimonial helps others understand how our digital healthcare solutions can make a difference. Please use the form below to submit your story.
        </p>
      </section>

      {/* Feedback Form */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">Share Your Story</h2>
          <form 
            className="bg-white p-6 rounded-lg shadow-md"
            method="post"
            action="mailto:info@badanix.com"
          >
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-primary"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-primary"
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="testimonial">
                Testimonial
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-primary"
                id="testimonial"
                name="testimonial"
                placeholder="Share your experience..."
                rows="4"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
              >
                Submit Testimonial
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Testimonal;
