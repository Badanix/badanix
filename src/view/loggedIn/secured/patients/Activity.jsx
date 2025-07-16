import {PATIENTSIDEBARMENU,  paymentMethodOptions, transactionHistory } from '../../../../components/Constants';
import SideBarMenu from '../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../hooks/UseSideBarMenu';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import { format } from 'date-fns';
import PatientHeader from '../../../partials/PatientHeader';

const Activity = () => {
 
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();

  const [amount, setAmount] = useState('');
//   const [selectedMethod, setSelectedMethod] = useState(''); 
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);


  
  const [selectedTransaction, setSelectedTransaction] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

 
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy'); 
  };
  
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes);
    return format(date, 'h:mm a'); 
  };
  const handleContinue = () => {
    if (amount) {
      setShowPaymentMethods(true);
    }
  };
  
//   
const handlePayment = async (paymentMethod) => {
    if (!amount) {
      Swal.fire({
        icon: 'warning',
        title: 'No Amount Entered',
        text: 'Please enter an amount before proceeding.'
      });
      return;
    }

    const paymentData = {
      method: paymentMethod,
      amount: amount,
      currency: 'USD',
      userId: '12345' // Replace with actual user info
    };

    try {
      const response = await fetch('https://your-api-endpoint.com/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_TOKEN'
        },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        const responseData = await response.json();
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: `Payment of $${amount} using ${paymentMethod} was successful!`,
        });
        console.log('Payment successful:', responseData);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Something went wrong. Please try again.',
        });
        console.error('Payment failed:', response.statusText);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during the payment process. Please try again later.'
      });
      console.error('Error making payment:', error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarMenu isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={PATIENTSIDEBARMENU} />

      {/* Main Content */}
      <div className={`flex-1 ml-${isSidebarOpen ? '64' : '0 sm:ml-20'} transition-all duration-300`}>
        {/* Topbar */}
        <PatientHeader/>


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-grow">
          <div className='sm:flex justify-between mb-0'>
            <div className='mb-4'></div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row h-screen">
            {/* Left Side - Wallet Balance and Transactions */}
            <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg relative">
              {/* Logo */}
             

          
              {/* Transaction Logs */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary text-center pb-4">Activity Logs</h3>
                <ul className="space-y-4">
        {transactionHistory.map((transaction, index) => (
          <li
            key={index}
            className="flex justify-between bg-gray-100 p-4 rounded-lg cursor-pointer"
            onClick={() => openModal(transaction)}
          >
            <div>
              <p>{transaction.status}</p>
              <div className="flex space-x-2">
                <p className="text-gray-500">{formatDate(transaction.date)}</p>
                <p className="text-gray-500">{formatTime(transaction.time)}</p>
              </div>
            </div>
            <p className="font-bold">{transaction.amount}</p>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className='flex space-x-8 text-primary'>
                <FaArrowLeft className='mt-2' onClick={closeModal}/>
                <h2 className="text-xl font-bold mb-4 text-center">Transaction Details</h2>
            </div>
                    
            <div className="space-y-6 ">
              <div className="flex justify-between border-b-2 py-3 border-gray-200">
                <p className="font-semibold">Amount:</p>
                <p>{selectedTransaction.amount}</p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 py-2">
                <p className="font-semibold">Status:</p>
                <p>{selectedTransaction.status}</p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 py-2">
                <p className="font-semibold">Payment Method:</p>
                <p>{selectedTransaction.paymentMethod}</p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 py-2">
                <p className="font-semibold">Transaction ID:</p>
                <p>{selectedTransaction.id}</p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 py-2">
                <p className="font-semibold">Date:</p>
                <p>{formatDate(selectedTransaction.date)}</p>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 py-2">
                <p className="font-semibold">Time:</p>
                <p>{formatTime(selectedTransaction.time)}</p>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
              </div>
            </div>

            {/* Right Side - Deposit with Payment Gateways */}
            <div className="w-full lg:w-1/3 bg-gray-50 p-8 hidden lg:flex flex-col justify-start">
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary text-center">Add Money</h2>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary"
                  onClick={handleContinue}
                >
                  Continue
                </button>

                {showPaymentMethods && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-primary text-center">Select Payment Method</h3>
                    <ul className="space-y-4">
                        {paymentMethodOptions.map((item,index)=>(
                            <li key={index} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100"onClick={() => {
                                // setSelectedMethod(item.name);
                                handlePayment(item.action); 
                              }}>
                            <img src={item.img} alt={item.name} className="w-8 h-8 mr-4" />
                            <span>{item.name}</span>
                          </li>
                        ))
                        }
                     
                   
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Activity;
