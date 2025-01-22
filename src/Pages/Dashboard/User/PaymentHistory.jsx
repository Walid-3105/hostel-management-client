import React, { useState } from "react";
import useUsers from "../../../Hooks/useUsers";
import ReactPaginate from "react-paginate";

const PaymentHistory = () => {
  const { payments } = useUsers();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const offset = currentPage * itemsPerPage;
  const currentPayments = payments?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil((payments?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="p-5 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3"></th>
              <th className="p-3">Package Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments?.length > 0 ? (
              currentPayments.map((payment, index) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{payment.packageName}</td>
                  <td className="p-3">{payment.amount} $</td>
                  <td className="p-3">
                    {new Date(payment.date).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-5 text-center text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          reviousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center mt-4"}
          previousLinkClassName={"px-3 py-1 bg-gray-300 rounded mr-2"}
          nextLinkClassName={"px-3 py-1 bg-gray-300 rounded ml-2"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          activeClassName={"bg-blue-500 text-white px-2 rounded-full"}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
