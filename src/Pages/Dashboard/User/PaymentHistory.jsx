import React from "react";
import useUsers from "../../../Hooks/useUsers";

const PaymentHistory = () => {
  const { payments } = useUsers();

  return (
    <div className="p-5 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Package Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
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
    </div>
  );
};

export default PaymentHistory;
