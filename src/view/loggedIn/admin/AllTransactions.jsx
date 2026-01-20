import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${defaultUrls}admin/allTransactions/2`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data) => {
        console.log("TRANSACTIONS API RESPONSE:", data);

        if (!Array.isArray(data.data)) {
          throw new Error(data.message || "Invalid transactions response");
        }

        setTransactions(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading transactions...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        All Transactions
      </h2>

      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{tx.id}</td>

                  <td className="px-4 py-3">
                    {tx.user?.fullname || tx.user_id || "-"}
                  </td>

                  <td className="px-4 py-3 truncate max-w-xs">
                    {tx.reference || "-"}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    ₦{Number(tx.amount || 0).toLocaleString()}
                  </td>

                <td className="px-4 py-3">
  <span
    className={`px-2 py-1 text-sm rounded-full ${
      tx.status === 1
        ? "bg-green-100 text-green-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {tx.status === 1 ? "Completed" : "Pending"}
  </span>
</td>


                  <td className="px-4 py-3 text-sm text-gray-600">
                    {tx.created_at
                      ? new Date(tx.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTransactions;
