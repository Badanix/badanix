import { Link, useNavigate } from 'react-router-dom';
import { NAMES, PHARMACYSIDEBARMENU, Pharmacytransactions } from '../../../../../components/Constants';
import SideBarMenu from '../../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../../hooks/UseSideBarMenu';
import PharmacyHeader from '../../../../partials/PharmacyHeader';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import { getUserData } from '../../../../../components/Helper';

const Activity = () => {


  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

    const userData =getUserData();
  
  const navigate = useNavigate();

useEffect(() => {
    const profileUpdated = userData?.data?.profile_updated;
    console.log("Profile Updated:", profileUpdated);
  
    if (profileUpdated !== 1) {
      console.log("Redirecting to onboarding...");
      navigate("/institution/Pharmacy/onboarding");
    }
  }, [userData]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}   menuItems={PHARMACYSIDEBARMENU}/>

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'}  transition-all duration-300`}>

        {/* Topbar */}
       <PharmacyHeader/>

        {/* Dashboard Content */}
        <main className=" mx-12  mt-11 p-6 bg-white flex-grow rounded-xl">
            <Link to={'/institution/laboratory/Dashboard'} className='underline flex space-x-2 text-secondary my-4 '><FaArrowLeft className='mt-1 text-primary'/>
                   <span>Back to Home</span></Link>
        <div className="w-full border">
  <table className="min-w-full table-auto text-left border-collapse">
    <thead>
      <tr className="bg-gray-100 text-gray-600 border-b">
        <th className="p-3 border-r">No</th>
        <th className="p-3 border-r">Customers</th>
        <th className="p-3 border-r">Order</th>
        <th className="p-3 border-r">Cost</th>
        <th className="p-3 border-r">Date</th>
        <th className="p-3">Status</th>

      </tr>
    </thead>
    <tbody>
      {Pharmacytransactions.map((order) => (
        <tr key={order.id} className="border-b hover:bg-gray-50">
          <td className="p-3 text-gray-700 border-r">{order.id}</td>
          <td className="p-3 flex items-center border-r">
            <img src={order.img} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span>{order.customer}</span>
          </td>
          <td className="p-3 text-primary border-r">{order.order}</td>
          <td className="p-3 text-gray-700 border-r">{NAMES.NairaSymbol}{order.cost}</td>
          <td className="p-3 text-gray-500  border-r">{order.dueDate}</td>
          <td className={`p-3 ${order.status === 'Pending' ? 'text-primary' : order.status === 'Completed' ? 'text-green-500' : order.status === 'Cancelled' ? 'text-red-700' : 'text-gray-500'}`}>
  {order.status}
</td>

        </tr>
      ))}
    </tbody>
  </table>
</div>

        



        </main>
      </div>
    </div>
  );
};

export default Activity;
