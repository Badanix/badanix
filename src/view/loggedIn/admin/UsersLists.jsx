import React, { useEffect, useState } from "react";
import { defaultUrls } from "../../../components/Constants";
import { useNavigate } from "react-router-dom";

function UsersLists() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${defaultUrls}admin/allUsers/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleView = (user) => {
    console.log("VIEW USER:", user);
    navigate(`/admin/users/${user.id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    // UI delete first (optimistic)
    setUsers((prev) => prev.filter((user) => user.id !== id));

    // later: call DELETE API
    console.log("DELETE USER ID:", id);
  };

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">Users List</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th
                  className="px-4 py-3 text-left"
                  colSpan={3}
                  style={{ width: "50px" }}
                >
                  Full Name
                </th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">EHR</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Verified</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3 font-medium">{user.fullname}</td>
                  <td></td>
                  <td></td>

                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.gender}</td>
                  <td className="px-4 py-3">{user.ehr}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.verified === 1
                          ? "bg-primaryLight text-white"
                          : "bg-tomato text-white"
                      }`}
                    >
                      {user.verified === 1 ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleView(user)}
                      className="px-3 py-1 text-sm rounded bg-primary text-white hover:bg-primaryLight mb-4"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 text-sm rounded bg-tomato text-white hover:opacity-90"
                    >
                      Delete
                    </button>
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

export default UsersLists;
