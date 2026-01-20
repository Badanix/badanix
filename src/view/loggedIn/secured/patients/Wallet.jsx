import { NAMES, IMAGE, APIURLS } from "../../../../components/Constants";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  formatDateWithOrdinalSuffix,
  getUserData,
} from "../../../../components/Helper";
import { usePatientTransaction } from "./services/ServicesForm";

const Wallet = () => {
  const token = localStorage.getItem("token");
  const userData = getUserData();
  const [accountBalance, setAccountBalance] = useState(userData?.data?.acctbal);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { transactionData } = usePatientTransaction();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactionData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
        title: "Processing Payment...",
        html: "Please wait while we process your payment.",
        didOpen: () => {
          Swal.showLoading();
        },
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

          showConfirmButton: true,
          confirmButtonText: "Proceed to Pay",
        });

        Swal.getConfirmButton().addEventListener("click", () => {
          window.open(authorization_url, "_self");

          window.addEventListener("storage", (e) => {
            if (e.key === "tabClosed" && e.newValue === "true") {
              verifyUserReferencePayment(reference);
            }
          });

          window.addEventListener("unload", () => {
            sessionStorage.setItem("tabClosed", "true");
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
    } finally {
      setLoading(false);
    }
  };

  const verifyUserReferencePayment = async (reference) => {
    try {
      const response = await fetch(
        `${APIURLS.APIURLPATIENTSPAY}/verify?reference=${reference}`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();
      const { payment_status, amount, message } =
        responseData?.data?.data || {};

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
      console.error("Error in payment verification:", error);
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
        verifyUserReferencePayment(reference).finally(() => setLoading(false));
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
      verifyUserReferencePayment(reference).finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    const handleWindowClose = () => {
      const reference = localStorage.getItem("payment_reference");
      if (reference) {
        setLoading(true);
        verifyUserReferencePayment(reference).finally(() => setLoading(false));
      }
    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => window.removeEventListener("beforeunload", handleWindowClose);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData && userData.data && userData.data.acctbal) {
      setAccountBalance(userData.data.acctbal);
    }
  }, []);

  useEffect(() => {
    const onStorageChange = () => {
      const UpdateUserData = JSON.parse(localStorage.getItem("user_data"));
      if (
        UpdateUserData &&
        UpdateUserData.data &&
        UpdateUserData.data.acctbal
      ) {
        setAccountBalance(UpdateUserData.data.acctbal);
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  const handleClose = () => {
    setModalOpen(false);
    setShowPaymentOptions(false);
  };

  const toggleModal = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Please enter a valid amount before proceeding.",
      });
      return;
    }
    setShowPaymentOptions(true);
  };

  return (
    <div className="">
      <main className="flex-grow">
        <div className="sm:flex justify-between mb-0">
          <div className="mb-4"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row h-screen">
          <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg relative">
            {/* Logo */}

            <div className="relative bg-primary text-white p-6 rounded-lg shadow-lg mb-8">
              {/* Title */}
              <h2 className="text-xl md:text-3xl font-bold text-center ">
                Wallet Balance
              </h2>

              {/* Wallet Balance or Loading Text */}
              <div className="relative">
                {loading ? (
                  <div className="w-1/3 h-8 bg-primaryLight rounded-md animate-pulse mx-auto mt-4"></div>
                ) : (
                  <p className="text-lg md:text-4xl mt-4 text-center">
                    {NAMES.NairaSymbol}
                    {NAMES.WALLETBALANCE.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Add Money Button */}
              <button
                className="mt-4 bg-white text-primary p-2 md:p-3 rounded-lg hover:bg-secondary hover:text-white flex justify-center mx-auto md:mx-0 md:hidden"
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
                    className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50 font-semibold"
                    value={amount}
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
                    onClick={handleClose}
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
                  <div className="flex space-x-8">
                    <FaArrowLeft
                      onClick={handleClose}
                      className="mt-2 text-primary cursor-pointer"
                    />
                    <h2 className="text-2xl font-bold mb-4 text-primary">
                      Payment Method
                    </h2>
                  </div>
                  <p className="mb-6 text-center text-sm">
                    Choose one of the following payment methods to add funds to
                    your wallet
                  </p>

                  <ul className="space-y-2 ">
                    <li
                      className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-secondary hover:animate-wiggle  hover:w-full"
                      onClick={() => handlePayStack(amount)}
                    >
                      <p className="mr-4 "></p>
                      <img
                        src={IMAGE.paystack}
                        alt={"PayStack"}
                        className="w-36 h-18  mx-auto"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {/* Transaction Logs */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary text-center">
                Transaction Logs
              </h3>
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : currentTransactions.length === 0 ? (
                <p className="text-center text-gray-500 h-auto">
                  No transaction log available.
                </p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {currentTransactions
                      .sort(
                        (a, b) =>
                          new Date(b.created_at) - new Date(a.created_at)
                      )
                      .map((transaction) => (
                        <li
                          key={transaction.id}
                          className="flex justify-between bg-gray-100 p-4 rounded-lg cursor-pointer"
                          onClick={() => openModal(transaction)}
                        >
                          <div>
                            <p>
                              {" "}
                              {transaction.status === 0
                                ? "Pending"
                                : "Completed"}
                            </p>
                            <div className="flex space-x-2">
                              <p className="text-gray-500">
                                {formatDateWithOrdinalSuffix(
                                  transaction.created_at
                                ) || null}
                              </p>
                              <p className="text-gray-500">
                                {new Date(
                                  transaction.created_at
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }) || null}
                              </p>
                            </div>
                          </div>
                          <p className="font-bold">
                            {NAMES.NairaSymbol}
                            {transaction.amount || null}
                          </p>
                        </li>
                      ))}
                  </ul>
                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-secondary"
                      }`}
                    >
                      Previous
                    </button>

                    <span className="font-semibold text-primary">
                      {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-secondary"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Modal */}
              {showModal && selectedTransaction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex space-x-8 text-primary">
                      <FaArrowLeft className="mt-2" onClick={closeModal} />
                      <h2 className="text-xl font-bold mb-4 text-center">
                        Transaction Details
                      </h2>
                    </div>

                    <div className="space-y-6 ">
                      <div className="flex justify-between border-b-2 py-3 border-gray-200">
                        <p className="font-semibold">Amount:</p>
                        <p>{selectedTransaction.amount}</p>
                      </div>
                      <div className="flex justify-between border-b-2 border-gray-200 py-2">
                        <p className="font-semibold">Status:</p>
                        <p>
                          {" "}
                          {selectedTransaction.status === 0
                            ? "Pending"
                            : "Completed"}
                        </p>
                      </div>
                      {/* <div className="flex justify-between border-b-2 border-gray-200 py-2">
                          <p className="font-semibold">Payment Method:</p>
                          <p>{selectedTransaction.paymentMethod}</p>
                        </div> */}
                      <div className="flex justify-between border-b-2 border-gray-200 py-2">
                        <p className="font-semibold">Transaction ID:</p>
                        <p>{selectedTransaction.reference}</p>
                      </div>
                      <div className="flex justify-between border-b-2 border-gray-200 py-2">
                        <p className="font-semibold">Date:</p>
                        <p>
                          {formatDateWithOrdinalSuffix(
                            selectedTransaction.created_at
                          ) || null}
                        </p>
                      </div>
                      <div className="flex justify-between border-b-2 border-gray-200 py-2">
                        <p className="font-semibold">Time:</p>
                        <p>
                          {new Date(
                            selectedTransaction.created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      className="mt-4 bg-primary text-white p-2 rounded-lg w-full hover:bg-secondary"
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
              <h2 className="text-2xl font-bold mb-4 text-primary text-center">
                Add Money
              </h2>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 border rounded-lg mb-4 no-arrows leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-50"
                value={amount}
                name="amount"
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
  );
};

export default Wallet;
