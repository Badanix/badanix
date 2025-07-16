import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const fetchTransactionHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await fetch(
        "https://api.digitalhospital.com.ng/api/v1/doctor/transaction",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== 200) {
        throw new Error(data.message || "Failed to fetch transactions");
      }

      setTransactionHistory(data.data);
      Swal.fire({
        icon: "success",
        title: "Transactions Loaded",
        text: `${data.data.length} transaction(s) retrieved successfully.`,
      });
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      setTransactionHistory([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionClick = (transaction) => {
    const formattedDate = new Date(transaction.created_at).toLocaleString();

    Swal.fire({
      title: "Transaction Details",
      html: `
        <div class="text-left">
          <p><strong>Purpose:</strong> ${transaction.purpose}</p>
          <p><strong>Amount:</strong> ₦${transaction.amount}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
        </div>
      `,
      icon: "info",
    });
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      {loading ? (
        <p className="text-center text-blue-600">Loading...</p>
      ) : transactionHistory.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {transactionHistory.map((txn) => (
            <li
              key={txn.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleTransactionClick(txn)}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{txn.purpose}</span>
                <span className="text-green-600">₦{txn.amount}</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(txn.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
