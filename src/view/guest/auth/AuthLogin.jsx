import { useState } from "react";
import AuthHeader from "../../partials/AuthHeader";
import { IoArrowBackCircle } from "react-icons/io5";
import styles from "../../../components/styles";
import { APIURLS, UserTypeImage } from "../../../components/Constants";
import { useFormValidation } from "./formValidation";
import Swal from "sweetalert2";

const AuthLogin = () => {
  const { APIURLPATIENTSLOGIN, APIURLDOCTORSLOGIN, APIURLINSTITUTIONLOGIN } =
    APIURLS;

  const [userType, setUserType] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const { formData, setFormData, handleChange } = useFormValidation(
    true,
    userType
  );

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
  };

  const handleInstitutionChange = (value) => {
    setInstitutionType(value);
    setFormData((prev) => ({ ...prev, institutionType: value }));
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const institutionTypeValue =
      userType === "institution" ? institutionType : null;

    if (userType === "institution" && !institutionTypeValue) {
      Swal.fire("Error", "Please select an institution type", "error");
      return;
    }

    let apiUrl;
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

    // Set role_id for internal use
    let role_id = 0;
    if (userType === "patient") role_id = 1;
    else if (userType === "doctor") role_id = 2;
    else if (userType === "institution") role_id = 3;

    try {
      const requestBody = {
        email,
        password,
        ...(userType === "institution" && {
          institution_type: institutionTypeValue,
        }),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // 🔐 Email not verified
        if (
          data.status === "401" &&
          data.message.includes("verify your email")
        ) {
          window.location.href = `/verify-email?email=${email}`;
          return;
        }

        if (data.status === "200") {
          if (role_id === 3) {
            if (data.data.institution_type !== institutionType) {
              Swal.fire(
                "Error",
                "The email and password do not match the selected institution type.",
                "error"
              );

              return;
            }
          }

          // ✅ Build userData object
          const userData = {
            data: data.data,
            setting: data.data.setting,
            role_id: role_id,
            token: data.token,
          };

          if (role_id === 3) {
            userData.institution_type = data.data.institution_type;
          }

          // ✅ Save to localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("role_id", role_id);
          localStorage.setItem("user_data", JSON.stringify(userData));

          // ✅ Redirect by role
          if (role_id === 1) {
            window.location.href = "/dashboard";
          } else if (role_id === 2) {
            window.location.href = "/doctor/dashboard";
          } else if (role_id === 3) {
            switch (data.data.institution_type) {
              case "pharmacy":
                window.location.href = "/institution/pharmacy/dashboard";
                break;
              case "hospital":
                window.location.href = "/institution/hospital/dashboard";
                break;
              case "laboratory":
                window.location.href = "/institution/laboratory/dashboard";
                break;
              default:
                Swal.fire("Error", "Invalid institution type", "error");
                return;
            }
          }

          Swal.fire("Success", "Login Successful", "success");
        } else {
          Swal.fire("Error", data.message || "Login failed", "error");
        }
      } else {
        Swal.fire(
          "Error",
          "No such user exists or incorrect credentials",
          "error"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire("Error", "No Internet Connection", "error");
    }
  };

  return (
    <div>
      <AuthHeader />
      <main className={styles.mainContainer}>
        <section
          className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`}
        >
          <div className="flex-grow">
            <img
              src={UserTypeImage.default}
              alt="User Type"
              className="inset-0 w-full h-[140vh] object-cover -mt-[170px]"
            />
          </div>
        </section>

        <section className={styles.mainRegister}>
          <div className="flex justify-between border-b border-gray-200 lg:max-w-[30rem] mr-7 mb-4 text-primary">
            {!userType && !institutionType ? (
              <h1
                className={`text-primary dark:text-secondary font-extrabold ${styles.subHeading}`}
              >
                Select User Type
              </h1>
            ) : (
              <div className="flex space-x-3">
                {" "}
                <button
                  onClick={handleGoBack}
                  className="textprimary hover:text-blue-700"
                >
                  <IoArrowBackCircle
                    size={24}
                    className="text-secondary dark:text-secondary mt-5 sm:mt-4"
                  />
                </button>
                <h1
                  className={` text-primary dark:text-secondary font-bold ${styles.subHeading} -ml-4`}
                >
                  Welcome Back{" "}
                </h1>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-center mt-8 font-bold text-primary dark:text-secondary uppercase text-sm md:text-md lg:text-lg">
              {userType ? (
                <>
                  Let&apos;s get you logged in as{" "}
                  <span className="text-secondary">
                    {userType.charAt(0).toUpperCase() + userType.slice(1)}
                  </span>
                </>
              ) : (
                <span className="text-sm md:text-md">
                  Which account type do you want to log in as?
                </span>
              )}
            </label>

            <select
              value={userType}
              onChange={(e) => handleUserTypeChange(e.target.value)}
              className="block w-full border border-primary dark:border-secondary rounded-lg p-4 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
            >
              <option value="" disabled>
                Select account type
              </option>
              <option value="doctor">e-doctor</option>
              <option value="institution">e-institution</option>
              <option value="patient">e-patient</option>
            </select>
          </div>

          {userType === "institution" && (
            <div className="mb-4">
              <label className="block text-center mt-8 font-bold text-primary dark:text-secondary uppercase text-sm md:text-md lg:text-lg">
                Select Institution Type
              </label>
              <select
                value={institutionType}
                onChange={(e) => handleInstitutionChange(e.target.value)}
                className="block w-full border border-primary dark:border-secondary rounded-lg p-4 text-gray-700 dark:text-white bg-white dark:bg-gray-800 focus:outline-none"
              >
                <option value="" disabled>
                  Select institution type
                </option>
                <option value="pharmacy">Pharmacy</option>
                <option value="hospital">Hospital</option>
                <option value="laboratory">Laboratory</option>
              </select>
            </div>
          )}

          {(userType && userType !== "institution") || institutionType ? (
            <form
              className="space-y-6 sm:max-w-[30rem] mx-auto"
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
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
                  className={`w-full p-3 text-primary rounded-[20px] bg-secondary border-2 border-primary border-b-[9px]  mt-9  ${styles.buttonClass} hover:text-white hover:bg-primary hover:border-secondary`}
                >
                  Log In
                </button>
              </div>
              {/* <a href="/forgot-password" className="flex justify-end mt-2  text-primary">Forgot Password</a> */}

              <a
                href={
                  userType === "patient"
                    ? "/patientforgot-password"
                    : userType === "doctor"
                    ? "/forgot-password"
                    : userType === "institution"
                    ? "/instiforgot-password"
                    : "/auth-login"
                }
                className="flex justify-end mt-2 text-primary"
              >
                Forgot Password
              </a>
            </form>
          ) : null}

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 font-medium">
            Don’t have an account?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => (window.location.href = "/auth-register")}
              className="w-full p-3 text-white rounded-[20px] bg-secondary border-2 border-primary border-b-[6px] hover:bg-primary hover:text-white transition"
            >
              Partner With Us
            </button>
            <button
              onClick={() => (window.location.href = "/register")}
              className="w-full p-3 text-primary rounded-[20px] bg-white border-2 border-primary border-b-[6px] hover:bg-primary hover:text-white transition"
            >
              Register as an e-patient
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthLogin;
