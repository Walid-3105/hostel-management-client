import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: meals = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["meal"],
    queryFn: async () => {
      const res = await axiosPublic.get("/meal");
      return res.data;
    },
  });
  return [meals, isPending, refetch];
};

export default useMeals;
