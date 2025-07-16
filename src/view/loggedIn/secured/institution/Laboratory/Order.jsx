import { useEffect, useState } from 'react';
import { APIURLS, NAMES, LABORATORYSIDEBARMENU } from '../../../../../components/Constants';
import SideBarMenu from '../../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../../hooks/UseSideBarMenu';
import LaboratoryHeader from '../../../../partials/LaboratoryHeader';
import { FaQrcode, FaBoxOpen, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../../../../../components/Helper';

const Order = () => {
  const userData = getUserData();
  const navigate = useNavigate();
  const currencySymbol = NAMES.NairaSymbol;

  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const [activeTab, setActiveTab] = useState('scan');
  const [prescribedCode, setPrescribedCode] = useState('');
  const [prescribedMedication, setPrescribedMedication] = useState(null);
  const [noMedicationFound, setNoMedicationFound] = useState(false);

  useEffect(() => {
    const profileUpdated = userData?.data?.profile_updated;
    const status = userData?.data?.status;

    if (profileUpdated !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Update Profile',
        text: 'You need to update your profile before proceeding.',
        confirmButtonText: 'Go to Onboarding',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/institution/Laboratory/onboarding");
        }
      });
      return;
    }

    if (status !== 1) {
      Swal.fire({
        icon: 'info',
        title: 'Not Verified Yet',
        text: 'Please wait for verification before using this feature.',
        confirmButtonText: 'Okay',
      });
      return;
    }

    console.log("User is verified and profile is updated.");
  }, [userData, navigate]);

  const handleSubmitCode = async (code) => {
    const token = localStorage.getItem("token");

    if (!code || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid code or missing token.',
      });
      return;
    }

    try {
      const response = await fetch(
        `https://api.digitalhospital.com.ng/api/v1/institution/record/${encodeURIComponent(code)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const textResponse = await response.text();
      const data = JSON.parse(textResponse);

      if (response.ok && Array.isArray(data?.data) && data.data.length > 0) {
        setPrescribedMedication(data);
        setNoMedicationFound(false);
        Swal.fire({
          icon: 'success',
          title: 'Lab Found',
          text: 'Laboratory test loaded successfully.',
        });
      } else {
        setPrescribedMedication(null);
        setNoMedicationFound(true);
        Swal.fire({
          icon: 'error',
          title: 'No Lab Test Found',
          text: 'No prescription was found for the entered code.',
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  const handleClearInput = () => {
    setPrescribedCode('');
    setPrescribedMedication(null);
    setNoMedicationFound(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-auto">

      <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={LABORATORYSIDEBARMENU} />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'sm:ml-20'}`}>
        <LaboratoryHeader />

        <main className="p-6 bg-gray-100 flex-grow min-w-[320px]">
          <Link to={'/institution/Laboratory/Dashboard'} className='underline flex space-x-2 text-secondary my-4 '>
            <FaArrowLeft className='mt-1 text-primary' />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row bg-gray-100 space-x-5">
            <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
              {activeTab === 'scan' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Scan Prescribed Code</h2>
                  <div className="mb-6 flex items-center space-x-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={prescribedCode}
                        onChange={(e) => setPrescribedCode(e.target.value)}
                        placeholder="Enter prescribed code"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {prescribedCode && (
                        <FaTimes
                          className="text-lg absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                          onClick={handleClearInput}
                        />
                      )}
                    </div>

                    <button
                      onClick={() => handleSubmitCode(prescribedCode)}
                      className="p-2 bg-primary text-white rounded"
                    >
                      Submit Code
                    </button>
                  </div>

                  {noMedicationFound && (
                    <p className="text-red-500">No medication found for the entered code.</p>
                  )}

                  {prescribedMedication && (
                    <div className="w-full overflow-x-auto mt-6">
                      <table className="min-w-full bg-white border border-gray-200 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-4 border">EHR</th>
                            <th className="py-2 px-4 border">Lab Test</th>
                            <th className="py-2 px-4 border">Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prescribedMedication.data.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-2 px-4 border">{record.ehr}</td>
                              <td className="py-2 px-4 border">{record.lab}</td>
                              <td className="py-2 px-4 border">{new Date(record.created_at).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Order;
