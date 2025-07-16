import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { NAMES } from './Constants';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const siteName = NAMES.SITE_TITLE;

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: `What is ${siteName} Digital Healthcare?`,
      answer: `${siteName} is an innovative e-health technology platform that provides remote e-medical services, digital consultations, and access to personalized healthcare solutions through mobile and web applications.`
    },
    {
      question: "How do I book a consultation with a doctor?",
      answer: (
        <>
          <p>To book a consultation, please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li><strong>Log in:</strong> Access the {siteName} app or website with your credentials.</li>
            <li><strong>Select an E-Doctor:</strong> Choose your preferred e-doctor or e-specialist from the available list.</li>
            <li><strong>Choose a Date and Time Slot:</strong> Pick a convenient date and time for your e-consultation and Payment.</li>
            <li><strong>Confirm Appointment:</strong> Doctor Review your details and confirm the appointment.</li>
            <li><strong>Receive Notification:</strong> You will get a notification with further instructions before your session begins.</li>
          </ol>
        </>
      )
    },
    {
      question: "What e-medical services does BADANIX offer?",
      answer: "We offer a range of services including online consultations with general practitioners and e-specialists, e-prescriptions, health monitoring, diagnostic test scheduling, and remote result delivery."
    },
    {
      question: "How do I access my medical records?",
      answer: "Your medical records are securely stored within the BADANIX platform. Log in to your account, go to the 'medical Records' section, and you’ll be able to view your health information."
    },
    {
      question: "Is BADANIX available 24/7?",
      answer: "Yes, BADANIX provides 24/7 access to e-healthcare services, including online consultations and e-emergency assistance."
    },
    {
      question: "Are my personal and medical data secure?",
      answer: "We prioritize your privacy and security. All data is encrypted and stored according to international data protection standards."
    },
    {
      question: "How do I pay for services?",
      answer: "Payments can be made through various channels, including Credit/Debit cards, Mobile money, Bank transfers, and BADANIX wallet."
    },
    {
      question: "Can I use BADANIX without health insurance?",
      answer: "Yes, BADANIX services are accessible to both insured and uninsured patients."
    },
    {
      question: "Can I get medications delivered through BADANIX?",
      answer:   `Yes, once prescribed by an e-doctor, you can take the code to any pharmacy registered with ${siteName} and get your medication from the designated pharmacy .`
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer: "To cancel or reschedule: Log into your account and navigate to 'My Appointments.' Select the appointment you want to modify."
    },
    {
      question: "What should I do if I encounter technical issues?",
      answer: "If you experience any issues, please contact our support team through Email: support@badanix.com."
    },
   
    {
      question: "Can I speak with e-specialists on the platform?",
      answer: "Yes, BADANIX connects you to e-practitioner."
    },
    {
      question: "Is BADANIX available outside my country?",
      answer: "Currently, BADANIX operates in many countries globally."
    },
    {
      question: "How do I become a partner or healthcare provider on BADANIX?",
      answer: "Healthcare professionals and facilities interested in partnering with us can apply through the 'Partner with us button in the homepage'."
    }
  ];

  return (
    <div className="bg-gray-50 pb-16">
      {/* FAQ Section */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
        <p className="text-lg text-center mb-10">Find answers to commonly asked questions about our {siteName}.</p>
        
        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-xl">
              <button
                className="flex justify-between items-center w-full px-4 py-3 text-lg font-semibold text-left focus:outline-none hover:bg-gray-100 transition duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className='p-5'>{faq.question}</span>
                <span>
                  {openIndex === index ? <MdKeyboardArrowUp size={24} className="text-blue-500" /> : <MdKeyboardArrowDown size={24} className="text-blue-500" />}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-4 bg-blue-50 text-gray-700 border-t-2 border-blue-200 p-5">
                  <p className="text-md leading-relaxed p-5">{typeof faq.answer === 'string' ? faq.answer : faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
