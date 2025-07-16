import { useRef, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { APIURLS } from "../../../components/Constants";


export const useFormValidation = (emailSelected,userType,) => {
    const [actionType, setActionType] = useState('register');
    const [formData, setFormData] = useState({ 
        email: '', fullname:'', phoneNumber: '', password: '',        password_confirmation: '', referralCode: '', specialization: '', institution_type: '', institution_name: '',  agreement: false , role:''
    });

    
    const [errors, setErrors] = useState({ 
        email: '', fullname: '', phoneNumber: '', password: '', password_confirmation: '', referralCode: '', specialization: '', institution_type: '', institution_name: '',  agreement: '',  
    });

    const validate = () => {
        const newErrors = {};

        // Validate fields for Patient
        if (userType === 'patient') {
            if (emailSelected) {
                if (!formData.email) newErrors.email = 'Email is required';
                else if (!isValidEmail(formData.email)) newErrors.email = 'Email is invalid';
            } else if (!formData.phoneNumber) {
                newErrors.phoneNumber = 'Phone number is required';
            }
            if (!formData.fullname) newErrors.fullname = 'Full Name is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (!formData.agreement) newErrors.agreement = 'You must agree to the terms and conditions';
            if (formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = "Passwords don't match";
            }
        }

        // Validate fields for Doctor
        if (userType === 'doctor') {
            if (!formData.fullname) newErrors.fullname = 'Full Name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!isValidEmail(formData.email)) newErrors.email = 'Email is invalid';
          
            if (!formData.specialization) newErrors.specialization = 'Specialization is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = "Passwords don't match";
            }
        }

        // Validate fields for Institution
        if (userType === 'institution') {
            if (!formData.institution_name) newErrors.institution_name = 'Institution Name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!isValidEmail(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.institution_type) newErrors.institution_type = 'Institution Type is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = "Passwords don't match";
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };
    const [emailSuggestions, setEmailSuggestions] = useState([]);
    const emailInputRef = useRef(null);

    const [isFocused, setIsFocused] = useState(false);

    const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'email') {
            if (value.includes("@")) {
                const [localPart, domainPart] = value.split("@");
                if (domainPart === "") {
                    setEmailSuggestions(emailDomains.map(domain => `${localPart}@${domain}`));
                } else {
                    setEmailSuggestions([]);
                }
            } else {
                setEmailSuggestions([]);
            }

            if (!isValidEmail(value)) {
                setErrors(prevErrors => ({ ...prevErrors, email: 'Email is invalid' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: '' }));
            }
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form
        if (validate()) {
            let role_id = 0;
    
            if (userType === 'patient') {
                role_id = 1;
            } else if (userType === 'doctor') {
                role_id = 2;
            } else if (userType === 'institution') {
                role_id = 3;
            }

            const updatedFormData = { ...formData, ...(actionType === 'register' && { role_id }) };
            if (actionType === 'register') {
                localStorage.setItem('role_id', role_id); // Save role_id to localStorage
            }
            let apiUrl = '';
            let config = {};
            const actionTitle = actionType === 'register' ? 'Registration' : actionType.charAt(0).toUpperCase() + actionType.slice(1);
    
            switch (actionType) {
                case 'register':
                    apiUrl = getRegistrationApiUrl(userType);
                    config = { method: 'post' };
                    break;
    
                case 'login':
                    apiUrl = getLoginApiUrl(formData.role);
                    config = {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                    break;
    
                case 'reset-password':
                    apiUrl = APIURLS.APIURLRESETPASSWORD;
                    config = { method: 'post' };
                    break;
                    
                    case 'reset':
                        apiUrl = APIURLS.APIURLRESETPASSWORD;
                        config = { method: 'post' };
                        break;
    
                case 'forgot-password':
                    apiUrl = APIURLS.APIURLFORGOTPASSWORD;
                    config = { method: 'post' };
                    break;
    
                default:
                    throw new Error('Invalid action type');
            }
    
            try {
                const resp = await axios({
                    url: apiUrl,
                    method: config.method,
                    data: actionType === 'login' ? {
                        email: formData.email,
                        password: formData.password,
                    } : updatedFormData,
                });
    
                handleResponse(resp.data, actionType);
            } catch (e) {
                handleError(e, actionTitle);
            }
        }
    };
    
    const getRegistrationApiUrl = (userType) => {
        switch (userType) {
            case 'patient':
                return APIURLS.APIURLPATIENTSREGISTER;
            case 'doctor':
                return APIURLS.APIURLDOCTORSREGISTER;
            case 'institution':
                return APIURLS.APIURLINSTITUTIONREGISTER;
            default:
                throw new Error('Invalid user type for registration');
        }
    };
    
    const getLoginApiUrl = (role) => {
        switch (role) {
            case 'patient':
                return APIURLS.APIURLPATIENTSLOGIN;
            case 'doctor':
                return APIURLS.APIURLDOCTORSLOGIN;
            case 'institution':
                return APIURLS.APIURLINSTITUTIONLOGIN;
            default:
                throw new Error('Invalid role for login');
        }
    };
    
    
    const handleResponse = (data, actionType) => {
        if (actionType === 'register') {
            const email = formData.email;
            window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
        }
    
        if (actionType === 'login') {
            const { role_id } = data;
            switch (role_id) {
                case 1:
                    window.location.href = '/dashboard';
                    break;
                case 2:
                    window.location.href = '/doctor-dashboard';
                    break;
                case 3:
                    window.location.href = '/institution-dashboard';
                    break;
                default:
                    throw new Error('Invalid role_id');
            }
        }
    
        // Optionally, reset form data
        setFormData({ email: '', fullname: '', phoneNumber: '', password: '', referralCode: '', agreement: false });
    };
    
    const handleError = (error, actionTitle) => {
        console.error('Error details:', error);
        if (error.response) {
            Swal.fire({
                icon: 'error',
                title: `${actionTitle} Failed`,
                text: error.response.data.message,
                confirmButtonColor: '#0f227e',
            });
        } else if (error.request) {
            Swal.fire({
                icon: 'error',
                title: `${actionTitle} Failed`,
                text: 'No response from the server. Please check your network connection.',
                confirmButtonColor: '#0f227e',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: `${actionTitle} Failed`,
                text: 'An unexpected error occurred. Please try again later.',
                confirmButtonColor: '#0f227e',
            });
        }
    };
    
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
      
    //     // Define form data collected based on user type
    //     let collectedData = {};
      
    //     // Validate form data only for the validated fields
    //     if (validate()) {
    //       // Gather the validated data based on user type
    //       if (userType === 'patient') {
    //         collectedData = {
    //           'Full Name': formData.fullname,
    //           'Email': formData.email,
    //           'Phone Number': formData.phoneNumber,
    //           'Referral Code': formData.referralCode || 'N/A',
    //           'User Type': userType,
    //           // Any other specific fields for the patient form can be added here
    //         };
    //       } else if (userType === 'doctor') {
    //         collectedData = {
    //           'Full Name': formData.fullname,
    //           'Email': formData.email,
    //           'Phone Number': formData.phoneNumber,
    //           'Specialization': formData.specialization || 'Not provided',
    //           'User Type': userType,
    //           'password': formData.password,
    //           'confirmPassword': formData.password_confirmation
    //           // Any other specific fields for the doctor form
    //         };
    //       } else if (userType === 'institution') {
    //         collectedData = {
    //           'Institution Type': formData.institution_type || 'Not provided',
    //           'Institution Name': formData.institution_name || 'Not provided',
    //           'Institution Email': formData.email || 'Not provided',
    //           'Phone Number': formData.phoneNumber,
    //           'User Type': userType,
    //           // Any other specific fields for the institution form
    //         };
    //       }
      
    //       // Display the collected data in a SweetAlert
    //       Swal.fire({
    //         icon: 'info',
    //         title: `${userType.charAt(0).toUpperCase() + userType.slice(1)} Form Submitted`,
    //         html: `
    //           <h4>Collected Data:</h4>
    //           <ul>
    //             ${Object.entries(collectedData).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
    //           </ul>
    //         `,
    //       });
      
    //       // Optionally, reset the form data after submission
    //       setFormData({
    //         email: '', fullName: '', phoneNumber: '', password: '', referralCode: '', specialization: '', institution_type: '',
    //         institution_name: '', agreement: false 
    //       });
      
    //     } else {
    //       // If validation fails, show the validation errors
    //       const errorMessages = Object.values(errors).filter(error => error !== '').join('\n');
    //       Swal.fire({
    //         icon: 'warning',
    //         title: 'Validation Errors',
    //         text: errorMessages || 'Please correct the errors in the form.',
    //       });
    //     }
    //   };
      
    const handleEmailSuggestionClick = (suggestion) => {
        setFormData(prevData => ({
            ...prevData,
            email: suggestion
        }));
        setEmailSuggestions([]);
        emailInputRef.current.focus();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!isFocused) {
                setEmailSuggestions([]);
            }
        }, 200);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const getEmailMessage = () => {
        if (errors.email) {
            if (errors.email === 'Email is required') {
                return 'Email is required';
            }
            if (errors.email === 'Email is invalid') {
                return 'Invalid email format';
            }
        } else if (formData.email && isValidEmail(formData.email)) {
            // Success message if email is valid
            return 'Email is successfully updated';
        }
        return '';
    };

    const getEmailMessageClass = () => {
        if (errors.email) {
            if (errors.email === 'Email is required' || errors.email === 'Email is invalid') {
                return 'text-red-500';
            }
        } else if (formData.email && isValidEmail(formData.email)) {
            return 'text-green-500';
        }
        return 'text-gray-700';
    };

    return {
        formData,
        setFormData,
        setErrors,
        errors,
        emailSuggestions: isFocused ? emailSuggestions : [],
        handleChange,
        handleSubmit,
        handleEmailSuggestionClick,
        handleFocus,
        handleBlur,
        getEmailMessage,
        getEmailMessageClass,
        setActionType
    };
};


