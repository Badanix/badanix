import {APIURLS, DOCTORSIDEBARMENU, NAMES } from '../../../../components/Constants';
import SideBarMenu from '../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../hooks/UseSideBarMenu';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import DoctorsHeader from '../../../partials/DoctorsHeader';
import { formatDateWithOrdinalSuffix, getUserData } from '../../../../components/Helper';
import { Link } from 'react-router-dom';
import { useDoctorTransaction } from './DoctorApiForm';
const Wallet = () => {
  const [userData, setUserData] = useState(getUserData());
  const walletBalance = userData?.data?.acctbal;
const accountNumber=userData?.data?.acct_num;
const accountName =userData?.data?.acct_name;
const bankName=userData?.data?.bank_name;
const token = localStorage.getItem("token");
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
  const [message, setMessage] = useState(''); 
const {transactionData, loading } =useDoctorTransaction()
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const [modalContent, setModalContent] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [amount, setAmount] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactionData.slice(indexOfFirstItem, indexOfLastItem);

    const bankAccounts=[
      {bankName:bankName, accountName:accountName, accountNumber:accountNumber},
      ]


  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };


  const handleButtonClick = (content) => {
    setModalContent(content);
    setModal(true); 
  };

  const handleCloseModal = () => {
    setModal(false);
    setModalContent(""); 
  };

 

 
   
    

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

 
  
  
  
  const handleClose = () => {
    setModalOpen(false);
    setAmount('')
  };


  // const toggleModal = () => {
  //   setShowPaymentOptions(true) 
  // };

//  


const handlePayment = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!amount) {
    setMessage("Please enter an amount before proceeding.");
    return;
  }

  const paymentAmount = Number(amount);
  if (isNaN(paymentAmount) || paymentAmount <= 0) {
    setMessage("Please enter a valid amount greater than zero.");
    return;
  }

  if (paymentAmount > walletBalance) {
    setMessage(`You do not have enough balance to withdraw ${NAMES.NairaSymbol}${(Number(paymentAmount) || 0).toLocaleString()}`);
    return;
  }

  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: `You are about to withdraw ${NAMES.NairaSymbol}${paymentAmount} into your ${accountNumber} ${bankName} with the Name: ${accountName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#14361d",
    cancelButtonColor: "#856443",
    confirmButtonText: "Yes, withdraw it!",
  });

  if (!confirmation.isConfirmed) return;

  const paymentData = { amount: paymentAmount };

  try {
    const response = await fetch(APIURLS.APIDOCTORPAYMENT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();

    if (response.ok) {
      const updatedUserData = {
        ...userData,
        data: {
          ...userData.data,
          acctbal: userData.data.acctbal - paymentAmount, 
        }
      };
    
      setUserData(updatedUserData); 
      localStorage.setItem('user_data', JSON.stringify(updatedUserData)); 
      Swal.fire({
        icon: 'success',
        title: 'Withdrawal Successful',
        text: `Withdrawal of ${NAMES.NairaSymbol}${amount} was successful!`,
      });

      console.log('Withdrawal successful:', responseData);
      setModalOpen(false);
      setAmount('');
    } else {
      setMessage(responseData.message || "Something went wrong. Please try again.");
      console.error('Payment failed:', response.statusText);
    }
  } catch (error) {
    setMessage("An error occurred during the withdrawal process. Please try again later.");
    console.error('Error making payment:', error);
  }
};


const renderModalContent = () => {
  switch (modalContent) {
    case "linkAccount":
      return (
        <div className=" rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary text-center">Link Bank Account</h2>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50 font-semibold"                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary"
                  onClick={handlePayment} 


                >
                  Submit Account
                </button>

                <button
            className="w-full mt-4 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
            onClick={handleCloseModal}
          >
            Close
          </button>
              </div>
      );
      
    case "details":
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-[330px] max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">Linked Bank Account</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-600 border-b">
                <th className="p-3 border-r">Bank Name</th>
                <th className="p-3 border-r">Account Name</th>
                <th className="p-3 border-r">Account Number</th>
              </tr>
            </thead>

<tbody>
  {bankAccounts.length > 0 ? (
    bankAccounts.map((details, index) => (
      <tr key={index} className="border-b hover:bg-gray-50">
        <td className="p-3 flex items-center border-r text-gray-700 capitalize">{details.bankName}</td>
        <td className="p-3 text-primary border-r capitalize">{details.accountName}</td>
        <td className="p-3 text-gray-700 border-r capitalize">{details.accountNumber}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="p-3 text-center text-gray-500">
        No bank account added yet.
      </td>
    </tr>
  )}
</tbody>

          </table>
          <div className="mt-4 text-center">
            <button
              className="bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      );
    default:
      return null;
  }
};


//   

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={DOCTORSIDEBARMENU} />

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'} transition-all duration-300`}>
        {/* Topbar */}
        <DoctorsHeader />


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
            <Link to={'/doctor/Dashboard'} className='underline flex space-x-2 text-secondary my-4 '><FaArrowLeft className='mt-1 text-primary'/>
                   <span>Back to Home</span></Link>
          <div className='sm:flex justify-between mb-0'>
            <div className='mb-4'></div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row h-screen">
            {/* Left Side - Wallet Balance and Transactions */}
            <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg relative">
              {/* Logo */}
             

           {/* Wallet Balance Section styled as a bank card */}
           <div className="relative bg-primary text-white p-6 lg:py-9 rounded-lg shadow-lg mb-8">
                {/* <img src={IMAGE.LOGO} alt="Logo" className="hidden md:block absolute top-4 right-4 w-16 h-16" /> */}
                <h2 className="text-xl md:text-3xl font-bold text-center ">Wallets Balance</h2>
                <p className="text-lg md:text-4xl mt-4 text-center">
  {NAMES.NairaSymbol}
  {parseFloat(walletBalance ?? 0).toLocaleString()}
</p>


                <div className="flex items-center justify-between">
  {/* Button for md and above */}
  {/* <button
    className="hidden md:block mt-4 bg-white text-primary p-3 rounded-lg hover:bg-secondary hover:text-white"
    onClick={() => setModalOpen(true)}
  >
    Withdraw Money
  </button> */}

  {/* Buttons for smaller screens */}
  <div className="flex justify-center w-full gap-4 md:hidden space-x-6">
        <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-white text-primary p-4 rounded-full hover:bg-secondary hover:text-white flex justify-center"
            onClick={() => setModalOpen(true)}
          >
            <i className="fas fa-wallet text-lg"></i>
          </button>
          <span className="text-xs mt-2">Withdraw</span>
        </div>
        {/* <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-white text-primary p-4 rounded-full hover:bg-secondary hover:text-white flex justify-center"
            onClick={() => handleButtonClick("linkAccount")}
          >
            <i className="fas fa-link text-lg"></i>
          </button>
          <span className="text-xs mt-2">Link Account</span>
        </div> */}
        <div className="flex flex-col items-center">
          <button
            className="mt-4 bg-white text-primary p-4 rounded-full hover:bg-secondary hover:text-white flex justify-center"
            onClick={() => handleButtonClick("details")}
          >
            <i className="fas fa-bank text-lg"></i>
          </button>
          <span className="text-xs mt-2">Details</span>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            {renderModalContent()}
          </div>
        </div>
      )}
</div>


              </div>
 {/* Modal for Adding Money */}
 {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4">Enter Amount</h2>
                {message && <p className="text-red-500">{message}</p>}
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50 font-semibold"                  
                  value={amount}
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              />
                <button 
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary mb-4 mt-3"
                  onClick={handlePayment}
                  >
                  Continue
                </button>
                <button 
                  className="w-full bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
                  onClick={handleClose} 
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        
            </div>

            {/* Right Side - Deposit with Payment Gateways */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-8 hidden lg:flex flex-col justify-start">
              <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-primary text-center"> Withdraw Money</h2>
              <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50"
                  // value={amount}
                  // onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary"
                  onClick={() => setModalOpen(true)}
                >
                  Continue
                </button>

              
              </div>

              {/*  */}
              <div className="bg-white p-6 shadow-lg rounded-lg mt-12">
                <h2 className="text-2xl font-bold mb-4 text-primary text-center">Linked Bank Account</h2>
               <table>

               <thead>
                    <tr className="bg-gray-100 text-gray-600 border-b">
                      <th className="p-3 border-r">Bank Name</th>
                      <th className="p-3 border-r">Account Name</th>
                      <th className="p-3 border-r">Account Number</th>
                     
              
                    </tr>
                  </thead>
                  <tbody>
                    {bankAccounts.map((details) => (
                      <tr key={details.id} className="border-b hover:bg-gray-50">
                        <td className="capitalize p-3 flex items-center border-r">
                        {details.bankName}</td>
                        <td className="capitalize p-3 text-primary border-r">{details.accountName}</td>
                        <td className=" capitalize p-3 text-gray-700 border-r">{details.accountNumber}</td>
                        
              
                      </tr>
                    ))}
                  </tbody>
               </table>
              
              </div>
            <div>


              
            </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet;
