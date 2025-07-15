import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure= useAxiosSecure()
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users",search],
    queryFn: async () => {
        const url = search ? `/users?search=${search}` : "/users";
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      toast.success("Role updated!");
      queryClient.invalidateQueries(["users", search]); 
    } catch (error) {
      toast.error(" Failed to update role.");
    }
  };

  return (
    <div className="p-5 w-6xl my-10 mx-auto border border-gray-300 shadow-md rounded-md">
      <h1 className="text-3xl text-center text-black font-semibold mb-6 flex items-center gap-3 justify-center"><span><FaUsers /></span> All Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className=" mb-6  w-full px-4 py-2 border border-[#00B795] bg-white rounded
            focus:outline-none focus:ring-2 focus:ring-[#00B795]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p>Loading users...</p>
      ) : isError ? (
        <p className="text-red-600">Error fetching users.</p>
      ) : users.length === 0 ? (
        <p className="text-2xl text-center font-semibold">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="table table-zebra text-md font-semibold w-full">
            <thead className="bg-[#00B795] text-white text-[18px]">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      className="select w-full px-4 py-2 border border-gray-300 bg-white rounded
            focus:outline-none focus:ring-2 focus:ring-[#00B795]"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
