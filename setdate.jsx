import {PATIENTSIDEBARMENU,  NAMES, transactionHistory, IMAGE, APIURLS,  } from '../../../../components/Constants';
import SideBarMenu from '../../../../components/SideBarMenu';
import UseSideBarMenu from '../../../../hooks/UseSideBarMenu';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import PatientHeader from '../../../partials/PatientHeader';
import Swal from 'sweetalert2';
import { getUserData } from '../../../../components/Helper';




const Wallet = () => {
  const { isSidebarOpen, toggleSidebar } = UseSideBarMenu();
const token = localStorage.getItem('token');
const userData = getUserData();
const [accountBalance, setAccountBalance]=useState(userData?.data?.acctbal)
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false); 

  const [modalOpen, setModalOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };
  const handlePayStack = async (amountInNaira) => {
    if (!amountInNaira || parseFloat(amountInNaira) <= 0.0) {
        Swal.fire({
            icon: "warning",
            title: "Invalid Amount",
            text: "Please enter a valid amount.",
        });
        return;
    }

    const amountInKobo = amountInNaira * 100;
    const paymentData = {
        amount: Math.round(amountInKobo),
        currency: NAMES.currency || "NGN",
        email: userData?.data?.email,
    };

    try {
      setLoading(true); 
      Swal.fire({
        title: 'Processing Payment...',
        html: 'Please wait while we process your payment.',
        didOpen: () => {
            Swal.showLoading();
        }
    });
        const response = await fetch(APIURLS.APIURLPATIENTSPAY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error initiating payment: ${errorText}`);
        }

        const responseData = await response.json();
        const { authorization_url, reference } = responseData?.data?.data || {};

        if (authorization_url && reference) {
            localStorage.setItem("payment_reference", reference);

            Swal.fire({
                icon: "info",
                title: "Payment Initiated",
                html: `
                    <strong>Email:</strong> ${paymentData.email}<br>
                    <strong>Amount:</strong> ${NAMES.NairaSymbol}${amountInNaira}<br>
                    <strong>Currency:</strong> ${paymentData.currency}<br>
                    <strong>Authorization URL:</strong> <a href="${authorization_url}" id="authLink">${authorization_url}</a><br>
                    <strong>Account Balance:</strong> ${accountBalance}<br>
                    <strong>Reference:</strong> ${APIURLS.APIURLPATIENTSPAY}/verify?reference=${reference}<br>
                `,
                showConfirmButton: true,
                confirmButtonText: "Proceed to Pay",
            });

            Swal.getConfirmButton().addEventListener('click', () => {
                window.open(authorization_url, '_self');

                window.addEventListener('storage', (e) => {
                    if (e.key === 'tabClosed' && e.newValue === 'true') {
                        verifyUserReferencePayment(reference);
                    }
                });

                window.addEventListener('unload', () => {
                    sessionStorage.setItem('tabClosed', 'true');
                });
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: "Failed to initiate payment.",
            });
        }
    } catch (error) {
        console.error("Error initializing payment:", error);
        Swal.fire({
            icon: "error",
            title: "Payment Initialization Failed",
            text: `An error occurred: ${error.message}`,
        });
    }finally {
      setLoading(false); 
  }
};

const verifyUserReferencePayment = async (reference) => {
  try {
      const response = await fetch(`${APIURLS.APIURLPATIENTSPAY}/verify?reference=${reference}`, {
          method: 'GET',
      });

      const responseData = await response.json();
      const { payment_status, amount, message } = responseData?.data?.data || {};

      if (payment_status === "success") {
          const newBalance = amount / 100;
          const userData = JSON.parse(localStorage.getItem("user_data")) || {};
          userData.data = { ...userData.data, acctbal: newBalance };
          localStorage.setItem("user_data", JSON.stringify(userData));
          setAccountBalance(newBalance);
          Swal.fire({
              icon: "success",
              title: "Payment Successful",
              text: message,
          });
      } else {
          Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: message,
          });
      }
  } catch (error) {
      console.error('Error in payment verification:', error);
      Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text: `An error occurred: ${error.message}`,
      });
  }
};

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (userData && userData.data && userData.data.acctbal) {
     setAccountBalance(userData.data.acctbal);
  }
}, []);

useEffect(() => {
  const handleStorageChange = () => {
    const reference = localStorage.getItem("payment_reference");
    if (reference) {
      setLoading(true); 
      verifyUserReferencePayment(reference)
        .finally(() => setLoading(false));
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const reference = urlParams.get("reference");

  if (reference) {
    setLoading(true);
    verifyUserReferencePayment(reference)
      .finally(() => setLoading(false)); 
  }}, []);


useEffect(() => {
    const handleWindowClose = () => {
        const reference = localStorage.getItem("payment_reference");
        if (reference) {
          setLoading(true); 
          verifyUserReferencePayment(reference)
            .finally(() => setLoading(false)); 
        }    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => window.removeEventListener("beforeunload", handleWindowClose);
}, []);

useEffect(()=>{
  const userData = JSON.parse(localStorage.getItem("user_data"));
  if (userData && userData.data && userData.data.acctbal) {
     setAccountBalance  (userData.data.acctbal);
  } 
},[]);
useEffect(() => {
    const onStorageChange = () => {
        const UpdateUserData = JSON.parse(localStorage.getItem("user_data"));
        if (UpdateUserData && UpdateUserData.data && UpdateUserData.data.acctbal) {
          setAccountBalance  (UpdateUserData.data.acctbal);
        }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
}, []);

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

  
  const handleClose = () => {
    setModalOpen(false);
    setShowPaymentOptions(false); 
  };

  const toggleModal = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount before proceeding.',
      });
      return; 
    }
    setShowPaymentOptions(true);
  }

//   



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
            <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg relative">
              {/* Logo */}
             

           <div className="relative bg-primary text-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-center md:text-start">Wallet Balance</h2>
                {loading ? (
    <div className="w-full h-8 bg-gray-300 rounded-md mt-4 animate-pulse"></div>
  ) : (
                <p className="text-lg md:text-4xl mt-4 text-center md:text-start">{NAMES.NairaSymbol}{NAMES.WALLETBALANCE}</p>
              )}
                <button 
                  className="mt-4 bg-white text-primary p-2 md:p-3 rounded-lg hover:bg-secondary hover:text-white  flex justify-center mx-auto md:mx-0 md:block" 
                  onClick={() => setModalOpen(true)}
                >
                  Add Money
                </button>
              </div> 
 {/* Modal for Adding Money */}
 {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-4">Enter Amount</h2>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50 font-semibold"                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary mb-4 mt-3"
                  onClick={toggleModal} 
                >
                  Continue
                </button>
                <button 
                  className="w-full bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
                  onClick={handleClose} // Close modal
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Payment Options Modal for Mobile/Tablets */}
          {showPaymentOptions && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <div className='flex space-x-8'>
                    <FaArrowLeft onClick={handleClose} className='mt-2 text-primary cursor-pointer'/>
                <h2 className="text-2xl font-bold mb-4 text-primary">Payment Method</h2>
                </div>
              
                <p className='mb-6 text-center text-sm'>Choose one of the following payment methods to add funds to your wallet</p>
               


                     <ul className="space-y-2 ">
              <li className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-100 hover:w-full"onClick={() => handlePayStack(amount)}  >
                <p className='mr-4 '></p>
            <img src={IMAGE.paystack} alt={"PayStack"} className="w-36 h-18  mx-auto" />
                          </li>
                       
                    </ul>
              </div>
            </div>
          )}
              {/* Transaction Logs */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Transaction Logs</h3>
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
                  name='amount'
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className="w-full bg-primary text-white p-3 rounded-lg hover:bg-secondary"
                  onClick={toggleModal}
                >
                  Continue
                </button>

              
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wallet;
