import { PATIENTSIDEBARMENU } from "../../../../components/Constants";

import SideBarMenu from "../../../../components/SideBarMenu";

import UseSideBarMenu from "../../../../hooks/UseSideBarMenu";
import PatientHeader from "../../../partials/PatientHeader";

const PrescriptionReports = () => {
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  return (
    <div className="">
      <main className="flex-grow">
        <div className="   sm:flex justify-between mb-0">
          <div className=" mb-4"></div>
        </div>
        {/* main contnent */}
        <div className="sm:flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Prescription Reports</h1>
            <p className="text-gray-600">
              View and manage your prescription reports below.
            </p>
          </div>
        </div>

        {/* Main content - add your prescription reports here */}
        <div className="bg-white rounded-lg shadow-md p-4 ">
          <h2 className="text-xl font-semibold mb-4">Recent Prescriptions</h2>

          <div className="overflow-x-auto w-full lg:w-10/12">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Medication</th>
                  <th className="p-2 text-left">Dosage</th>
                  <th className="p-2 text-left">Prescribing Doctor</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">2024-10-21</td>
                  <td className="p-2">Amoxicillin</td>
                  <td className="p-2">500mg X2</td>
                  <td className="p-2">Dr. Smith</td>
                  <td className="p-2 text-green-500">Filled</td>
                </tr>
                {/* Add more rows dynamically */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionReports;
