import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTestQuery = () => {
  const fetchDummyData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["test"],
    queryFn: fetchDummyData,
  });

  return { data, isLoading, isError };
};

export default useTestQuery;
