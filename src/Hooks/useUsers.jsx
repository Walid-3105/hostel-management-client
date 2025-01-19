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
  const userProfile = users?.[0];
  return { userProfile, user };
};

export default useUsers;
