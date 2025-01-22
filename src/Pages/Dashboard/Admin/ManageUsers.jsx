import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "User promoted to Admin",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Pagination logic
  const pageCount = Math.ceil(users.length / usersPerPage);
  const offset = currentPage * usersPerPage;
  const paginatedUsers = users.slice(offset, offset + usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl">All Users Here</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra border">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, idx) => (
                <tr key={user._id}>
                  <th>{offset + idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="text-blue p-2 hover:text-red-700"
                      >
                        <FaUsers size={20} />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-blue-700"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex space-x-2"}
            activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
            pageClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            previousClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            nextClassName={"px-3 py-1 border rounded hover:bg-gray-200"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
