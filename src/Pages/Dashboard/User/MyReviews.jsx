import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import useUsers from "../../../Hooks/useUsers";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";

const MyReviews = () => {
  const { reviews, reviewRefetch } = useUsers();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedReviewText, setUpdatedReviewText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 5;

  // Pagination Logic
  const offset = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);
  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Open Edit Modal
  const handleEditReview = (review) => {
    setSelectedReview(review);
    setUpdatedReviewText(review.review);
    setIsModalOpen(true);
  };

  // Update Review
  const handleUpdateReview = async () => {
    try {
      await axiosSecure.patch(`/review/${selectedReview._id}`, {
        review: updatedReviewText,
      });
      toast.success("Review updated successfully!");
      setIsModalOpen(false);
      reviewRefetch();
    } catch (error) {
      toast.error("Failed to update review.");
    }
  };

  // Confirm Delete Toast
  const confirmDeleteToast = (id) => {
    toast(
      (t) => (
        <div className="text-black">
          <p className="font-semibold">Are you sure you want to delete?</p>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => handleDelete(id, t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  // Handle Review Deletion
  const handleDelete = async (id, toastId) => {
    try {
      await axiosSecure.delete(`/review/${id}`);
      toast.dismiss(toastId);
      toast.success("Review deleted successfully!");
      reviewRefetch();
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5">My Reviews</h2>
      <div className="">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Meal Title</th>
              <th className="p-3">Likes</th>
              <th className="p-3">Review</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <tr key={review._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{review.title}</td>
                  <td className="p-3">{review.likes}</td>
                  <td className="p-3">{review.review}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiFillEdit size={20} />
                    </button>
                    <button
                      onClick={() => confirmDeleteToast(review._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiFillDelete size={20} />
                    </button>
                    <button
                      onClick={() => navigate(`/meal/${review.mealId}`)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <MdOutlineRemoveRedEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-5 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-5">
        <ReactPaginate
          previousLabel={"← Previous"}
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
      {/* Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Edit Review</h2>
            <textarea
              className="w-full border p-2 rounded"
              rows="4"
              value={updatedReviewText}
              onChange={(e) => setUpdatedReviewText(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-3 gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateReview}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
