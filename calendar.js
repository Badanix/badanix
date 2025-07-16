import { useState } from "react";
import AuthHeader from "../../partials/AuthHeader";
import { IoArrowBackCircle } from "react-icons/io5";
import styles from "../../../components/styles";
import { APIURLS, UserTypeImage } from "../../../components/Constants";
import { useFormValidation } from "./formValidation";
import Swal from "sweetalert2";

const AuthLogin = () => {
  const { APIURLPATIENTSLOGIN, APIURLDOCTORSLOGIN, APIURLINSTITUTIONLOGIN } = APIURLS;

  const [userType, setUserType] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const { formData, setFormData, handleChange } = useFormValidation(true, userType);

  const handleGoBack = () => {
    if (institutionType) {
      setInstitutionType("");
      setFormData({});
    } else {
      setUserType("");
      setFormData({});
    }
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    setInstitutionType("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    let apiUrl;

    // Set the API URL based on the userType
    switch (userType) {
      case "patient":
        apiUrl = APIURLPATIENTSLOGIN;
        break;
      case "doctor":
        apiUrl = APIURLDOCTORSLOGIN;
        break;
      case "institution":
        apiUrl = APIURLINSTITUTIONLOGIN;
        break;
      default:
        Swal.fire("Error", "Invalid user type", "error");
        return;
    }

    // Set the role_id based on the userType
    let role_id = 0;
    if (userType === "patient") role_id = 1;
    else if (userType === "doctor") role_id = 2;
    else if (userType === "institution") role_id = 3;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.status === "200") {
          if (data.verified === 0) {
            window.location.href = `/verify-email?email=${email}`;
            return;
          }

          const userData = {
            email: data.data.email,
            name: data.data.name,
            role_id: role_id,
            token: data.token,
          };

          localStorage.setItem("token", data.token);
          localStorage.setItem("role_id", role_id);
          localStorage.setItem("user_data", JSON.stringify(userData));

          // Redirect to appropriate dashboard based on role_id
          switch (role_id) {
            case 1:
              window.location.href = "/dashboard"; // Patient dashboard
              break;
            case 2:
              window.location.href = "/doctor/dashboard"; // Doctor dashboard
              break;
            case 3:
              window.location.href = "/institution/pharmacy/dashboard"; // Institution dashboard
              break;
            default:
              Swal.fire("Error", "Invalid user type", "error");
          }

          Swal.fire("Success", "Login Successful", "success");
        } else if (data.status === "401") {
          Swal.fire("Error", data.message, "error");
        }
      } else {
        Swal.fire("Error", "No such user exists or incorrect credentials", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire("Error", error.message || "An unknown error occurred", "error");
    }
  };

  return (
    <div>
      <AuthHeader />
      <main className={styles.mainContainer}>
        <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`}>
          <div className="flex-grow">
            <img
              src={UserTypeImage.default}
              alt="User Type"
              className="inset-0 w-full h-[140vh] object-cover -mt-[170px]"
            />
          </div>
        </section>

        <section className={styles.mainRegister}>
          <div className="flex justify-between border-b border-gray-200 sm:max-w-[30rem] mr-7 mb-4 text-primary">
            {!userType && !institutionType ? (
              <h1 className={`text-primary dark:text-secondary font-extrabold ${styles.subHeading}`}>
                Select User Type
              </h1>
            ) : (
              <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700">
                <IoArrowBackCircle size={24} className="text-primary dark:text-secondary mt-5 sm:mt-4" />
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-center mt-8 font-bold text-primary dark:text-secondary uppercase">
              What type of account would you like to set up?
            </label>
            <select
              value={userType}
              onChange={(e) => handleUserTypeChange(e.target.value)}
              className="block w-full border border-primary dark:border-secondary rounded-lg p-4 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
            >
              <option value="" disabled>Select account type</option>
              <option value="doctor">Doctor</option>
              <option value="institution">Institution</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          {userType === "institution" && !institutionType && (
            <div className="mb-4">
              <label className="block text-center mt-8 font-bold text-primary dark:text-secondary uppercase">
                Select Institution Type
              </label>
              <select
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className="block w-full border border-primary dark:border-secondary rounded-lg p-4 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
              >
                <option value="" disabled>Select institution type</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hospital">Hospital</option>
                <option value="laboratory">Laboratory</option>
              </select>
            </div>
          )}

          {(userType && userType !== "institution") || institutionType ? (
            <form className="space-y-6 sm:max-w-[30rem] mx-auto" autoComplete="off" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Log In
                </button>
              </div>
            </form>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default AuthLogin;
