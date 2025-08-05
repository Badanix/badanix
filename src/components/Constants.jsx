import { FaUserTie, FaHospital,FaClinicMedical, FaUsers, FaArrowUp,  FaBookMedical,FaWallet, FaHistory, FaDollarSign, FaBorderAll } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAccountBalanceWallet,  MdLocalPharmacy, MdSick } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";

import { HiDotsHorizontal } from "react-icons/hi";
import { HiBanknotes } from "react-icons/hi2";
import { FaUserMd, FaCalendarAlt, FaFileMedical, FaCog, FaSignOutAlt } from "react-icons/fa";
import { AiFillSchedule } from 'react-icons/ai';
import {  IoSettings } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import { LiaPrescriptionBottleAltSolid } from "react-icons/lia";
import { getUserData, logout } from "./Helper";
import countriesData from './country.json';
import { BiSolidClinic } from "react-icons/bi";
import specialization from './specialization.json';

export const userData= getUserData();
export const defaultUrl= 'https://api.digitalhospital.com.ng/';

export const currencies = [
  { name: 'Naira', symbol: '₦', sign: 'NGN' },
  { name: 'Dollar', symbol: '$', sign: 'USD' },
  { name: 'Euro', symbol: '€', sign: 'EUR' },
  // Add more currencies as needed
];

// src/constants.js
export const NAMES ={
  // Bgherorailway: '/images/home-atf-arrows.svg',
  Bgherorailway:'',
  GOOGLEDOWNLOAD :"",
  APPLEDOWNLOAD :"",
  DIAMONDS:userData?.data?.cash_backs || 0.00,
FEATURE_FLAG : true,
PATIENTWAITINGCOUNT:58,
PATIENTUPCOMINGNAME: 'SAMUEL NECTAR OKOLO',
TOTALPATIENTATTENDED:258,
WITHDRAWNAMOUNT:45000,
AVAILABLEBALANCE:42000,
 SITE_TITLE: 'BADANIX',
 USER: 'Eberechukwu',
 FULLNAME :'Eberechukwu Owunna',
 BOT:'MedBot',

WALLETBALANCE: userData?.data?.acctbal || 0.00, 

 selectedCurrency: {
  symbol: FaDollarSign, 
  sign: 'Naira',

}, NairaSymbol: '₦',
currency:"NGN",
 VAT: 1.20,
 DISCOUNT:20.00,
 LOGOWHITE:'/images/white-logo.jpg',
 LOGO:'/images/badanix.png',
 phoneImg: '/images/mobile-hand.webp',
 appOne:'/images/app-one.png',
 appTwo:'/images/app-two.png',
 FACEBOOK: 'https://facebook.com',
INSTAGRAM: 'https://instagram.com',
TWITTER: 'https://twitter.com',
MAIL: 'info@badanix.com',
phoneNumber: '+1234567890',
 TestingName:`${defaultUrl}api/v1/`,
 userImage: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F531329%2Fpicture%2Foptimized%2Fhuge_d128a932a04fe497d27e54741d3eb357-1fd5f8d1a2817df5183dccfed7570f35.jpg&width=480',

 bannerrimg: '/images/doctor.png',
 APPOINTMENTDATE: '2024-10-14 22:45:00',
 DOCTORSCALENDARCOUNT: 20
};

 const testingName = NAMES.TestingName
export const APIURLS={
  APILOGOUT: `${testingName}`,
  APIURLPATIENTSPAY: `${testingName}pay`,
  VERIFY_PAYMENT_URL:`${testingName}pay/verify?reference`,
  APIURLPATIENTSPROFILE: `${testingName}user/profile`,
  APIURLPATIENTSFORGOTPASSWORD: `${testingName}user/forgotpassword`,
  APIURLPATIENTSCHANGEPASSWORD:`${testingName}user/password`,
  APIURLDOCTORFORGOTPASSWORD: `${testingName}doctor/forgotpassword`,
  APIURLINSTITUTIONFORGOTPASSWORD: `${testingName}institution/forgotpassword`,
  APIURLPATIENTSFINDDoctorSpecializationSearch:`${testingName}user/find/doctor?`,
  APIURLDOCTORFINDPATIENTSearch:`${testingName}doctor/find/user`,
  APIURLPATIENTSGETDOCTORAVAILABITY:`${testingName}user/doctor/available?`,
  INSITUTION_API:`${testingName}user/find/institution?`,
  APICANCELBOOKING:`${testingName}booking/cancel`,
  APIACCEPTBOOKING:`${testingName}booking/accept`,
  APIURLPATIENTSRESETCODE:`${testingName}user/reset?otp=`,
  APIURLDOCTORSRESETCODE:`${testingName}user/reset?otp=`,
  APIURLINSTITUTIONRESETCODE:`${testingName}user/reset?otp=`,
  APIURLPATIENTSRESETCODEAGAIN:`${testingName}user/`,
  APIURLDOCTORSRESETCODEAGAIN:`${testingName}user/`,
  APIURLINSTITUTIONRESETCODEAGAIN:`${testingName}user/`,
  APIUSERPASSWORD: `${testingName}user/password`,
  APIURLPATIENTSFINDPHARMACY: `${testingName}user/find/institution?institution_type=pharmacy`,
  APIURLPATIENTSFINDLABORATORY:`${testingName}user/find/institution?institution_type=laboratory`,
  APIURLPATIENTSAPPOINTMENTS: `${testingName}user/booking`,
  APIURLDOCTORAPPOINTMENTS:`${testingName}doctor/booking`,
  APIURLUSERFINDDOCTOR: `${testingName}user/find/doctor?id=`,
  APIURLPATIENTSFINDHOSPITAL: `${testingName}user/find/institution?institution_type=hospital`,
  APIVIDEOCALLFILEUPLOAD: `${testingName}user/profile`,
  APIDOCTORCATEGORYSEARCH:`${testingName}user/find/doctor?fullname=`,
  APIUSERNOTIFICATION: `${testingName}user/notifications`,
  APIURLPATIENTSREGISTER: `${testingName}user/register`,
  APIURLDOCTORSREGISTER: `${testingName}doctor/register`,
  APIDoctorOnboarding:`${testingName}doctor/profile`,
  APIInstitutionOnboarding:`${testingName}institution/profile`,
  APIPatientOnboarding:`${testingName}user/profile`,
  APIURLINSTITUTIONREGISTER: `${testingName}institution/register`,
  APIURLPATIENTSLOGIN: `${testingName}user/login`,
  APIURLDOCTORSLOGIN: `${testingName}doctor/login`,
  APIURLINSTITUTIONLOGIN: `${testingName}institution/login`,
  APIURLPATIENTSAVATAR: `${testingName}user/avatar`,
  APIURLINSTITUTIONAVATAR: `${testingName}institution/avatar`,
  APIURLDOCTORAVATAR:`${testingName}doctor/avatar`,
  APIURLDOCTORSCHANGEPASSWORD : `${testingName}doctor/password`,
  APIDOCTORCALENDARSUBMIT: `${testingName}doctor/available`,
  APIURLPATIENTSVERIFY: `${testingName}user/verify`,
  APIPATIENTBOOKING :`${testingName}user/booking`,
  APIURLDOCTORSVERIFY: `${testingName}doctor/verify`,
  APIURLINSTITUTIONVERIFY: `${testingName}institution/verify`,
  APIURLPATIENTRESENDEMAILCODE: `${testingName}user/resend`,
  APIURLDOCTORSRESENDEMAILCODE: `${testingName}doctor/resend`,
  APIURLINSTITUTIONRESENDEMAILCODE: `${testingName}institution/resend`,
  APIURLLABORATORYGETTRANSACTION:`https://fakestoreapi.com/products`,
  APIURLLABORATORYSENDPRICEORDER:`https://fakestoreapi.com/products`,
  APIINSTITUTIONBANKLINKACCOUNT :`https://fakestoreapi.com/products`,
  APIINSTITUTIONWALLETWITHDRAWAL :`${testingName}institution/transaction`,
  APIDOCTORPAYMENT:`${testingName}doctor/transaction`,



};

export const IMAGE= {
  faPatient : '/images/Home.svg',
  bitpay: '/images/bitpay.svg',
  coingate: '/images/coingate.svg',
  paystack: '/images/Paystack.jpg',
  paypal:'/images/paypal.png',
  flutterwave:'/images/Flutterwave.png',
  DefaultImageBanner:'/images/pexels-photo-5452291.webp',
  LOGO: '/images/badanix.png',
  GOOGLEDOWNLOAD :"/images/googleplay.png",
  APPLEDOWNLOAD :"",
 joinUs: '/images/Doc-3-image.png',
 joinUs2 :'https://www.elixdoc.com/images/Doc-1-image.png',
  heartRate:'/images/heart-rate.png',
  temperatureCheck:'/images/thermometer.png',
  temperatureGif:'/images/temperature.gif',
  bodyPressure:'https://img.icons8.com/?size=100&id=13002&format=png&color=000000',
  bodyHeight: 'https://img.icons8.com/?size=100&id=pDNEMNWV6ybf&format=png&color=000000',

    auth_bg_image:'https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=600',
    site_logo: '/images/badanix.png',
    doctorIcon:'/images/doctor.png',
    pharmacyIcon:'/images/pharmacy.png',
    hospitalIcon:'/images/hospital.png',
    ambulanceIcon:'/images/ambulance.png',
    carosuelOne:'https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-hospital-icon-symbols-in-3d-rendering-on-a-horizontal-green-background-image_3681062.jpg',
    carosuelFour:'https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-hospital-icon-symbols-in-3d-rendering-on-a-horizontal-green-background-image_3681062.jpg',
    carosuelThree:'https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-hospital-icon-symbols-in-3d-rendering-on-a-horizontal-green-background-image_3681062.jpg',

    carosuelTwo:'https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-hospital-icon-symbols-in-3d-rendering-on-a-horizontal-green-background-image_3681062.jpg',
    carosuelFive:'https://png.pngtree.com/thumb_back/fh260/background/20230625/pngtree-hospital-icon-symbols-in-3d-rendering-on-a-horizontal-green-background-image_3681062.jpg',
    login_img: '/images/download.png',
    register_icon: '/images/Gemini-image.png',
    notfound: '/images/404-error.png',
    forbidden: '/images/403-error.png',
    register_img: '/images/trade_life_cycle.png',
    preloader: '/images/nexo.png',
    metamask :'/images/metamask.png',
    ledger :'/images/ledger.png',
    guarda:'/images/guarda.jpeg',
    trustWallet: '/images/trustwallet.png',
    phatom: '/images/phatom.png',
    solflare:'/images/solflare.png',
    blockchain:'/images/blockchain.png',
    Argent:'/images/argent.png',
    eidoo:'/images/eidoo.png',
    coinbase:'/images/coinbase.png',
    edge:'/images/edge.png',
    crypto:'/images/crypto.png',
    surgeon:'/images/surgeon.png',
    cardiologist:'/images/cardiologist.png',
    radiologist: '/images/radiologist.png',
    patientImg:'/images/institution.webp',
    pharmacyImg:'https://images.pexels.com/photos/19471016/pexels-photo-19471016/free-photo-of-young-pharmacist-writing-notes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    institutionImg:'/images/institution.webp',
    doctorImg: '/images/doctor.webp',
    articleOne:'https://images.pexels.com/photos/8463551/pexels-photo-8463551.jpeg?auto=compress&cs=tinysrgb&w=600',
    articleTwo:'https://images.pexels.com/photos/12778329/pexels-photo-12778329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    articleThree:'https://images.pexels.com/photos/27892146/pexels-photo-27892146/free-photo-of-a-brown-bag-with-berries-and-sunglasses-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    articleFour:'https://images.pexels.com/photos/339620/pexels-photo-339620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    articleFive:'https://images.pexels.com/photos/8949916/pexels-photo-8949916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

  };
  export const DOWNLOAD={
    android_download:'https://play.google.com/store/apps/details?id=YOUR_APP_ID',
    apple_download:'https://apps.apple.com/app/idYOUR_APP_ID',
    desktop_download:'https://c.s-microsoft.com/en-us/CMSImages/windows7-laptop.png?version=7a4789c6-58a8-f3eb-3fa4-a834d84db84a'
  };


  export const doctorProfileFields = [
    { label: "Date of Birth", type: "date", name: "dob" },
    { label: "Gender", type: "select", name: "gender", options: ["female", "male", "other"] },
    { label: "Preferred Language", type: "select", name: "pref_language", options: ["English", "Mandarin", "French", "Español"] },
    { label: "Phone", type: "text", name: "phone" },
    { label: "Address", type: "text", name: "address" },
    { label: "City", type: "text", name: "city" },
    { label: "State", type: "text", name: "state" },
    { label: "Country", type: "select", name: "country", options: countriesData.map((country) => country.value) },
    { label: "Zip Code", type: "text", name: "zipcode" },
    { label: "License Type", type: "text", name: "license_type" },
    { label: "License Number", type: "text", name: "license_no" },
    { label: "Issuing Authority", type: "text", name: "issuing_authority" },
    { label: "Expiry Date", type: "date", name: "expiry_date" },
    { label: "Accreditations", type: "text", name: "accreditations" },
    { label: "Services", type: "text", name: "services" },
  ];

  export   const profileFields = [
    { label: "Date of Birth", type: "date", name: "dob" },
    { label: "Gender", type: "select", name: "gender", options: ["female", "male", "Other"] },
    { label: "Profile Image", type: "file", name: "prof_pics" },

    { label: "Preferred Language", type: "select", name: "pref_language", options: ["English","Mandarin", "French",  "Espanol"] },

    { label: "Phone", type: "phone", name: "phone" },
    { label: "Address", type: "text", name: "address" },
    { label: "City", type: "text", name: "city" },
    { label: "State", type: "text", name: "state" },
    { label: "Country", type: "select", name: "country", options: countriesData.map(country => country.value) },
    { label: "Zip Code", type: "text", name: "zipcode" },
    { label: "Name of Insurance Provider", type: "text", name: "name_insurance_provider" },
    { label: "Type of Insurance Provider", type: "text", name: "type_insurance_provider" },
    { label: "Policy Number", type: "text", name: "policy_number" },
    { label: "Insurance Coverage", type: "text", name: "insurance_coverage" },

    { label: "Insurance Validity Period", type: "text", name: "insurance_validity_period" },
    { label: "Weight", type: "text", name: "weight" },
    { label: "Height", type: "text", name: "height" },
    { label: "Exercise Routine", type: "text", name: "exercise_routine" },
    { label: "Nutrition Plan", type: "text", name: "nutrition_plan" },
    { label: "Smoking Habit", type: "select", name: "smoking_habits", options: ["Regular", "Frequent"] },
    { label: "Alcohol Consumption", type: "select", name: "alcohol_consumption", options: ["Regular", "Frequent"] },
    { label: "Sleep Pattern", type: "select", name: "sleep_pattern", options: ["Regular", "Irregular"] },
    { label: "Blood Type", type: "select", name: "blood_type", options: ["A+", "AB+", "A-", "AB-", "O+", "O-"] },
    { label: "Name of Primary Physician", type: "text", name: "name_primary_physician" },
    { label: "Existing Medical Conditions", type: "textarea", name: "existing_med_condition" },
    { label: "Current Medication", type: "text", name: "current_medication" },
    { label: "Allergies", type: "textarea", name: "allergies" },
    { label: "Past Surgeries", type: "textarea", name: "past_surgeries" },
    { label: "Chronic Illness", type: "textarea", name: "chronic_Illness" },
    { label: "Mental Health", type: "textarea", name: "mental_health" },
    { label: "Family Health History", type: "textarea", name: "family_health_history" },
  ];

  export const WALLETS = [
    { name: 'MetaMask', icon: IMAGE.metamask },
    { name: 'TrustWallet', icon: IMAGE.trustWallet },
    { name: 'Phatom', icon: IMAGE.phatom },
    { name: 'SolFlare', icon: IMAGE.solflare },
    { name: 'BlockChain', icon: IMAGE.blockchain },
    {name: 'Argent', icon: IMAGE.Argent},
    {name: 'Crypto.com', icon: IMAGE.crypto},
    {name: 'Ledger', icon: IMAGE.ledger},
    {name: 'Guarda', icon: IMAGE.guarda},
    {name: 'Eidoo', icon: IMAGE.eidoo},
    {name: 'Coinbase', icon: IMAGE.coinbase},
    {name: 'Edge', icon: IMAGE.edge},
  ];
  export const SERVICES = [
    { icon: <FaUserDoctor size={30} />, name: "Doctors", link: '/doctors' }, 
    { icon: <GiMedicines size={30} />, name: "Pharmacies", link: '/pharmacies' },
    { icon: <FaClinicMedical size={30} />, name: "Hospitals", link: '/hospitals' },
    { icon: <BiSolidClinic size={30} />, name: "Laboratories", link: '/laboratories' },
  ];

  export const UserTypeIcons = [
    { type: 'patient', icon: <MdSick size={25} /> },
    { type: 'pharmacy', icon: <MdLocalPharmacy size={25} /> },
    { type: 'doctor', icon: <FaUserDoctor size={25} /> },
    
    { type: 'institution', icon: <FaHospital size={25} /> },
    { type: 'default', icon: <FaUserTie size={25} /> }
  ];

  export const UserTypeImage = 
    {
      pharmacy: IMAGE.pharmacyImg,
      doctor: IMAGE.doctorImg,
      patient: IMAGE.patientImg,
      institution: IMAGE.institutionImg,
      default: IMAGE.patientImg 
    };
  

  const doctorSpecializationOptions = Object.keys(specialization).map((title) => title);
  export const fieldConfigs = {
      patient: [
        { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Email Address', renderSuggestions: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password' },
        { name: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: 'Enter your Confirm Password' },
        // { name: 'dob', label: 'Date of Birth', type: 'date', placeholder: 'Enter your Date of Birth' },
        // {
        //   name: 'gender',
        //   label: 'Gender',
        //   type: 'select',
        //   options: ['Male', 'Female', 'Transgender', 'Other'],
        //   placeholder: 'Choose Your Gender',
        // },
        // { name: 'address', label: 'House Address', type: 'text', placeholder: 'Enter your House Address' },
        // { name: 'phoneNumber', label: 'Mobile Number', type: 'number', placeholder: 'Enter phone number', additionalProps: { countryCode: true } },
        // // {
        //   name: 'referral',
        //   label: 'Referral Code',
        //   type: 'text',
        //   id: 'referral',
        //   placeholder: 'Enter referral code if available',
        //   showReferral: true,
        // },
      ],
      doctor: [
        { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Email Address', renderSuggestions: true },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password' },
        { name: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: 'Enter your Confirm Password' },
        {
          name: 'specialization',
          label: 'Specialization',
          type: 'select',
          options: doctorSpecializationOptions,
          placeholder: 'Choose Your Specialization',
        },
        // { name: 'phoneNumber', label: 'Mobile Number', type: 'number', placeholder: 'Enter phone number', additionalProps: { countryCode: true } },
        
      
      
      ],
      institution: [
        {
          name: 'institution_type',
          label: 'Institution Type',
          type: 'select',
          options: ['Pharmacy', 'Hospital', 'Laboratory'],
          placeholder: 'Choose Institution Type', required: true,
        },
        {
          name: 'institution_name',
          label: 'Institution Name',
          type: 'text',
          placeholder: `Enter institution Name`,
          required: true,
        },
        {
          name: 'email',
          label: 'Institution Email',
          type: 'email',
          placeholder: `Enter hospital name`,
          required: true, renderSuggestions: true
        },
        { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your Password', required: true },
        { name: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your Password', required: true },
      ],
    };
    

    
    export const FAQ_DATA = [
      {
        question: 'What is this service?',
        answer: 'This is a customer service portal where you can get help and support.',
      },
      {
        question: 'How can I contact support?',
        answer: 'You can contact support via email or phone.',
      },
      {
        question: 'What is the return policy?',
        answer: 'Our return policy allows returns within 30 days of purchase.',
      },
      // Add more questions and answers here
    ];
    

    export const COMMON_QUESTIONS =[
      {
        question: 'I want to connect to a Doctor',
      },
      {
        question: 'Which Pharmacy is closer to me?',
      },
      {
        question: 'Which services do you offer?',
      },
    ]

    // constants.jsx
    export const AI_MESSAGES = {
      HELLO: {
        text: `Hello, I'm ${NAMES.BOT}. can I know your name?`,
        keywords: ['hello', 'hi', 'hey'],
        sender: 'ai',
      },
     
      WELCOME: (name, greeting) => ({
        text: `${greeting} ${name}! How can I assist you today?`,
        sender: 'ai',
      }),
      DEFAULT_RESPONSE: {
        text: "Hi! I’m the AI sales expert 🤖. I’m here to help you choose the perfect hosting plan for your project. Tell me about your needs, and I’ll guide you through selecting the best hosting solution.",
        sender: 'ai',
      },
    };
    
  
    export const Doctor= [
      {
      img:IMAGE.surgeon, title: "Surgeon", description: "Surgeons operate on patients to treat injuries, such as broken bones; diseases, such as cancerous tumors; and deformities, such as cleft palates. There are two types of physicians, with similar degrees: M.D. (Medical Doctor) and D.O. (Doctor of Osteopathic Medicine",
    },
    {
      img:IMAGE.cardiologist, title: "Cardiologist",
      description: "A cardiologist is a physician who's an expert in the care of your heart and blood vessels. They can treat or help you prevent a number of cardiovascular problems. They can also specialize in specific areas, like abnormal heart rhythms, heart failure or heart problems you've had since birth.",
    },
    {
      img:IMAGE.radiologist, title: "Radiologist",
      description: "Radiologists are medical doctors that specialize in diagnosing and treating injuries and diseases using medical imaging (radiology) procedures (exams/tests) such as X-rays, computed tomography (CT), magnetic resonance imaging (MRI), nuclear medicine, positron emission tomography (PET) and ultrasound.",
    },
    {
      img:IMAGE.surgeon, title: "Physiotherapist", description:"A physiotherapist, or physical therapist, works with patients to help them manage pain, balance, mobility, and motor function. Most people at some point in their lifetime will work with a physiotherapist. You may have been referred to one after a car accident, after surgery, or to address low back pain.",
    },
    {
      img:IMAGE.cardiologist, title: "Dermatologist",description:"Dermatologists are medical doctors who specialize in skin, hair and nails. Dermatologists also handle cosmetic disorders, like hair loss and scars. Your dermatologist will examine you, order lab tests, make a diagnosis and treat your condition with medication or a procedure.",
    },
    {
      img:IMAGE.radiologist, title: "Oncologist",description:"A doctor who has special training in diagnosing and treating cancer. Some oncologists specialize in a particular type of cancer treatment. For example, a radiation oncologist specializes in treating cancer with radiation.",
    },
    {
      img:IMAGE.radiologist, title: "peditrican",description:"A doctor who has special training in preventing, diagnosing, and treating diseases and injuries in children. Pediatricians also help manage other problems that affect children, such as developmental disorders and behavioral, emotional, and social problems.",
    },
    {
      img:IMAGE.surgeon, title: "obstetrician",description:"An obstetrician is a physician that specializes in delivering babies and caring for people during pregnancy and after they give birth. They treat medical conditions unique to pregnancy and perform surgeries related to labor and delivery.",
    },
    {
      img:IMAGE.cardiologist, title: "psychiatrist",description:"Psychiatrists diagnose, treat, and prevent mental, emotional, and behavioral disorders with the use of medication, neuromodulation, and psychotherapy.” We've outlined some basic information to give you a better idea of what a psychiatrist job entails. Common conditions treated by psychiatrists: Insomnia.",
    },
    {
      img:IMAGE.radiologist, title: "dentist ",description:"Dentists diagnose and treat problems with patients' teeth, gums, and related parts of the mouth. They provide advice and instruction on taking care of the teeth and gums and on diet choices that affect oral health.",
    },
    
  ]



 export const cardSlider = [
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F915322%2Fpicture%2Foptimized%2Fhuge_06273bf08965873b43ac9576f6336700-ad18e5a458e8496a3348230b629edf6b.jpeg&width=480', 
    name: 'Paula Ylisassi',
    title: 'Dermatologist',
    reviewIcon: '⭐', 
    reviewNumber: 4.5,
    reviewTotal: 286,
    state: 'imo',
    country :' Nigeria',
    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F531329%2Fpicture%2Foptimized%2Fhuge_d128a932a04fe497d27e54741d3eb357-1fd5f8d1a2817df5183dccfed7570f35.jpg&width=480', // Replace with actual image URLs
    name: 'Ernesto Suguer',
    title: 'Cardologist',
    reviewIcon: '⭐',
    reviewNumber: 3.4,
    reviewTotal: 600,
    state: 'Rivers',
    country :' Nigeria',

    online:false,

  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Benin',
    country :' Nigeria',

    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Lagos',
    country :' Nigeria',

    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Lagos',
    country :' Nigeria',

    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Lagos',
    country :' Nigeria',

    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Enugu',
    country :' Nigeria',

    online: true
  },
  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F341604%2Fpicture%2Foptimized%2Fhuge_7849d8d5a9c0dcc4897aeb511b203b43-9cf9312aaf26849f650656613d975ac8.jpg&width=480', // Replace with actual image URLs
    name: 'Ian Cornwall',
    title: 'Suregon',
    reviewIcon: '⭐',
    reviewNumber: 4.7,
    reviewTotal: 356,
    state: 'Anambra',
    country :' Nigeria',

    online: true
  },
  

  {
    img: 'https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Ftalent%2F915322%2Fpicture%2Foptimized%2Fhuge_06273bf08965873b43ac9576f6336700-ad18e5a458e8496a3348230b629edf6b.jpeg&width=480', 
    name: 'Paula Ylisassi',
    title: 'Dermatologist',
    reviewIcon: '⭐', 
    reviewNumber: 4.5,
    reviewTotal: 286,
    state: 'Abuja',
    country :' Nigeria',
    online: true
  },
];
export const ScheduleLists=[
  
    {
      id: 1,
      name: 'Dr. Maria Lopez',
      title: 'Pediatrician',
      img: 'https://img.freepik.com/free-photo/portrait-doctor-hospital-clinic_23-2148966972.jpg',
      date: '2024-12-12',
      time: '11:41',
      status: 'upcoming',
      state: 'Abuja',
      country :' Nigeria',
      online:true,
  
    },
    {
    id: 2,
    name: 'Dr. Garcia Rodriguez',
    title: 'Surgeon',
    img: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    date: '2024-10-15',
    time: '23:00',
    status: 'upcoming',
    state: 'Abuja',
    country :' Nigeria',
    online:true,
  },
 
  {
    id: 3,
    name: 'Dr. jennifer Lopez',
    title: 'Pediatrician',
    img: 'https://img.freepik.com/free-photo/portrait-doctor-hospital-clinic_23-2148966972.jpg',
    date: '2024-09-17',
    time: '13:00',
    status: 'completed',
    state: 'Abuja',
    country :' Nigeria',
    online:true,


  },
  {
    id: 4,
    name: 'Dr. jennifer Lopez',
    title: 'Pediatrician',
    img: 'https://img.freepik.com/free-photo/portrait-doctor-hospital-clinic_23-2148966972.jpg',
    date: '2024-09-13',
    time: '11:00',
    status: 'upcoming',
    state: 'Abuja',
    country :' Nigeria',
    online:true,

  },
]

export const MedicationLists = [
  {
    id: 1,
    name: 'Paracetamol',
    dosage: '500mg',
    time: 'After meals',
    date: '2024-10-14',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'Ibuprofen',
    dosage: '200mg',
    time: 'Twice a day',
  },
];

const totalPatientAttended = NAMES.TOTALPATIENTATTENDED
const withdrawnAmount = NAMES.WITHDRAWNAMOUNT
const availableBalance =NAMES.AVAILABLEBALANCE
 export const TOTALREVENUE = withdrawnAmount + availableBalance
// const totalPatientWaiting = NAMES.PATIENTWAITINGCOUNT

export const cardTopData = [

  {
    title: "Total Patients Count",
    count: totalPatientAttended, // Replace with actual variable
    growth: "10%",
    description: "Total of patients attended to",
    icon: <FaUsers size={24} />,
    iconData: <HiDotsHorizontal  />,
    iconArrowUp: <FaArrowUp />,
    textCount: 'List of patients count',
    color: 'primary'

  },
  {
    title: "Total Available Balance",
    count: availableBalance, // Replace with actual variable
    growth: "13%",
    description: "Your sum Total Balance",
    icon: <MdAccountBalanceWallet size={24} />,
    iconData: <HiDotsHorizontal  />,
    iconArrowUp: <FaArrowUp />,
    textCount: 'Sum total Balance made',
    color: 'green-700'

  }, 

  {
    title: "Total Amount withdrawn",
    count: withdrawnAmount, // Replace with actual variable
    growth: "19%",
    description: "Money withdrawn from wallet ",
    icon: <HiBanknotes size={24} />,
    iconData: <HiDotsHorizontal  />,
    iconArrowUp: <FaArrowUp />,
    textCount: 'Sum total Withdrawn',
    color: 'red-700'

  },
 
];


export const appointments = [
  {
    time: '11:30AM',
    description: 'Clinic Consulting',
    doctors: [
      { name: 'Dr. Sam', img: 'https://i.pravatar.cc/30?img=1' },
      { name: 'Dr. Alice', img: 'https://i.pravatar.cc/30?img=2' }
    ]
  },
  {
    time: '02:00PM',
    description: 'Online Consulting',
    doctors: [
      { name: 'Dr. John', img: 'https://i.pravatar.cc/30?img=3' }
    ]
  },
  {
    time: '05:30PM',
    description: 'Meeting - Dr. Sam',
    doctors: [
      { name: 'Dr. Sam', img: 'https://i.pravatar.cc/30?img=4' }
    ]
  }
];

export const appointmentRequests = [
  {
    img: 'https://i.pravatar.cc/32?img=10',
    name: 'Elena Davis',
    date: "2024-09-30",
    time: ["15:00 - 16:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU449573',
    age: 35,
    weight:172,
    height: 72

  },
  {
    img: 'https://i.pravatar.cc/32?img=11',
    name: 'Rishi Kiran',
    date: "2024-09-30",
    time: ["09:00 - 09:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU445073',
    age: 35,
    weight:172,
    height: 72
  },
  {
    img: 'https://i.pravatar.cc/32?img=11',
    name: 'Rishi Kiran',
    date: "2024-09-30",
    time: ["09:00 - 09:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU845573',
    age: 35,
    weight:172,
    height: 72
  },
  {
    img: 'https://i.pravatar.cc/32?img=11',
    name: 'Rishi Kiran',
    date: "2024-10-01",
    time: ["09:00 - 09:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU449573',
    age: 35,
    weight:172,
    height: 72
  },
  {
    img: 'https://i.pravatar.cc/32?img=11',
    name: 'Rishi Kiran',
    date: "2024-09-29",
    time: ["09:00 - 09:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU445573',
    age: 35,
    weight:172,
    height: 72
  },
  {
    img: 'https://i.pravatar.cc/32?img=11',
    name: 'Rishi Kiran',
    date: "2024-09-29",
    time: ["09:00 - 09:30"],
    avatars: ["radiologist.png"],
    title: ["30min call meeting Peer"],
    status: 'pending',
    gender: 'female',
    reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    eidnumber: 'BPU445575',
    age: 35,
    weight:172,
    height: 72
  },
 
];

export const appointmentDetails = [
  { label: "Age", value: "age" },
  { label: "Gender", value: "gender" },
  { label: "Weight", value: "weight", unit: "kg" },
  { label: "Height", value: "height", unit: "cm" }
];

export const recentPatients = [
  {
    img: 'https://via.placeholder.com/50',

    ehrNo: 'EHR12345',
    name: 'Daniel Smith',
    condition: 'Heavy Cold',
    status: 'In Treatment',
    gender: 'male',

  },
  {
    img: 'https://via.placeholder.com/50',    ehrNo: 'EHR12346',
    name: 'Dora Herrera',
    condition: 'Flu',
    gender: 'female',
    status: 'Recovered',
  },
];

export const paymentHistory = [
  {
    patientName: 'Glenn Stanley',
    amount: '$150',
    date: '15 Jan 2024',
    status: 'Paid',
  },
  {
    patientName: 'Johanna Blake',
    amount: '$120',
    date: '14 Jan 2024',
    status: 'Pending',
  },
];


export const todayAppointment = [
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'completed',
    statusColor: 'green-500'
  },
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'MJ KUMAR',
    healthConditionTitle: 'Health Checkup',
    status: 'Ongoing',
    statusColor: 'blue-100'
  },
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'upcoming',
    statusColor: 'gray-500'
  },
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'upcoming',
    statusColor: 'gray-500'
  },
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'canceled',
    statusColor: 'red-500'
  },
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'canceled',
    statusColor: 'red-500'
  },
  
  {
    img: 'https://via.placeholder.com/50',
    patientName: 'Andrew williams',
    healthConditionTitle: 'chest health',
    status: 'upcoming',
    statusColor: 'gray-500'
  },
];

export const PATIENTSIDEBARMENU = [
  { icon: FaUserTie, label: "Dashboard", link: "/Dashboard" },
  { icon: FaUserMd, label: "Doctors", link: "/doctors" },
  { icon: AiFillSchedule, label: "Appointments", link: "/schedules" },
  { icon: FaFileMedical, label: "Hospitals", link: "/hospitals" },
  { icon: GiMedicines, label: "Pharmacies", link: "/pharmacies" },
  { icon: BiSolidClinic, label: "Laboratories", link: "/laboratories" },
  { icon: FaWallet, label: "Wallet", link: "/wallet" },
    { icon: FaCog, label: "Settings", link: "/settings" },
];

export const PHARMACYSIDEBARMENU =[
  { icon: FaUserTie, label: "Dashboard", link: "/institution/pharmacy/Dashboard" },
  { icon: FaBorderAll, label: "Order", link: "/institution/Pharmacy/Order" },
  { icon: FaBookMedical, label: "Profile", link: "/institution/Pharmacy/Profile" },
  { icon: GrLogout, label: 'Logout', link: '/institution/logout'},
]

export const HOSPITALSIDEBARMENU =[
  { icon: FaUserTie, label: "Dashboard", link: "/institution/hospital/Dashboard" },
  { icon: FaBorderAll, label: "Order", link: "/institution/hospital/Order" },
  { icon: FaBookMedical, label: "Profile", link: "/institution/hospital/Profile" },
  // { icon: GrLogout, label: 'Logout', link: '/institution/logout'},
]

export const LABORATORYSIDEBARMENU=[
    { icon: FaUserTie, label: "Dashboard", link: "/institution/Laboratory/Dashboard" },
  { icon: FaBorderAll, label: "Order", link: "/institution/Laboratory/Order" },
  { icon: FaBookMedical, label: "Profile", link: "/institution/Laboratory/Profile" },
]

export const DOCTORSIDEBARMENU = [
  { icon: FaUserMd, label: "Dashboard", link: "/doctor/Dashboard" },

  { icon: AiFillSchedule, label: "Appointments", link: "/doctor/Appointments" },

  { icon: FaFileMedical, label: "Patients", link: "/doctor/patients" },

  { icon: FaWallet, label: "Payment", link: "/doctor/payment" },

  { icon: FaFileMedical, label: "Patient Note", link: "/doctor/PatientNote" },

  { icon: FaFileMedical, label: "Patient EHR", link: "/doctor/PatientEhr" },

  { icon: FaCog, label: "Settings", link: "/doctor/settings" },

  { icon: FaSignOutAlt, label: "Logout",  },
];

export const TOPBARMENU = [
  { name: 'Settings', link: '/institution/settings', icon: IoSettings },
  { name: 'Currency', icon: NAMES.selectedCurrency.symbol },
  { name: 'Logout', action: logout, icon: GrLogout }, // Logout uses action instead of link
];

export const INSTITUTIONTOPBARMENU =[
  { name: 'Currency',  icon: NAMES.selectedCurrency.symbol },
  { name: 'Logout', link: '/pharmacy/logout', icon: GrLogout },
]

export const INSTITUTIONSIDEBARMENU = [
  // { name: 'Settings', link: '/institution/settings', icon: IoSettings },
   { icon: GrLogout, label: 'Logout', link: '/institution/logout'},
    { icon: FaUserTie, label: "Dashboard", link: "/institution/pharmacy/Dashboard" },
  { icon: FaBorderAll, label: "Order", link: "/institution/Pharmacy/Order" },
  { icon: FaBookMedical, label: "Profile", link: "/institution/Pharmacy/Profile" },
];
export const DOCTORTOPBARMENU = [
  { name: 'Settings', link: '/doctor/settings', icon: IoSettings },
  { name: 'Currency',  icon: NAMES.selectedCurrency.symbol }, // Use the component directly
  { name: 'Logout', link: '/doctor/logout', icon: GrLogout },
];


export const PATIENTTOPBARMENU = [
  { name: 'Settings', link: '/onboarding', icon: IoSettings },
  { name: 'Logout', link: '/logout', icon: GrLogout },
];

export const transactionHistory = [
  { id: 'TXN001', date: '2024-10-01', time: '02:12', amount: '+$200', status: 'Completed', paymentMethod: 'Visa' },
  { id: 'TXN002', date: '2024-09-29', time: '18:58', amount: '-$50', status: 'Spent on services', paymentMethod: 'MasterCard' },
  { id: 'TXN003', date: '2024-09-25', time: '12:42', amount: '+$100', status: 'Completed', paymentMethod: 'PayPal' },
];

export const paymentMethodOptions = [
  // {img: IMAGE.bitpay, name:'BitPay', action: 'BitPay',},
  // {img:IMAGE.coingate, name:'CoinGate', action: 'CoinGate'},
  // {img: IMAGE.flutterwave, name:'FlutterWave', action: 'FlutterWave'},
  // {img: IMAGE.paypal, name:'PayPal', action: 'PayPal'},
  // { img: IMAGE.paystack, name: 'PayStack', action: 'PayStack', paymentHandler: handlePayStack },
];



export  const Pharmacytransactions = [
  {
    id:1,
    img:IMAGE.joinUs,
    customer: 'John C.',
    order: 584512,
    cost: 97.50,
    dueDate: '7th Jan, 2025',
    rating: 5,
    status: 'Completed',
    statusColor: 'text-green-500',
    statusBg: 'bg-green-100',
  },
  {
    id:2,
    img:IMAGE.joinUs,

    customer: 'Matthew K.',
    order: 473401,
    cost: 79.80,
    dueDate: '6th Jan, 2025',
    rating: 4,
    status: 'Pending',
    statusColor: 'text-yellow-500',
    statusBg: 'bg-yellow-100',
  },
  {
    id:3,
    img:IMAGE.joinUs,
    customer: 'Dontai G.',
    order: 696523,
    cost: 80.40,
    dueDate: '5th jan, 2025',
    rating: 3,
    status: 'Cancelled',
    statusColor: 'text-red-500',
    statusBg: 'bg-red-100',
  },
]; 

export const patientsData = [
  { id: 1, name: 'Robert Fox', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cardiologist.png', dob: "16/07/1977", EHRNO:283838, gender: 'Female', previousVisit:"25/02/2024",  },
  { id: 2, name: 'Kristin Watson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Child Counseling', image: '/images/cardiologist.png' },
  { id: 3, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cardiologist.png' },
  { id: 4, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cardiologist.png' },
  { id: 5, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cameron-williamson.jpg' },
  { id: 6, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cameron-williamson.jpg' },
  { id: 7, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cameron-williamson.jpg' },
  { id: 8, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cameron-williamson.jpg' },
  { id: 9, name: 'Cameron Williamson', appointment: 'Feb 6th, 11:00 am - 11:45 am', counseling: 'Individual Counseling', image: '/images/cameron-williamson.jpg' },
];
