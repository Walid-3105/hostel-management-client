import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  // Request meal query
  const { data: requests, refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/request?email=${user.email}`);
      return res.data;
    },
  });

  // Request meal query
  const { data: reviews, refetch: reviewRefetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?email=${user.email}`);
      return res.data;
    },
  });

  // Payments meal query
  const { data: payments } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });

  const userProfile = users?.[0];

  return {
    userProfile,
    user,
    requests,
    payments,
    reviews,
    refetch,
    reviewRefetch,
  };
};

export default useUsers;
